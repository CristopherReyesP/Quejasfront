import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const connectSocketServer = () => {
    const socket = io.connect('http://localhost:8080', {
        transports: ['websocket']
    });
    return socket;
}

export const useSocket = (  ) => {
    
    const [socket] = useState(connectSocketServer);
    const [ online, setOnline ] = useState(false); 

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online
    }
}