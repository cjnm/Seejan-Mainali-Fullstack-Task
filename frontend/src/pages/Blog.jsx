import { useLocation } from "react-router";
import { Container, Text, Spacer, Avatar, Row, Tooltip } from "@nextui-org/react";

export default function Blog() {
    const { state } = useLocation();
    const { title, content, avatar_url, username } = state;

    return (
        <Container fluid>
            <Text h2>Blogs</Text>
            <Row justify="flex-start">
                <Tooltip
                    color="primary"
                    content={username}
                    placement="top"
                >
                    <Avatar
                        src={avatar_url || ''}
                        text={username || ''}
                    />
                </Tooltip>
            </Row>
            <Spacer />
            <Text h4>{title}</Text>
            <Spacer />
            <Text size="1.25rem">{content}</Text>
        </Container>
    );
}
