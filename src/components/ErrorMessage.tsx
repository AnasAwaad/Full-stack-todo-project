interface IProps {
  msg?: string;
}

const ErrorMessage = ({ msg }: IProps) => {
  return <div className="text-red-600 py-1 ml-1 text-base">{msg}</div>;
};
export default ErrorMessage;
