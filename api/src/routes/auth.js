import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getGithubAuthURI, getGithubAccesstokenURI } from '../utils/auth.js';
import { saveUser } from '../controllers/user.js';

const authRouter = express.Router();

// Github oAuth
// Redirects to Github oAuth for token
authRouter.get('/github', (req, res) => {
    try {
        const githubAuthURI = getGithubAuthURI();
        res.redirect(githubAuthURI);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

// Github oAuth callback to get token, generate jwt and redirect to home
authRouter.get('/github/callback', async (req, res) => {
    try {
        const { code } = req.query;

        //get access token
        let response = await axios.post(getGithubAccesstokenURI(code), {}, { headers: { Accept: 'application/json' } });
        const { access_token } = response.data;

        //get user info
        let user_response = await axios.get('https://api.github.com/user', { headers: { Authorization: `token ${access_token}` } });

        //preapre user info
        const { login: username, id, avatar_url, name, email } = user_response.data;

        await saveUser(
            {
                username,
                id,
                avatar_url,
                name,
                email
            }
        );
        const token = jwt.sign(
            { username: username, id: id },
            `${process.env.JWT_SECRET}-${id}`,
            { expiresIn: '12h' }
        );


        res.redirect(`${process.env.FRONTEND_URI}/login?jwt=Bearer ${token}&username=${username}&id=${id}&avatar_url=${avatar_url}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

})

export default authRouter;
