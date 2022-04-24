import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className='container'>
      <Droppable droppableId="TodosList">
        { (provided) => (
            <div className='todos' 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
           <span className="todos__heading">Active tasks</span>
           {todos.map((todo, index) => (
             <SingleTodo
               index={index}
               key={todo.id}
               todos={todos}
               todo={todo}
               setTodos={setTodos}      
             />
           ))}
         </div>
        )
        }
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided) => (
            <div className='todos remove'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
            <span className="todos__heading">Completed tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos} 
              />
            ))}
          </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default TodoList 