import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { REGISTER_FORM } from '../data';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormInput, IResponse } from '../interfaces';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
// import { useState } from 'react';

const registerSchema = yup
  .object({
    username: yup.string().required('Username is required').min(5, 'Username should be at least 5 characters'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email does not match the required pattern'),
    password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
  })
  .required();

/* ------------ STATE ------------ */

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  /* ---------- HANDLER ---------- */

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axios.post('http://localhost:1337/api/auth/local/register', data);
      if (status == 200) {
        toast.success("Congratulations! You've successfully registered 🎉");
      }
    } catch (error) {
      const errorObj = error as AxiosError<IResponse>;

      toast.error(`${errorObj.response?.data.error.message}`, {
        style: {
          backgroundColor: '#8b85f7',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
      handleReset();
    }
  };
  const handleReset = () => {
    if (!errors.email && !errors.username && !errors.password) {
      resetField('username');
      resetField('email');
      resetField('password');
    }
  };

  /* ---------- RENDER ------------- */
  const renderRegisterInput = REGISTER_FORM.map((item) => {
    return (
      <div key={item.name}>
        <Input placeholder={item.placeholder} {...register(item.name, item.validation)} />
        <ErrorMessage msg={errors[item.name]?.message} />
      </div>
    );
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterInput}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
