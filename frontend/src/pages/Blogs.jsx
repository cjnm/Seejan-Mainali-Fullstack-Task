import { useState, useEffect } from "react";
import { Grid, Card, Text, Divider, Row, Button, Container, Loading, Avatar, Tooltip } from "@nextui-org/react";
import { getAllBlogs } from "../utils/http/blog";

export default function Blogs({ navigate, user }) {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllBlogs().then(data => {
            if (data.success && data.data.length > 0) {
                setBlogs(data.data);
            } else {
                setBlogs([])
            }
            setIsLoading(false);
        });
    }, []);

    const BlogCard = ({ id, title, content, avatar_url, username }) => {
        return (
            <Card hoverable css={{ w: "330px", h: "220px" }}>
                <Card.Header>
                    <Text b>{title.length > 45 ? title.slice(0, 40) + '...' : title}</Text>
                </Card.Header>
                <Divider />
                <Card.Body css={{ py: "$10" }}>
                    <Text>
                        {content.length > 90 ? content.slice(0, 90) + '...' : content}
                    </Text>
                </Card.Body>
                <Divider />
                <Card.Footer>
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
                    <Row justify="flex-end">
                        <Button 
                        onClick={() => { navigate(`/blog/${id}`, { state: { title, content, username, avatar_url } }) }} 
                        auto color="gradient" 
                        rounded bordered 
                        size="sm"
                        >Continue Reading</Button>
                    </Row>
                </Card.Footer>
            </Card>
        );
    };

    if (!isLoading && blogs.length > 0) {
        return (
            <Container fluid>
                <Text h2>Blogs</Text>
                <Grid.Container gap={2} justify="left">
                    {
                        blogs.map((blog) => {
                            return (
                                <Grid key={blog.id}>
                                    <BlogCard
                                        id={blog.id}
                                        title={blog.title}
                                        content={blog.content}
                                        avatar_url={blog.avatar_url}
                                        username={blog.username}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid.Container>
            </Container>
        )
    } else if (!isLoading && blogs.length === 0) {
        return (
            <Container fluid>
                <Text h2>Blogs</Text>
                <Grid.Container gap={2} justify="center">
                    <Grid>
                        No blogs found.
                    </Grid>
                </Grid.Container>
            </Container>
        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }
}
