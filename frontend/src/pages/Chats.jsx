import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Loader, Avatar } from '@chatscope/chat-ui-kit-react';
import { Grid, Text, Container, Row, Spacer } from "@nextui-org/react";
import { getAllChats } from "../utils/http/chat";

export default function Chats({ navigate, user }) {

    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const { jwt, username: local_username, avatar_url: local_avatar_url } = user;

    const ENDPOINT = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        newSocket.on('connect', () => {
            console.log('socket connected');
            newSocket.emit('setup');
        })

        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        if (socket) {
            console.log('here be socket')
            socket.on('message_received', (data) => {
                const { message, username, avatar_url } = data;

                setMessages((previousMessages) => [...previousMessages, { message, username, avatar_url }])
            });
        }
    }, [socket])

    useEffect(() => {
        getAllChats().then(data => {
            if (data.success && data.data.length > 0) {
                setMessages(data.data);
            } else {
                setMessages([])
            }
            setIsLoading(false);
        });
    }, []);

    const sendMessage = (message) => {
        const payload = {
            message,
            auth: jwt
        }

        socket.emit('new_message', payload);
        setMessages((previousMessages) => [...previousMessages, { message, username: local_username, avatar_url: local_avatar_url }])
    }

    return (
        <Container fluid style={{ height: "90vh"}}>
            <Text h2>Public Groupchat</Text>
            <Grid.Container gap={2} justify="left" style={{ height: "100%" }}>
                <MainContainer style={{ position: "relative", width: "100%" }}>
                    <ChatContainer>
                        <MessageList>
                            {isLoading
                                ? <Row justify="center" align="center">
                                    <Spacer y={10} />
                                    <Loader>Loading messages</Loader>
                                </Row>
                                : messages.length
                                    ? messages.map((message, key) => {
                                        return <Message key={key} model={{
                                            message: message.message,
                                            sentTime: "just now",
                                            sender: message.username,
                                            direction: message.username === local_username ? "outgoing" : "incoming"
                                        }}>
                                            <Avatar src={message.avatar_url} name={message.username}/>
                                        </Message>
                                    })
                                    : <Row justify="center" align="center">
                                        <Spacer y={10} />
                                        <Text>No Messages found.</Text>
                                    </Row>
                            }
                        </MessageList>
                        <MessageInput placeholder="Type message here" attachButton={false} disabled={!!isLoading} onSend={sendMessage} />
                    </ChatContainer>
                </MainContainer>
            </Grid.Container>
        </Container>
    )
}
