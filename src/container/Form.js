import React,{useState} from 'react';
import {Form,Input} from 'reactstrap';
import Socket from '../utils/socket';

function ChatForm({conversations,setConversations,username}){
    
    const [textInput,setTextInput] = useState("");
    function sendMessage(e){
        e.preventDefault();
        Socket.emit('BROADCAST_MESSAGE',{username:username,message:textInput,timestamp:Date.now()})
        // setConversations([...conversations,{username:username,message:textInput,timestamp:Date.now()}])
        setTextInput("")
    }

    return(
        <Form onSubmit={(e)=>sendMessage(e)}>
            <Input type="text" onChange={(e)=>setTextInput(e.target.value)} value={textInput} placeholder="type a message"></Input>
            {/* <Input type="submit" value="Submit">Send</Input> */}
        </Form>
    )
}
export default ChatForm