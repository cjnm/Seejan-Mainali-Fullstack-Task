import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import { Grid, Text, Container, Loading, Row, Spacer } from "@nextui-org/react";

export default function Chats({ navigate, user }) {
    const [isLoading, setIsLoading] = useState(0);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const ENDPOINT = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        newSocket.on('connect', () => {
            console.log('socket connected');
        })

        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('message_received', (data) => {
            console.log({ message: data });
            // if (user_id == data?.sender) return;

            // setMessages([...messages, data])
        });
    })

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
                                    <Loading />
                                </Row>
                                : messages.length
                                    ? messages.map((message) => {
                                        return <Message model={{
                                            message: "Hello my friend ok2",
                                            sentTime: "just now",
                                            sender: "Joe"
                                        }} />
                                    })
                                    : <Row justify="center" align="center">
                                        <Spacer y={10} />
                                        <Text>No Messages found.</Text>
                                    </Row>
                            }
                        </MessageList>
                        <MessageInput placeholder="Type message here" attachButton={false} />
                    </ChatContainer>
                </MainContainer>
            </Grid.Container>
        </Container>
    )
}
