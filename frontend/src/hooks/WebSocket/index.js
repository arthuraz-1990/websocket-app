import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";

const useWebSocket = () => {

    const [ isReady, setIsReady ] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/websockets",
            onConnect: (frame) => {
                console.log('Conectou!!');
                setIsReady(true);
            },
            onStompError: (error) => {
                console.log(error);
            },
            onWebSocketError: (error) => {
                console.log(error)
            }
        });

        ws.current = client;

        client.activate();

        return () => {
            client.deactivate();
        }
    }, []);

    return {
        isReady,
        client: ws.current
    }
}

export default useWebSocket;