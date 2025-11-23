// import React, { useState, useEffect, useRef } from 'react';

// // A simple grid size for demonstration
// const GRID_SIZE = 10;

// export default function GridClient(userId) {
//   // 1. State for the grid data (mapping "x,y" keys to color strings)
//   const [gridState, setGridState] = useState({});
//   // State for connection status
//   const [isConnected, setIsConnected] = useState(false);
  
//   // 2. Ref to hold the WebSocket instance
//   // We use useRef so the connection persists between renders but doesn't cause re-renders itself
//   const ws = useRef(null);

//   // 3. Effect to Initialize WebSocket Connection
//   useEffect(() => {
//     // Connect to the server
//     ws.current = new WebSocket('ws://localhost:8080');

//     // Connection Opened
//     ws.current.onopen = () => {
//       console.log("Connected to Paint Server");
//       setIsConnected(true);
//     };

//     // Connection Closed
//     ws.current.onclose = () => {
//       console.log("Disconnected from Paint Server");
//       setIsConnected(false);
//     };

//       // 4. Handle incoming updates from the server
//     const handleUpdateMessage = (data) => {
//         const { x, y, value } = data;
//         const key = `${x},${y}`;

//         // Functional state update to ensure we have the latest previous state
//         setGridState(prev => ({
//         ...prev,
//         [key]: value
//         }));
//     };

//     // 5. Send paint command to server
//     const sendPaint = (x, y, colorValue) => {
//         if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//         const payload = {
//             type: 'PAINT',
//             userId: userId,
//             x: x,
//             y: y,
//             value: colorValue
//         };
        
//         ws.current.send(JSON.stringify(payload));
        
//         // Optimistic update: Update local state immediately for better UX
//         // (Optional: You could wait for the server echo instead)
//         // handleUpdateMessage({ x, y, value: colorValue }); 
//         } else {
//         console.error("Connection not open");
//         }
//     };

//     // Message Received
//     ws.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         if (data.type === 'UPDATE') {
//           handleUpdateMessage(data);
//         }
//       } catch (e) {
//         console.error("Failed to parse incoming message", e);
//       }
//     };

//     // Cleanup: Close connection when component unmounts
//     return () => {
//       if (ws.current) {
//         ws.current.close();
//       }
//     };
//   }, []); // Empty dependency array = run only on mount/unmount
// };