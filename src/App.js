import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './Context'
import Loader from './loader'
import Modal from './Modal/Modal'
import { func } from 'prop-types'


const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./Todo/addTodo'))
  }, 3000)
}))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(response => response.json())
  .then(todos => {
    setTimeout(()=>{
      setTodos(todos)
      setLoading(false)
    }, 2000)
  })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
      <h1>React</h1>
      <Modal></Modal>
      <React.Suspense fallback={<p>Loading...</p>}>
      <AddTodo onCreate={addTodo} ></AddTodo>
      </React.Suspense>
      {loading && <Loader></Loader>}
      {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}></TodoList>) : (loading ? null : <p>No todos!</p>)}
    </div>
    </Context.Provider>
  );
}

export default App;
