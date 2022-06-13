import React, { useContext, useEffect, useState } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'

import UserItem from './UserItem'

const Users = () => {
    const usersContext = useContext(UsersContext)
    const { state, getUsers, getFriendReqSubmitted } = usersContext
    const authContext = useContext(AuthContext)
    const { user } = authContext

    const [search, setSearch] = useState('')
    
    useEffect(() => {
        getUsers()
        getFriendReqSubmitted(user._id)
        // eslint-disable-next-line
    }, [])
    
    return (
        <div className="post">
            <h2>Users</h2>
            <input placeholder='search users' value={search} onChange={(e) => setSearch(e.target.value)}></input>

            {state.allFriends && state.allUsers && 
                state.allUsers.filter(usr => usr.name.toLowerCase().includes(search.toLowerCase()) || ( usr.info?.name.toLowerCase().includes(search.toLowerCase()) )).map(usr => usr._id !== user._id && (
                <UserItem key={usr._id} usr={usr} />
            )
           )}
        </div>
    )
}

export default Users
