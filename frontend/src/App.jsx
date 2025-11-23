import { useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { useWebSocket } from './hooks/webHooks'
import { authenticate } from './services/restService'
import './App.css'
import Screen from './components/Screen'
import ColorSelector from './components/ColorSelector'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import bg from './img/bg.png'

function App() {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [auth, setAuth] = useState(null)
  const [building, setBuilding] = useState('morgridge-hall')

  const { isConnected, message, send } = useWebSocket('ws://localhost:8080/ws')

  return (
    <div className="bg-image" style={{
      backgroundImage: `url(${bg})`,
      position: "fixed",
      inset: 0,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      }}>

      <TransformWrapper
        initialScale={1}
        centerOnInit
        minScale={0.3}
        maxScale={5}
      >
      <TransformComponent
        wrapperStyle={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
        }}>

      <Screen selectedColor={selectedColor} />

      </TransformComponent>
      </TransformWrapper>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 30,
          display: "flex",
          justifyContent: "center",
          gap: 8
        }}
      >
      <ColorSelector
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />
      <Button onClick={async () => {
          const token = await authenticate()
          console.log('Got token:', token)
          setAuth(token.auth)
          const initialState = token.state
        }}>
          Authenticate
        </Button>

        <Button onClick={() => {
          const x = document.getElementById('xCoord')?.value
          const y = document.getElementById('yCoord')?.value
          const color = selectedColor
          const grid_data = send({ 
            type: 'paint', 
            auth: auth, 
            building: building, 
            x, 
            y, 
            color 
          })
        }}>
          Send Update
        </Button>
      </div>
    </div>
  )
}

export default App