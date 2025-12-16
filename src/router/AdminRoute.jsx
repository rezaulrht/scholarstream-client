import React from 'react';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';
import Loading from '../components/Loading/Loading';

const AdminRoute = ({children}) => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
        return <Loading></Loading>;
    }
    console.log(role);
    if(role !== 'admin'){
        return <Forbidden></Forbidden>;
    }
    return children;
};

export default AdminRoute;