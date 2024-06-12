const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, APP_URI, PORT } = process.env;

// returns the Github oAuth url
const getGithubAuthURI = () => {
    const redirect_uri = `${APP_URI}:${PORT}/auth/github/callback`

    return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user:email`
}

// returns the Github auth token url
const getGithubAccesstokenURI = (code) => {

    return `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;
}

export { getGithubAuthURI, getGithubAccesstokenURI }
