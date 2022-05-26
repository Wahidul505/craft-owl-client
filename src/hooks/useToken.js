import { useEffect, useState } from "react";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        if (email) {
            fetch(`https://craft-owl.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                if (data.result.acknowledged || data.token) {
                    setToken(data.token);
                    localStorage.setItem('accessToken', data.token);
                }
            });
        }
    }, [user])
    return [token];
};

export default useToken;