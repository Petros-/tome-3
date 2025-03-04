import { useState } from 'react'
import './App.css'
import EmailForm from './auth/EmailForm'
import TopNav from './TopNav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopNav /> 
      <EmailForm />
    </>
  )
}

export default App
