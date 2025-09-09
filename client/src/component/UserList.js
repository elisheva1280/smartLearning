
import React, { useEffect, useState } from 'react';

const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('שגיאה בטעינת המשתמשים:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>טוען...</div>;
    }

    return (
        <div>
            <h1>משתמשים</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.phone}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersComponent;
