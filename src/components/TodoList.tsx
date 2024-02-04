import useAuthontication from '../Hooks/useAuthonticationToken';
import Button from './ui/Button';

interface ITodo {
  id: number;
  title: string;
}
const TodoList = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') + '');
  const { data, isLoading } = useAuthontication({
    queryKey: ['todos'],
    config: {
      headers: {
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    },
  });
  console.log(data);

  if (isLoading) return <h2>'Loading...'</h2>;

  const renderTodos = data.todos.length ? (
    data.todos.map((item: ITodo) => (
      <div key={item.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{item.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={'sm'}>Edit</Button>
          <Button variant={'danger'} size={'sm'}>
            Remove
          </Button>
        </div>
      </div>
    ))
  ) : (
    <div>no todos exsit</div>
  );

  return <div className="space-y-1 ">{renderTodos}</div>;
};

export default TodoList;
