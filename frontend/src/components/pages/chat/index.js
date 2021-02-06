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