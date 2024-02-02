import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from '../components/ErrorMessage';
import { LOGIN_FORM } from '../data';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { IResponse } from '../interfaces';
import { useState } from 'react';

interface IFormInput {
  identifier: string;
  password: string;
}

const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required('Email is required')
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email does not match the required pattern'),
    password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
  })
  .required();

const LoginPage = () => {
  /* STATE */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  /* HANDLER */

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:1337/api/auth/local', data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('welcome to todo application ');
      setTimeout(() => {
        location.replace('/');
      }, 1500);
    } catch (error) {
      const errorObj = error as AxiosError<IResponse>;
      const message = errorObj.response?.data.error.message;
      toast.error(message + '');
    } finally {
      setIsLoading(true);
    }
  };
  /* RENDER */
  const renderLoginForm = LOGIN_FORM.map((item) => {
    return (
      <div key={item.name}>
        <Input placeholder={item.placeholder} {...register(item.name)} />
        <ErrorMessage msg={errors[item.name]?.message} />
      </div>
    );
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
