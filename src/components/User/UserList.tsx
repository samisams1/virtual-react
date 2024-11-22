import React, { useMemo } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import TableComponent from '@/components/Table/Table';
import { useFetchUsers } from '@/services/user/UseFetchUser';


const UserList = () => {
    // Fetch order data using custom hook
    const { loading, users, error } = useFetchUsers();

    // Memoize the columns definition
    const columns = useMemo(
        () => [
            { header: 'ID', accessor: 'id' },
            { header: 'Image', accessor: 'imageurl', isImage: true },
            { header: 'Full Name', accessor: 'fullName' },
            { header: 'Email', accessor: 'email' },
            { header: 'Joind Date', accessor: 'createdAt' },
            { header: 'Status', accessor: 'status' }
        ],
        [] // No dependencies, so it will only be created once
    );
    
    // Memoize the fetchData function
    const fetchData = useMemo(
        () => async () => {
            return Promise.resolve(users); // Return orders as a resolved promise
        },
        [users] // Dependencies: will update when orders change
    );

    // Render loading state with accessibility
    if (loading) {
        return (
            <div role="alert" aria-live="polite">
                <Spinner size={40} color="#3498db" aria-label="Loading orders..." />
                <p>Loading orders, please wait...</p>
            </div>
        );
    }

    // Render error state with detailed message
    if (error) {
        return (
            <div role="alert" aria-live="assertive">
                <p>Error: {typeof error === 'string' ? error : 'An unexpected error occurred. Please try again later.'}</p>
            </div>
        );
    }

    return (
        <div>
            <TableComponent 
                fetchData={fetchData} 
                columns={columns} 
                itemsPerPage={20} 
            />
        </div>
    );
}

export default UserList
