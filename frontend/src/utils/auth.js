const buildAuthHeaders = () => {
    const localUser = localStorage.getItem('simpleblog-user');
    if (localUser) {
        const { jwt, username, id, avatar_url } = JSON.parse(localUser);
        return {
            headers: {
                Authorization: `${jwt}`,
                'X-User-Id': id,
                'X-User-Username': username,
                'X-User-Avatar': avatar_url
            }
        }
    } else {
        return {
            headers: {}
        };
    }
}

export { buildAuthHeaders };
