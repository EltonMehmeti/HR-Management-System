import { ChatEngine } from 'react-chat-engine'
import {useJwt} from "react-jwt";
import env from 'react-dotenv';

const Chat = (props) => {
const { decodedToken, isExpired } = useJwt(props?.token);
console.log(decodedToken, isExpired,props?.user)
const pk = '340652c6-75a3-4190-ab08-cb80e3ae3869'
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ChatEngine
         publicKey={pk}
         userName={'Blendi Miftari'} // adam
        userSecret={'blendi123'} // pass1234
      />
    </div>
  );
};

export default Chat;
