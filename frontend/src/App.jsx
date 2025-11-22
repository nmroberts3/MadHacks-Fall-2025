import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useWebSocket } from './hooks/webHooks'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import Screen from './components/Screen'

function App() {
  const [count, setCount] = useState(0);

  const { isConnected, message, send } = useWebSocket("ws://localhost:8080/ws");

  

  {/* code for sending update*/}

  <Button onClick={() => {
    send({ type: "paint", x: document.getElementById("xCoord").value, y: document.getElementById("yCoord").value , color : document.getElementById("color").value});
  }}>
    Send Update
  </Button>

  return <Card>

    <Screen/>


  </Card>
}

export default App
