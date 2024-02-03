import { useEffect, useState } from 'react';
import Button from './ui/Button';
import axios from 'axios';

interface ITodo {
  id: string;
  title: string;
}
const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') + '');
  useEffect(() => {
    axios
      .get('http://localhost:1337/api/users/me?populate=todos', {
        headers: {
          Authorization: `Bearer ${userInfo.jwt}`,
        },
      })
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((err) => console.log(err));
  }, [userInfo.jwt]);

  const renderTodos = todos.map((item) => {
    return (
      <div key={item.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{item.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={'sm'}>Edit</Button>
          <Button variant={'danger'} size={'sm'}>
            Remove
          </Button>
        </div>
      </div>
    );
  });
  return <div className="space-y-1 ">{renderTodos}</div>;
};

export default TodoList;
