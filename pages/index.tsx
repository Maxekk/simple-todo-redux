import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TodoCard from '@/components/TodoCard';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos); 
  const [todoName, setTodoName] = useState<string>('');

  const handleAddTodo = () => {
    setTodoName("");
    dispatch(addTodo(uuidv4(), todoName, "Initialized"));
  };

  return (
    <div className="w-[100%] h-screen dark:bg-white flex flex-col">
      <div className="w-[100%] h-[20%] flex justify-center items-end">
        <div className="flex gap-5 w-[100%] justify-center">
          <Input
            className="bg-zinc-900 border-slate-700 w-full md:w-[25%] text-white focus:outline-none"
            placeholder="Start typing.."
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <Button
            variant="outline"
            className="bg-zinc-800 text-white border-slate-700"
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="w-[100%] h-screen p-5 flex justify-center">
        <div className="w-[80%] md:w-[50%] h-auto flex flex-col items-center gap-5">
          {todos.map((todo: any) => (
            <TodoCard
              id={todo.id}
              key={todo.id}
              todoName={todo.name}
              todoState={todo.state}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
