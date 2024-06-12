import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Grid, Spacer, Loading } from "@nextui-org/react";
import NavBar from './components/navbar';
import BlogContent from './components/blog_content';

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);

  const jwt = queryParams.get('jwt');
  const username = queryParams.get('username');
  const id = queryParams.get('id');
  const avatar_url = queryParams.get('avatar_url');

  // logout here.
  const handleLogout = () => {
    localStorage.removeItem("simpleblog-user");
    setUser(false);
    navigate('/');
  }

  // login with github
  const handleLogin = () => {
    window.location.replace(`${process.env.REACT_APP_API_URL}/auth/github`);
  }


  if (jwt && username && id) {
    localStorage.setItem('simpleblog-user', JSON.stringify({ jwt, username, id, avatar_url }));
  }

  useEffect(() => {
    const appuser = localStorage.getItem('simpleblog-user');
    if (appuser) {
      setUser(JSON.parse(appuser))
    }
    setIsLoading(false);
    navigate('/');
  }, [])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Spacer />
      <Grid.Container justify="center">
        <Grid xs={1}>
          <NavBar user={user} handleLogout={handleLogout} handleLogin={handleLogin} />
        </Grid>
        <Grid xs={11}>
          <BlogContent user={user} navigate={navigate} />
        </Grid>
      </Grid.Container>

    </>
  );

}

export default App;
