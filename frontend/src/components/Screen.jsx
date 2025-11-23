import { useState, useRef, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import './Screen.css'

function Screen({ selectedColor }) {
  const [pixels, setPixels] = useState(Array(100*100).fill('rgb(255, 255, 255)'))
  const [colored, setColored] = useState(-1)
  const pixelSize = 10

  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef(null);


  const handleMouseDown = () => {
    setTimerRunning(true);
    // Start the timer
    intervalRef.current = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 100); // Increment every 100ms
    }, 100);
  };

  const handleMouseUp = () => {
    setTimerRunning(false);
    // Stop the timer
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    // Also stop the timer if the mouse leaves the element while pressed
    if (timerRunning) {
      setTimerRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    // Cleanup function to clear the interval if the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(100, ${pixelSize}px)`,
        gridTemplateRows: `repeat(100, ${pixelSize}px)`,
        border: '3px solid rgb(210, 210, 200)',
        width: (100*pixelSize +5),
        background: 'white',
        margin: '20px auto'
      }}
    >

      {
        pixels.map((p, i) => (
          <div
            key={i}
            className='pixel'
            style={{
              background: p
            }}
            onMouseUp={() => {
              
              
              if (timeElapsed < 200) {
                setPixels(
                  prevPixels => {
                    const copy = [...prevPixels]
                    copy[i] = selectedColor || 'black'
                    return copy
                  }
                )
              }
              setTimerRunning(false);
              clearInterval(intervalRef.current);
            }}

            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
          />
        ))
      }
    </div>
  )
}

export default Screen