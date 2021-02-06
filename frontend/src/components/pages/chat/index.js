import '../../../assests/styles/chat.css';
import {FiSend} from 'react-icons/fi';
import Message from '../../atoms/message';
import useChat from '../../logic/useChat';

function ChatPage(){
    const {
        setMessage,
        HandleSend
    } = useChat();
    return (
        <div className="chat-page">
            <div className="chats-box">
                <Message />
                <Message />
                <Message />
            </div>
            <div className="send-chat-box">
                <input id="send-chat-input" placeholder="Write something ... " onChange={(e) => setMessage(e.target.value)}/>
                <div className="send-icon" onClick={HandleSend}>
                    <FiSend />
                </div>
            </div>
        </div>
    );
}
export default ChatPage;

// import  io from 'socket.io-client';
// class ChatPage extends Component{
//     componentDidMount(){
//         fetch('http://localhost:3000/user/loginUser', {
//             method: 'POST',
//             body: JSON.stringify({
//                 userEmail: 'bharti@gmail.com',
//                 userPassword: 'bharti'
//             })
//         }).then(result => {
//             console.log('res', result);
            // const abd = io.connect('http://localhost:8080');
            // const socket = io('http://localhost:3000');
            // socket.on('connect', function(){ 
            //     console.log('here'); 
            // socket.disconnect();
            // socket.io.reconnect();
            // });
            // socket.on('reconnect', function(){
            // console.log(socket.connected); // false
            // console.log(socket.disconnected); // true
            // });
            // console.log('here');
        //     console.log(socket);
        // });
        
//     }
//     render(){
//         return (
//             <div className="chat-page">
//                 <div className="chats-box">
//                     <Message />
//                     <Message />
//                     <Message />
//                 </div>
//                 <div className="send-chat-box">
//                     <input id="send-chat-input" placeholder="Write something ... " onChange={(e) => null}/>
//                     <div className="send-icon" onClick={null}>
//                         <FiSend />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
