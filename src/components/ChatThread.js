import React,{useState,useEffect} from 'react';
import {ListGroup,ListGroupItem,ListGroupItemHeading,ListGroupItemText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment'
import Socket from '../utils/socket'

function ChatThread({conversations,setConversations}){

    // useEffect(()=>{
    

    //   },[])

    if (conversations.length==0){
        return(<></>)
    }
        
    return(
        <ListGroup>
            {conversations.map((chat,idx)=>(
                <ListGroupItem key={idx} className="d-flex">
                    <img className="rounded-circle" src={`https://api.adorable.io/avatars/150/${chat.username}.png`} width="50px" height="50px"/>
                    <ListGroupItemHeading>{chat.username}</ListGroupItemHeading>
                    <div className="ml-5 justify-content-start">
                        <ListGroupItemText>{chat.message}</ListGroupItemText>
                        <small>{moment(chat.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</small>
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}

export default  ChatThread