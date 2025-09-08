import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './UserList'; // ייבוא הקומפוננטה

function ViewUsersButton({ onClick }) {
    return (
        <button className="btn btn-info" onClick={onClick}>View All Users</button>
    );
}

function Admin() {
    const [showUsers, setShowUsers] = useState(false);
    const [users, setUsers] = useState([
        { name: 'User 1', phone: '123-456-7890' },
        { name: 'User 2', phone: '987-654-3210' },
    ]);

    const handleViewUsersClick = () => {
        setShowUsers(true);
    };

    return (
        <div className="container mt-5">
            <ViewUsersButton onClick={handleViewUsersClick} />
            {showUsers && <UserList users={users} />}
        </div>
    );
}

export default Admin;
