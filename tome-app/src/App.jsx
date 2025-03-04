import { useState } from 'react'
import './App.css'
import EmailForm from './auth/EmailForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmailForm />
    </>
  )
}

export default App
