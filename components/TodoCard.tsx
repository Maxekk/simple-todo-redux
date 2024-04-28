import React, { useState } from 'react'; // Import useState hook
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDispatch } from 'react-redux';
import { removeTodo } from '../lib/store';

interface IProps {
  id: string;
  todoName: string;
  todoState: string;
}

export default function TodoCard({ todoName, todoState, id }: IProps) {
  const [selectedState, setSelectedState] = useState(todoState || "Initialized");
  const dispatch = useDispatch();

  const handleChangeState = (newState: string) => {
    setSelectedState(newState);
  };

  const handleDeleteTodo = () => {
    dispatch(removeTodo(id));
  };

  return (
    <Card className="w-full md:w-[50%] h-[130px] bg-zinc-900 border-slate-700 flex flex-col">
      <div className="w-full h-[60%] flex items-center">
        <div className="w-full h-[70%] text-3xl text-white p-2">{todoName}</div>
      </div>
      <div className="w-full h-[40%] flex">
        <div className="w-[80%] h-full pl-2">
          <Select value={selectedState} onValueChange={handleChangeState}>
            <SelectTrigger className="w-full bg-zinc-800 text-slate-500 border-slate-700">
              <SelectValue>{selectedState}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-slate-500">
              <SelectItem value="Initialized">Initialized</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[20%] h-full flex items-center justify-center pb-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-red-400 border-red-400 hover:bg-red-900 hover:border-red-900"
            onClick={handleDeleteTodo}
          >
            <Trash className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
