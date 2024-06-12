import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Container, Divider, Text, Input, Spacer, Textarea, Button } from "@nextui-org/react";
import { updateBlog } from "../utils/http/blog";

export default function EditBlog({ user_id }) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { title: blog_title, content: blog_content, id: blog_id } = state;

    const [title, setTitle] = useState(blog_title);
    const [content, setContent] = useState(blog_content);

    const handleSave = async () => {
        if (!title || !content) {
            alert('Cannot save empty content.');
            return;
        }

        if (title === blog_title && content === blog_content) {
            navigate(`/blogs/user/${user_id}`);
            return;
        }

        try {
            await updateBlog(title, content, blog_id).then(response => {
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
