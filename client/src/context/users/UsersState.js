import React, { useReducer } from 'react';
import UsersContext from './usersContext';
import usersReducer from './usersReducer'
import axios from 'axios'
import {
  GET_USERS,
  GET_FRIENDS,
  GET_POSTS,
  GET_PENDING,
  REMOVE_FROM_PENDING,
  ADD_TO_FRIEND_REQUEST_SUBMITTED,
  GET_FRIEND_REQUEST_SUBMITTED,
  EDIT_PROFILE_INFO,
  GET_PROFILE_INFO,
  EDIT_BACKGROUND_PHOTO,
  GET_BACKGROUND_PHOTO,
  GET_PHOTOALBUM,
  USER_ERROR,
  EDIT_PROFILE_PIC,
  GET_PROFILE_PHOTO,
  CLEAR_USER_STATE
} from '../types';

const UsersState = props => {
    const initialState = {
      allUsers: [],
      allFriends: [],
      allUserPosts: [],
      pendingFriends: [],
      friendReqSubmitted: [],
      profileInfo: {},
      backgroundImage: null,
      error: null,
      profilePhoto: null
    };
    const [state, dispatch] = useReducer(usersReducer, initialState)

    const getUsers = async () => {
      const res = await axios.get('/api/users')

      dispatch({
				type: GET_USERS,
				payload: res.data,
			});
    }

    const addPending = async (userID, friendID) => {
        await axios.post(`/api/friends/pending/${userID}/${friendID}`)
    }

    const getFriendReqSubmitted = async (userID) => {
      
      const res = await axios.get(`/api/friends/reqSubmitted/${userID}`)
      
      dispatch({
        type: GET_FRIEND_REQUEST_SUBMITTED,
        payload: res.data,
      });
    }

    const addToFriendReqSubmitted = async (userID, friendID) => {
        const res = await axios.post(`/api/friends/submitted/${userID}/${friendID}`)
        dispatch({
          type: ADD_TO_FRIEND_REQUEST_SUBMITTED,
          payload: res.data,
        });
    }

    const removeFromFriendReqSubmitted = async (userID, friendID) => {
        await axios.delete(`/api/friends/submitted/${userID}/${friendID}`)
    }

    const removeFromPending = async (userID, idToDelete) => {
        await axios.delete(`/api/friends/pending/${userID}/${idToDelete}`)
        dispatch({
          type: REMOVE_FROM_PENDING,
          payload: idToDelete,
        });
    }

    const getPending = async (userID) => {
        const res = await axios.get(`/api/friends/pending/${userID}`)

        dispatch({
          type: GET_PENDING,
          payload: res.data,
        });
    }

    const addFriend = async (userID, friendID) => {
        await axios.post(`/api/friends/${userID}/${friendID}`)
        await axios.post(`/api/friends/${friendID}/${userID}`) 
        getFriends(userID)
    }

    const getFriends = async (userID) => {
      const res = await axios.get(`/api/friends/${userID}`)
      
      dispatch({
				type: GET_FRIENDS,
				payload: res.data,
			});
    }

    const deleteFriend = async (userID, idToDelete) => {
        await axios.delete(`/api/friends/${userID}/${idToDelete}`)
        getFriends(userID)
    }

    const getPosts = async (userID) => {
        const res = await axios.get(`/api/posts/${userID}`)
        
        dispatch({
          type: GET_POSTS,
          payload: res.data,
        });
    }    

    const newPost = async (userID, post) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        
        await axios.post(`/api/posts/${userID}`, post, config)
        getPosts(userID)
    }

    const deletePost = async (userID, idToDelete) => {
        await axios.delete(`/api/posts/${userID}/${idToDelete}`)
        getPosts(userID)
    }

    const editProfile = async (userID, profileInfo) => {
      const formData = new FormData()
      formData.append('file', profileInfo.profileImage)
      formData.append('name', profileInfo.name)
      formData.append('email', profileInfo.email)
      formData.append('location', profileInfo.location)

      const res = await axios.post(`/api/profile/edit/${userID}`, profileInfo)
      
      dispatch({
        type: EDIT_PROFILE_INFO,
        payload: res.data,
      });

      // getProfileInfo()
    }

    const editProfilePic = async (userID, profileInfo) => {
      const formData = new FormData()
      formData.append('file', profileInfo.profileImage)

      const res = await axios.post(`/api/profile/editpic/${userID}`, formData)
      
      dispatch({
        type: EDIT_PROFILE_PIC,
        payload: res.data,
      });

      // getProfileInfo()
    }

    const changeBackgroundImage = async (userID, BGPic) => {
      const formData = new FormData()
      formData.append('file', BGPic)

      try {
        const res = await axios.post(`/api/profile/edit/backgroundImage/${userID}`, formData)
        dispatch({
          type: EDIT_BACKGROUND_PHOTO,
          payload: res.data,
        });
      } catch (err) {
        console.log('error')
        dispatch({ type: USER_ERROR, payload: err.res.msg });
        
      }

    }

    const getProfileInfo = async (userID) => {
        const res = await axios.get(`/api/profile/${userID}`)

        dispatch({
          type: GET_PROFILE_INFO,
          payload: res.data.info,
        });
    }

    const getProfilePhoto = async (userID) => {
        const res = await axios.get(`/api/profile/profilePic/${userID}`)

        dispatch({
          type: GET_PROFILE_PHOTO,
          payload: res.data,
        });
    }

    const getBackgroundPhoto = async (userID) => {
        const res = await axios.get(`/api/profile/backgroundImage/${userID}`)
        dispatch({
          type: GET_BACKGROUND_PHOTO,
          payload: res.data,
        });        
    }

    const addToPhotoAlbum = async (userID, image, description) => {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('description', description)

      await axios.post(`/api/profile/edit/photos/${userID}`, formData)
      getPhotoAlbum(userID)
  }

  const getPhotoAlbum = async (userID) => {
    const res = await axios.get(`/api/profile/photos/${userID}`)

    dispatch({
      type: GET_PHOTOALBUM,
      payload: res.data,
    });
  }

  const deletePhoto = async (userID, photoID) => {
    await axios.post(`/api/profile/delphoto/${userID}`, {photoID})
    getPhotoAlbum(userID)
  }

  const clearUserState = () => {
    dispatch({
      type: CLEAR_USER_STATE
    })
  }

    return (
        <UsersContext.Provider value={{
            state,
            allFriends: state.allFriends, 
            profileInfo: state.profileInfo, 
            backgroundImage: state.backgroundImage, 
            photoAlbum: state.photoAlbum, 
            allUserPosts: state.allUserPosts,
            profilePhoto: state.profilePhoto,
            clearUserState,
            getUsers, 
            addFriend, 
            getFriends, 
            deleteFriend, 
            newPost,
            getPosts,
            deletePost,
            addPending,
            getPending,
            removeFromPending,
            addToFriendReqSubmitted,
            getFriendReqSubmitted,
            removeFromFriendReqSubmitted,
            editProfile,
            getProfileInfo,
            changeBackgroundImage,
            getBackgroundPhoto,
            addToPhotoAlbum,
            getPhotoAlbum,
            deletePhoto,
            editProfilePic,
            getProfilePhoto
          }}>
            {props.children}
        </UsersContext.Provider>
    )
};

export default UsersState;