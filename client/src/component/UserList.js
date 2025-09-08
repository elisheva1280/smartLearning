import React from 'react';

function UserList({ users }) {
    return (
        <div className="mt-3">
            <h3>User List</h3>
            <ul className="list-group">
                {users.map((user, index) => (
                    <li key={index} className="list-group-item">
                        {user.name} - {user.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
