import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { socket, online } = useSocket();
    const [quejas, setQuejas] = useState([]);
    const [nuevaQueja, setNuevaQueja] = useState();
    const [sinGuardar, setSinGuardar] = useState(false);
    
    //Obtenemos las quejas de la base de datos
    //Se emite una peticion 
    useEffect(() => {
        socket.emit('Obtener-Quejas');
    }, [socket])
    //se obtiene respuesta
    useEffect(() => {
        socket?.on('Quejas', (queja) => { 
            setQuejas(queja);
        });
    }, [socket])
  
    //confirmacion de que la queja se guardo con exito
    useEffect(() => {
        socket?.on('Queja-Guardada', (queja) => {
            setNuevaQueja(queja);
        });
    }, [socket])

    //La queja no se guardo correctamente
    useEffect(() => {
        socket?.on('Queja-sin-guardar', () => {
            setSinGuardar(true)
        });
    }, [socket])


    return (
        <SocketContext.Provider value={{ socket, online, quejas, nuevaQueja, sinGuardar}}>
            { children }
        </SocketContext.Provider>
    )
}