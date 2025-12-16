import React from 'react';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
        return <div>Loading...</div>;
    }

    if(role !== 'admin'){
        return <div>Access Denied. Admins only.</div>;
    }
    return children;
};

export default AdminRoute;