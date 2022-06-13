
import React, { useContext, useState, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from "react-router-dom";
import Avatar from '../../images/avatar.png'

const EditProfileForm = () => {
    const navigate = useNavigate();
    const { editProfilePic, getProfileInfo, profileInfo } = useContext(UsersContext)
    const { loadUser, user } = useContext(AuthContext);

	useEffect(() => {
		loadUser();
        getProfileInfo(user._id)
		// eslint-disable-next-line
	}, []);
    
    const [info, setInfo] = useState({
        profileImage: profileInfo ? profileInfo.profileImage : Avatar
    })

    const onSubmit = (e) => {
        e.preventDefault()
        editProfilePic(user._id, info)
        navigate('/');
    }

    const uploadImage = (files) => {
        setInfo({
            ...info,
            profileImage: files[0]
        })        
    }

    return (
        <div className="form-container">
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit={onSubmit}>
                <input type='file' name='profilePhoto' onChange={(e) => uploadImage(e.target.files)} />
                <div>
                    <input type="submit" className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm