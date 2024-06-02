import React, { useState, useEffect } from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { useUser } from '../../../../helper/UserContext';
import Cookies from 'js-cookie';

const Chat = () => {
  const { user, token } = useUser();
  const [credentials, setCredentials] = useState({ userName: '', userSecret: '', ready: false });

  useEffect(() => {
    // Fetch user data from cookies
    const userData = Cookies.get('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCredentials({
        userName: parsedUser.name,
        userSecret: `${parsedUser.name}123`,
        ready: true
      });
    }
  }, []);

  const pk = '09da91a9-59f2-4738-9be3-de0379c5c4f7';

  if (!credentials.ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[93.4vh] w-full flex flex-col">
      <PrettyChatWindow
        className="flex-grow"
        height="100%"
        projectId={pk}
        username={credentials.userName}
        secret={credentials.userSecret}
        onConnect={() => console.log('Connected to Chat Engine')}
        onFailAuth={(error) => console.error('Failed to authenticate:', error)}
        onError={(error) => console.error('WebSocket Error:', error)}
      />
    </div>
  );
};

export default Chat;
