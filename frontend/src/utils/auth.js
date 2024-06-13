const buildAuthHeaders = () => {
    const localUser = localStorage.getItem('simpleblog-user');
    if (localUser) {
        const { jwt } = JSON.parse(localUser);
        return {
            headers: {
                Authorization: jwt
            }
        }
    } else {
        return {
            headers: {}
        };
    }
}

export { buildAuthHeaders };
