const TOKEN_KEY =  localStorage.getItem('token')


export const isLogin = () => {
    if (TOKEN_KEY) {
        return true;
    }

    return false;
}