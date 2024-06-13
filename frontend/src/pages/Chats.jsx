import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Loader, Avatar } from '@chatscope/chat-ui-kit-react';
import { Grid, Text, Container, Row, Spacer } from "@nextui-org/react";

export default function Chats({ navigate, user }) {
    const [isLoading, setIsLoading] = useState(0);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const localUser = localStorage.getItem('simpleblog-user');
    const { jwt, username: local_username, avatar_url: local_avatar_url } = JSON.parse(localUser);

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

    const sendMessage = (message) => {
        const payload = {
            message,
            auth: jwt
        }

        socket.emit('new_message', payload);
        setMessages((previousMessages) => [...previousMessages, { message, username: local_username, avatar_url: local_avatar_url, direction: 'outgoing' }])
    }

    return (
        <Container fluid style={{ height: "100%" }}>
            <Text h2>Public Groupchat</Text>
            <Grid.Container gap={2} justify="left" style={{ height: "100%" }}>
                <MainContainer style={{ position: "relative", height: "100%", width: "100%" }}>
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
                                            direction: message?.direction || "incoming"
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
