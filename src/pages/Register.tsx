import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log('data', data);
  const handleClick = () => {
    if (!errors.email && !errors.username && !errors.password) {
      resetField('username', { keepError: true });
      resetField('email', { keepError: false });
      resetField('password', { keepError: false });
    }
  };

  console.log(errors);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Username" {...register('username', { required: true, minLength: 5 })} />
          {errors?.username && errors.username.type === 'required' && <ErrorMessage msg="Username is required" />}
          {errors?.username && errors.username.type === 'minLength' && <ErrorMessage msg="Username should be at least 5 characters" />}
        </div>
        <div>
          <Input placeholder="Email address" {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />
          {errors?.email && errors.email.type === 'required' && <ErrorMessage msg="Email is required" />}
          {errors?.email && errors.email.type === 'pattern' && <ErrorMessage msg="Email is not valid " />}
        </div>
        <div>
          <Input placeholder="Password" {...register('password', { required: true, minLength: 6 })} />
          {errors?.password && errors.password.type === 'required' && <ErrorMessage msg="Password is required" />}
          {errors?.password && errors.password.type === 'minLength' && <ErrorMessage msg="Password should be at least 6 characters" />}
        </div>
        <Button fullWidth onClick={handleClick}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
