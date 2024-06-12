import { Link } from 'react-router-dom';
import { Link as NextLink } from "@nextui-org/react";


export default function NavBar({ user, handleLogin, handleLogout }) {
    if (!user) {
        return (
            <ul>
                <li><NextLink onClick={handleLogin}>Login</NextLink></li>
            </ul>
        )
    } else {
        return (
            <ul>
                <li><Link to="/">Blogs</Link></li>
                <li><Link to="/create">New Blog</Link></li>
                <li><Link to={"/blogs/user/" + user.id}>My Blogs</Link></li>
                <li><NextLink onClick={handleLogout}>Logout</NextLink></li>
            </ul>
        );
    }
}
