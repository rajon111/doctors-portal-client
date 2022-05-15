import React from 'react';

const UserRow = ({user,index}) => {
    const {email} = user
    return (
        <tr>
            <th>{index + 1 }</th>
            <td>{email}</td>
            <td><button className='btn btn-xs'>MAKE ADMIN</button></td>
            <td><button className='btn btn-xs'>Remove User</button></td>
        </tr>
    );
};

export default UserRow;