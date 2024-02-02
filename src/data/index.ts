import { ILoginInput, IRegisterInput } from '../interfaces';

export const REGISTER_FORM: IRegisterInput[] = [
  {
    placeholder: 'Username',
    name: 'username',
    validation: { required: true, minLength: 5 },
  },
  {
    placeholder: 'Email address',
    name: 'email',
    validation: { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ },
  },
  {
    placeholder: 'Password',
    name: 'password',
    validation: { required: true, minLength: 6 },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    placeholder: 'Email address',
    name: 'identifier',
    validation: { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ },
  },
  {
    placeholder: 'Password',
    name: 'password',
    validation: { required: true, minLength: 6 },
  },
];
