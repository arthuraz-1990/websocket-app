import { useEffect, useState } from 'react';
import './index.css';
import { Box, Button, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import useWebSocket from '../../hooks/WebSocket';

const HomePage = () => {

    const { isReady, client } = useWebSocket();
    const [ msg, setMsg ] = useState(null);

    const [ msgList, setMsgList ] = useState([]);

    const onChange = (e) => {
        setMsg(e.target.value);
    }

    const sendMessage = () => {
        client.publish({ destination: '/app/message', body: msg });
        setMsg(null);
    }

    const onNewMessage = (message) => {
        console.log('Recebeu mensagem:', message);
        const newMessage = JSON.parse(message.body).content;
        setMsgList(m => [...m, newMessage]);
    }

    useEffect(() => {
        if (client && isReady) {
            console.log('Subscribe topic');
            client.subscribe('/topic/messages', onNewMessage);
        }
    }, [client, isReady]);


    return (
        <div className="App">
            { isReady && (
                <Box>
                    <Box sx={{ 
                        display: 'flex', columnGap: 2, marginTop: 5,
                        alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TextField size='small' onChange={onChange} value={msg || ''} label='Mensagem' />
                        <Button color='primary' variant='contained' disabled={msg === null} onClick={sendMessage}>Enviar</Button>
                    </Box>
                    <Table>
                        <TableBody>
                            { msgList.map(item => 
                                <TableRow>
                                    <TableCell>{item.message}</TableCell>
                                    <TableCell>{item.dateTime}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </Box>                
            )}
            
            
        </div>
    )
}

export default HomePage;