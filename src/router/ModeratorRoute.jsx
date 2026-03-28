import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';

const ModeratorRoute = ({children}) => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
        return <Loading></Loading>;
    }
    if(!role){
        return <Loading></Loading>;
    }

    if(role !== 'moderator' && role !== 'admin'){
        return <Forbidden></Forbidden>;
    }
    return children;
};

export default ModeratorRoute;