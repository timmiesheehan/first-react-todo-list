import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';

const useState = React.useState
const useEffect = React.useEffect

function App(){
  
  const [pets, setPets] = useState([])
  
  // only run once this component is rendered
  useEffect(() => {
    if(localStorage.getItem("examplePetData")){
      setPets(JSON.parse(localStorage.getItem("examplePetData")))
    }
  }, [])
  
  // run every time our pet store changes
  useEffect(() => {
    localStorage.setItem("examplePetData", JSON.stringify(pets)) 
  }, [pets])
  
  return (
    <>
      <OurHeader />
      <LikeArea />
      <TimeArea />
      <AddPetForm setPets={setPets} />
      <ul>
        {pets.map(pet => <Pet setPets={setPets} id={pet.id} name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
      </ul>
      <Footer />
     </>
  )
}

function AddPetForm(props) {
  const [name, setName] = useState()
  const [species, setSpecies] = useState()
  const [age, setAge] = useState()
  
  function handleSubmit(e){
    e.preventDefault()
    props.setPets(prev => prev.concat({name, species, age, id: Date.now()}))
    setName("")
    setSpecies("")
    setAge("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="species" />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="age in years" />
        <button>Add Pet</button>
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

function Pet(props){
  function handleDelete(){
    props.setPets(prev => prev.filter(pet => pet.id != props.id))
  }
  return (
    <li>{props.name} is a {props.species} and is {props.age} years old.
      <button onClick={handleDelete}>Delete</button>
    </li>
    )
}
function OurHeader(){
  return <h1 className="special">Our App</h1>
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
