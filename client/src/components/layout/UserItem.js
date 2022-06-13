import React, { useContext } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";

const UserItem = ({usr}) => {
    const usersContext = useContext(UsersContext)
    const authContext = useContext(AuthContext)

    const { state, addPending, addToFriendReqSubmitted } = usersContext
    const { user } = authContext

    const handleClick = (userID, friendID) => {
        addPending(userID, friendID)
        addToFriendReqSubmitted(userID, friendID)
    }

    const pending = state.friendReqSubmitted.includes(usr._id)
    const alreadyFriends = state.allFriends.map(friend => friend._id).includes(usr._id)

    return (
        <div key={usr._id} >
            <div className='userItemCard card bg-light'>
                <div className='profile-pic-container'>
                    {usr && usr.profilePhoto ? <img className='small-profile-pic' src={usr.profilePhoto.url} alt='profpic' /> : <Avatar />}
                </div>
                <div>
                    <h3 className="text-primary text-left">
                        <Link to={`/${usr._id}`}>
                            {usr.info ? usr.info.name : usr.name}
                        </Link>
                    </h3>
                    <h4>{usr.info ? usr.info.email : usr.email}</h4>
                </div>
                <div> 
                    {!alreadyFriends && pending && <h4 className='text-success'>Pending</h4>}  
                    
                    {alreadyFriends && <h4 className='text-success'>Already Friends</h4>}
                    
                    {!pending && !alreadyFriends && 
                        <button className='btn btn-sm btn-success' onClick={() => handleClick(user._id, usr._id)}>Add to Friends</button>}
                </div>
            </div>
        </div>
    )
}

export default UserItem
