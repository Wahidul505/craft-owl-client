import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const useAdmin = user => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        fetch(`https://craft-owl.herokuapp.com/admin/user/${email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/');
            }
            else {
                return res.json();
            }
        }).then(data => {
            setAdmin(data.admin);
            setAdminLoading(false);
        });
    }, [user, navigate]);
    return [admin, adminLoading];
}

export default useAdmin;