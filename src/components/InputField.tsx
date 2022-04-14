import React from 'react';
import './styles.css';

interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (event: React.FormEvent) => void
}

const InputField = ({todo, setTodo, handleAdd}: Props) => {
  return (
    <form className="input" onSubmit={handleAdd}>
        <input type="input" 
        value={todo}
        onChange = {(event) => setTodo(event.target.value)}
        placeholder='Enter a task' className='input__box'
        />
        <button className="input__submit" type='submit'>GO</button>
    </form>
  )
}

export default InputField