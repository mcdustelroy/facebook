import React, { useReducer, useContext } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer'
import AlertContext from "../alert/alertContext";
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
  CLEAR_PROFILE_STATE
} from '../types';

const ProfileState = props => {

    const initialState = {
      allUsers: [],
      allFriends: [],
      allUserPosts: [],
      pendingFriends: [],
      friendReqSubmitted: [],
      profileInfo: {},
      backgroundImage: null
    };

    const { setAlert } = useContext(AlertContext)

    const [state, dispatch] = useReducer(profileReducer, initialState)

    const loadProfile = async (id) => {
      try {
        const res = await axios.get(`/api/profile/${id}`)
        dispatch({
          type: GET_PROFILE_INFO,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Load Profile Failed', 'danger')
      }

    }

    const getUsers = async () => {
      try {
        const res = await axios.get('/api/users')

        dispatch({
          type: GET_USERS,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Get Users Failed', 'danger')
      }

    }

    const addPending = async (userID, friendID) => {
      try {
        await axios.post(`/api/friends/pending/${userID}/${friendID}`)
      } catch (error) {
        setAlert('Add Pending Failed', 'danger')
      }
        
    }

    const getFriendReqSubmitted = async (userID) => {
      try {
        const res = await axios.get(`/api/friends/reqSubmitted/${userID}`)
      
        dispatch({
          type: GET_FRIEND_REQUEST_SUBMITTED,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Get Friend Request Submitted Failed', 'danger')
      }
    }

    const addToFriendReqSubmitted = async (userID, friendID) => {
      try {
        const res = await axios.post(`/api/friends/submitted/${userID}/${friendID}`)
        dispatch({
          type: ADD_TO_FRIEND_REQUEST_SUBMITTED,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Add to Friend Request Submitted Failed', 'danger')
      }
    }

    const removeFromFriendReqSubmitted = async (userID, friendID) => {
      try {
        await axios.delete(`/api/friends/submitted/${userID}/${friendID}`)
      } catch (error) {
        setAlert('Remove from Friend Request Submitted Failed', 'danger')
      }
    }

    const removeFromPending = async (userID, idToDelete) => {
      try {
        await axios.delete(`/api/friends/pending/${userID}/${idToDelete}`)
        dispatch({
          type: REMOVE_FROM_PENDING,
          payload: idToDelete,
        });
      } catch (error) {
        setAlert('Remove from pending Failed', 'danger')
      }
    }

    const getPending = async (userID) => {
      try {
        const res = await axios.get(`/api/friends/pending/${userID}`)

        dispatch({
          type: GET_PENDING,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Get pending Failed', 'danger')
      }
    }

    const addFriend = async (userID, friendID) => {
      try {
        await axios.post(`/api/friends/${userID}/${friendID}`)
        await axios.post(`/api/friends/${friendID}/${userID}`) 
        getFriends(userID)
      } catch (error) {
        setAlert('Add Friend Failed', 'danger')
      }
    }

    const getFriends = async (userID) => {
      try {
        const res = await axios.get(`/api/friends/${userID}`)
      
        dispatch({
          type: GET_FRIENDS,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Get Friends Failed', 'danger')
      }
    }

    const deleteFriend = async (userID, idToDelete) => {
      try {
        await axios.delete(`/api/friends/${userID}/${idToDelete}`)
        getFriends(userID)
      } catch (error) {
        
      }
    }

    const getPosts = async (userID) => {
      try {
        const res = await axios.get(`/api/posts/${userID}`)
        
        dispatch({
          type: GET_POSTS,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Get Posts Failed', 'danger')
      }
    }    

    const newPost = async (userID, post) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log('newpost')
        await axios.post(`/api/posts/${userID}`, post, config)
        getPosts(userID)
      } catch (error) {
        setAlert('New Post Failed', 'danger')
      }
    }

    const deletePost = async (userID, idToDelete) => {
      try {
        await axios.delete(`/api/posts/${userID}/${idToDelete}`)
        getPosts(userID)
      } catch (error) {
        setAlert('Delete Post Failed', 'danger')
      }
    }

    const editProfile = async (userID, profileInfo) => {
      try {
        const res = await axios.post(`/api/profile/edit/${userID}`, profileInfo)

        dispatch({
          type: EDIT_PROFILE_INFO,
          payload: res.data,
        });
      } catch (error) {
        setAlert('Edit Profile Failed', 'danger')
      }
    }

    const changeBackgroundImage = async (userID, image) => {
      try {
        const res = await axios.post(`/api/profile/edit/backgroundImage/${userID}`, image)
        dispatch({
          type: EDIT_BACKGROUND_PHOTO,
          payload: res.data,
        });
      } catch (err) {
        console.log('here')
        setAlert('test', 'danger')
      }

    }

    const getProfileInfo = async (userID) => {
        const res = await axios.get(`/api/profile/${userID}`)

        dispatch({
          type: GET_PROFILE_INFO,
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

    const addToPhotoAlbum = async (userID, images, description) => {
      await axios.post(`/api/profile/edit/photos/${userID}`, images)
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
    await axios.delete(`/api/profile/photos/${userID}/${photoID}`)
    getPhotoAlbum(userID)
  }

  const clearProfileState = () => {
    dispatch({
      type: CLEAR_PROFILE_STATE
    })
  }

    return (
        <ProfileContext.Provider value={{
            state,
            allFriends: state.allFriends, 
            profileInfo: state.profileInfo, 
            backgroundImage: state.backgroundImage, 
            photoAlbum: state.photoAlbum, 
            allUserPosts: state.allUserPosts,
            clearProfileState,
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
            loadProfile
          }}>
            {props.children}
        </ProfileContext.Provider>
    )
};

export default ProfileState;