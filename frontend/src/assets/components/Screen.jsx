import { useState, useRef } from 'react'
import { Button, Card } from 'react-bootstrap'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'

function App() {

    const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); // Or 'webgl' for 3D
    // Call the provided draw function with the context
    draw(context);
  }, [draw, width, height]); // Re-draw if these props change

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export default App
