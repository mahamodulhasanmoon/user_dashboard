import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";

export default function Online() {
    const [users,setUsers]= useState<any>([])
    const { socket, sendToServer, receive, joinRoom } = useSocket();
    useEffect(() => {
      
        receive('userListUpdate', (users:any) => {
            setUsers(users)
          console.log('Updated user list:', users);

        });

        return () => {
          socket.off('userListUpdate');
        };
      }, [sendToServer, receive, joinRoom,socket]);

      useEffect(() => {
        const handleBeforeUnload = () => {
          sendToServer('userDisconnected', 'yourUserId');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [sendToServer]);
      
  return (
    <div>Online User : {users.length}</div>
  )
}
