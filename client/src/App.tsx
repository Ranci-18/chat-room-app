import React, { useEffect, useState } from 'react';
import socket from './socket';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat ] = useState<string[]>([]);

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setChat(prevChat => [...prevChat, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="App" style={{ padding: "2rem"}}>
      <h1>Chat App</h1>
      <ul>
        {chat.map((msg, idx) => (
          <li key={idx} style={{ listStyle: "none", margin: "1rem 0" }}>
            {msg}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type='submit'>send</button>
      </form>
    </div>
  );
}

export default App;
