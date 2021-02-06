import { useState } from "react";

const useChat = () =>{
    const [message, setMessage] = useState();
    const HandleSend = () => {
        console.log(message);
        document.getElementById('send-chat-input').value = '';
    }
    return {
        setMessage,
        HandleSend
    }
}
export default useChat;