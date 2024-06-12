import { Routes, Route } from 'react-router-dom'
import Blogs from '../pages/Blogs'
import Blog from '../pages/Blog'
import CreateBlog from '../pages/CreateBlog'
import MyBlogs from '../pages/MyBlogs';
import EditBlog from '../pages/EditBlog';

export default function BlogContent(props) {
    if (!props.user) {
        return (
            <Routes>
                <Route path="/" element={<Blogs navigate={props.navigate} />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="*" element={<Blogs navigate={props.navigate} />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<Blogs navigate={props.navigate} user={props.user} />} />
                <Route path="/blogs/user/:id" element={<MyBlogs navigate={props.navigate} user={props.user} />} />
                <Route path="/create" exact element={<CreateBlog navigate={props.navigate} user_id={props.user.id} />} />
                <Route path="/edit/:id" exact element={<EditBlog user_id={props.user.id} />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="*" element={<Blogs navigate={props.navigate} user={props.user} />} />
            </Routes>
        );
    }

}
