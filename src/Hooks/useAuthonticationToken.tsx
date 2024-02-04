import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';
interface IProps {
  queryKey: string[];
  config?: AxiosRequestConfig;
}

const useAuthontication = ({ queryKey, config }: IProps) => {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get('http://localhost:1337/api/users/me?populate=todos', config);
      return response.data;
    },
  });

  return { data, isLoading };
};
export default useAuthontication;
