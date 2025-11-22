import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <Screen/>
    </Card>
  )
}

export default App
