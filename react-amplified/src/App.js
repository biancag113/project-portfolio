/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries';
import './App.css';
import headshot from './headshot.png';
import background from './background.jpg';
import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react';
import Login from './Login.js';
import About from './About.js';

Amplify.configure(awsExports);


const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div id='container'>      
      <img src={background} id='background' />


      <div class="nav">
        <button class="navbutton" onClick='/about'>About</button>
        <button class="navbutton" onClick='/projects'>My Projects</button>
        <button class="navbutton" onClick='/videos'>Video Tutorials</button>
        <button class="navbutton" onClick='/blog'>Blog</button>
        <button class="navbutton" onClick='/contact'>Contact</button>
        <button class="login" onClick='/login'>Login</button>
      </div>


      
    </div>
  )
}



export default App
