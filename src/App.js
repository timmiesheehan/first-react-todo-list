import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';

const useState = React.useState
const useEffect = React.useEffect

function App(){
  
  const [todos, setTodos] = useState([])
  
  // only run once this component is rendered
  useEffect(() => {
    if(localStorage.getItem("exampleTodoData")){
      setTodos(JSON.parse(localStorage.getItem("exampleTodoData")))
    }
  }, [])
  
  // run every time our todo store changes
  useEffect(() => {
    localStorage.setItem("exampleTodoData", JSON.stringify(todos)) 
  }, [todos])
  
  return (
    <>
      <OurHeader />
      <LikeArea />
      <TimeArea />
      <AddTodoForm setTodos={setTodos} />
      <ul>
        {todos.map(todo => <Todo setTodos={setTodos} id={todo.id} name={todo.name} key={todo.id} />)}
      </ul>
      <Footer />
     </>
  )
}

function AddTodoForm(props) {
  const [name, setName] = useState()
  
  function handleSubmit(e){
    e.preventDefault()
    props.setTodos(prev => prev.concat({name, id: Date.now()}))
    setName("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Todo</legend>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <button>Add Todo</button>
      </fieldset>
    </form>
  )
}
function LikeArea(){
  const [likeCount, setLikeCount] = useState(0)
  
  function increaseLikeHandler(){
    setLikeCount(prev =>{
      return prev + 1
    })
  }
  function decreaseLikeHandler(){
    setLikeCount(prev =>{
      if(prev > 0) return prev - 1
      else return 0
    })
  }
  return (
    <>
      <button onClick={increaseLikeHandler}>Increase Likes</button>
      <button onClick={decreaseLikeHandler}>Decrease Likes</button>
      <h2>This page has been liked {likeCount} times.</h2>
    </>
  )
}

function Todo(props){
  function handleDelete(){
    props.setTodos(prev => prev.filter(todo => todo.id != props.id))
  }
  return (
    <li>{props.name} 
      <button onClick={handleDelete}>Delete</button>
    </li>
    )
}
function OurHeader(){
  return <h1 className="special">To Dos</h1>
}

function TimeArea(){
  const [theTime, setTheTime] = useState(new Date().toLocaleString())
  
  useEffect(() => {
    const interval = setInterval(() => setTheTime(new Date().toLocaleString()), 1000) 
    
    return() => clearInterval(interval)
    
  }, [])
  return <p>Current time is {theTime}</p>
}
function Footer(){
  return <small>Footer</small>
}

//setInterval(() => ReactDOM.render(<OurApp />, document.querySelector("#app")), 1000)


export default App;
