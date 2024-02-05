import { ChangeEvent, FormEvent, useState } from 'react';
import useAuthontication from '../Hooks/useAuthonticationToken';
import { ITodo, ITodoFromInput } from '../interfaces';
import Button from './ui/Button';
import MyModal from './ui/Modal';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import axios from 'axios';

const TodoList = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') + '');

  /* --------------------- STATE ---------------------- */
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [editTodoForm, setEditTodoForm] = useState<ITodoFromInput>({
    id: 0,
    title: '',
    description: '',
  });
  // const [update, setUpdate] = useState(false);

  const { data, isLoading } = useAuthontication({
    queryKey: ['todos', `${editTodoForm.id}`], //there is a bug here
    config: {
      headers: {
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    },
  });
  console.log(editTodoForm.id);

  /* --------------------- HANDLER ---------------------- */

  console.log(editTodoForm);

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      console.log(editTodoForm);

      await axios.put(
        `http://localhost:1337/api/todos/${editTodoForm.id}`,
        { data: editTodoForm },
        {
          headers: {
            Authorization: `Bearer ${userInfo.jwt}`,
          },
        }
      );
      // setUpdate((prev) => !prev);
      closeModal();
      setEditTodoForm({
        id: 0,
        title: '',
        description: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onEditHandler = (todo: ITodo) => {
    openModal();
    setEditTodoForm({ id: todo.id, title: todo.title, description: todo.description });
  };

  const onChangeInputHandler = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = evt.target;
    setEditTodoForm({
      ...editTodoForm,
      [name]: value,
    });
  };

  const onCloseHandler = () => {
    setEditTodoForm({
      id: 0,
      title: '',
      description: '',
    });
    closeModal();
  };
  /* --------------------- RENDER ---------------------- */
  if (isLoading) return <h2>'Loading...'</h2>;

  const renderTodos = data.todos.length ? (
    data.todos.map((item: ITodo) => (
      <div key={item.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{item.title}</p>
        <p className="w-full font-semibold">{item.description}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={'sm'} onClick={() => onEditHandler(item)}>
            Edit
          </Button>
          <Button variant={'danger'} size={'sm'}>
            Remove
          </Button>
        </div>
      </div>
    ))
  ) : (
    <h2>no todos exsit</h2>
  );

  return (
    <div className="space-y-1 ">
      {renderTodos}

      <MyModal isOpen={isOpen} closeModal={closeModal} title="Edit Todo">
        <form className="space-y-3 mt-3" onSubmit={onSubmitHandler}>
          <Input name="title" value={editTodoForm.title} onChange={onChangeInputHandler} placeholder="Edit the title..." />
          <Textarea name="description" value={editTodoForm.description} onChange={onChangeInputHandler} placeholder="Edit the description..." />
          <div className="flex items-center justify-center space-x-3">
            <Button variant={'danger'} size={'default'} fullWidth>
              Submit
            </Button>
            <Button variant={'cancel'} onClick={onCloseHandler} fullWidth>
              Close
            </Button>
          </div>
        </form>
      </MyModal>
    </div>
  );
};

export default TodoList;
