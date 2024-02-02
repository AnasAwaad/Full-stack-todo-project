export interface IRegisterInput {
  placeholder: string;
  name: 'username' | 'email' | 'password';
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export interface IResponse {
  error: {
    message?: string;
  };
}
