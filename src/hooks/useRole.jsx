import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: role, isLoading : roleLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/${user?.email}/role`);
            return response.data?.role || 'student';
        }
    })


    return {role, roleLoading};
};

export default useRole;