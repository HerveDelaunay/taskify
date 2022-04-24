import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  index: number
}

const SingleTodo = ({todo, todos, setTodos, index}: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  }
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const handleEdit = (event: React.FormEvent, id: number) => {
    event.preventDefault()
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo))
    setEdit(false)
  }
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form className='todos__single' 
          onSubmit={(event) =>{ handleEdit(event, todo.id)}}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
          { edit ? 
            <input type="text" value={editTodo}
            ref={inputRef} 
            onChange={(event) => setEditTodo(event.target.value)}
            className="todos__single--text"
            /> :
            todo.isDone ? 
            <s className="todos__single--text">{todo.todo}</s> 
            : 
            <span className="todos__single--text">{todo.todo}</span>
          }
          <div>
            <span className="icon" onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit)
              }
            }}
            >
              <AiFillEdit/>
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete/>
            </span>
            <span className="icon" onClick={()=> handleDone(todo.id)}>
              <MdDone/>
            </span>
          </div>
        </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo