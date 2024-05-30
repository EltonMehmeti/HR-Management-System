import React from 'react'
import { useUser } from '../../../../helper/UserContext';
import Chat from './Chat';

const EmployeeTeam = () => {
    const {user, token} = useUser();

  return (
    <div>


        <Chat user={user?.name} token={token}/>
    </div>
  )
}

export default EmployeeTeam