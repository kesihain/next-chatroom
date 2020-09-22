import React,{useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ChatForm from './container/Form';
import ChatThread from './components/ChatThread';
import axios from 'axios';
import Socket from './utils/socket';
function App() {

  const [currentUsers,setCurrentUsers] = useState([]);
  const [username,setUsername] = useState("");
  const [conversations,setConversations] = useState([]);

useEffect(()=>{
  Socket.emit('NEW_USER')

  Socket.on('GET_CURRENT_USER', user=>{
    setUsername(user.username)
    // console.log(user)
  })

  Socket.on('UPDATE_USER_LIST', users=>{
    // console.log(users)
    setCurrentUsers(users)
  })
  Socket.on('RECEIVE_BROADCAST',data=>{
    setConversations((prevState)=>{
        return [...prevState,data]
    })
})
},[])

  return (
    <div className="App">
      <div className="d-flex bg-light h-100">
        <div className="bg-dark h-100" width="200px">
          <h4 className="test-light">Online users</h4>
          {currentUsers.map((u,i)=>(
            <div key={i} className={u.username==username?"text-secondary":"text-light"}>
              <p >{u.username}</p>
            </div>
          ))}
        </div>
        <div className="flex-grow-1">
          <div className="bg-dark w-100">
            <h2>Next Chat</h2>
            <div className="container m-1 d-flex flex-column">
              <ChatThread conversations={conversations} setConversations={setConversations}></ChatThread>
              <ChatForm conversations={conversations} setConversations={setConversations} username={username}></ChatForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
