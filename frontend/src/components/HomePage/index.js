import { useEffect, useState } from 'react';
import './index.css';
import { Alert, Box, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import useWebSocket from '../../hooks/WebSocket';

const HomePage = () => {

    const { isReady, client } = useWebSocket();
    const [ msg, setMsg ] = useState(null);
    const [ open, setOpen ] = useState(false);
    const [ message, setMessage ] = useState(null);

    const [ msgList, setMsgList ] = useState([]);

    const onChange = (e) => {
        setMsg(e.target.value);
    }

    const sendMessage = () => {
        client.publish({ destination: '/app/message', body: msg });
        setMsg(null);
    }

    const onNewMessage = (message) => {
        console.log('Recebeu mensagem:' + message.body);
        const newMessage = JSON.parse(message.body);
        setMsgList(m => [...m, newMessage]);
        setMessage('Nova mensagem recebida...');
        setOpen(true);
    }

    const onCloseAlert = () => {
        setOpen(false);
        setMessage(null);
    }

    useEffect(() => {
        if (client && isReady) {
            client.subscribe('/topic/messages', onNewMessage);
        }
    }, [client, isReady]);


    return (
        <div className="App">
            <Snackbar open={open} autoHideDuration={2000} onClose={onCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={onCloseAlert} variant='filled' severity='warning' >
                    {message}
                </Alert>
            </Snackbar>
            { isReady && (
                <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 10}}>
                    <Box sx={{ 
                        display: 'flex', columnGap: 2, marginTop: 5,
                        alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TextField size='small' onChange={onChange} value={msg || ''} label='Mensagem' />
                        <Button color='primary' variant='contained' disabled={msg === null} onClick={sendMessage}>Enviar</Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 1080, alignSelf: 'center'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mensagem</TableCell>
                                    <TableCell>Data/Hora</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { msgList.length > 0 ?
                                    msgList.map((item, idx) => 
                                        <TableRow key={idx}>
                                            <TableCell>{item.message}</TableCell>
                                            <TableCell width={'20%'}>{item.dateTime}</TableCell>
                                        </TableRow>
                                    )
                                    :
                                    <TableRow>
                                        <TableCell colSpan={2}>Nenhuma mensagem recebida.</TableCell>
                                    </TableRow>
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>                
            )}
            
            
        </div>
    )
}

export default HomePage;