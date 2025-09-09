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
    const [users, setUsers] = useState();

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
