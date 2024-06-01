import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useUser } from '../../../../helper/UserContext';

const Chat = () => {
  const { user, token } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const pk = 'c6d90f7b-0c23-4c3b-9631-65e696e8689e';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <ChatEngine
        height='100vh'
        publicKey={pk}
        userName={user?.name} // adam
        userSecret={user?.name + '123'} // pass1234
        isTyping={false}
      />
    </div>
  );
};

export default Chat;
