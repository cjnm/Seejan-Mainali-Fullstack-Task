import { useState } from "react";
import { Container, Divider, Text, Input, Spacer, Textarea, Button } from "@nextui-org/react";
import { createNewBlog } from "../utils/http/blog";

export default function CreateBlog({ navigate, user_id }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async () => {
        if (!title || !content) {
            alert('Please enter title and blog content.');
            return;
        }

        try {
            await createNewBlog(title, content).then(response => {
                if (response.success) {
                    navigate(`/blogs/user/${user_id}`);
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container fluid>
            <Text h2>Write new Simpleblog</Text>
            <Divider />
            <Input
                fullWidth="true"
                placeholder="Blog Title" value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Spacer />
            <Textarea
                value={content}
                fullWidth="true"
                placeholder="Enter your amazing ideas."
                rows="15"
                onChange={e => setContent(e.target.value)}
            />
            <Spacer />
            <Button onClick={handleSave}>Save</Button>
        </Container>
    );
}
