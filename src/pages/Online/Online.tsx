import { useContext, useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { AuthContext } from "../../Contexts/AuthProvider";

export default function Online() {
  const {user}= useContext(AuthContext)
    const [users,setUsers]= useState<any>([])
    const { socket, sendToServer, receive, joinRoom } = useSocket();

    useEffect(() => {
        receive('userListUpdate', (users:any) => {
            setUsers(users)

        });
        sendToServer('addUser', user)
        return () => {
          socket.off('userListUpdate');
        };
      }, [sendToServer, receive, joinRoom,socket]);
      
  return (
    <div>
    <h2 className="text-center text-2xl my-5 ">Online User : {users.length}</h2>
<h4 className="text-xl">Users Lists:</h4>
    <ul>
    {  users.map((user:any) =>   <li key={user}>{user}</li>)}
    
    </ul>
    </div>
  )
}
