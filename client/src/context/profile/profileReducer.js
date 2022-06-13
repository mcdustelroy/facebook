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

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state, 
                allUsers: action.payload
            }
        case GET_FRIENDS:
            return {
                ...state, 
                allFriends: action.payload
            }
        case GET_PENDING:
            return {
                ...state, 
                pendingFriends: action.payload
            }
        case REMOVE_FROM_PENDING:
            return {
                ...state, 
                pendingFriends: state.pendingFriends.filter(friend => friend._id !== action.payload)
            }
        case ADD_TO_FRIEND_REQUEST_SUBMITTED:
            return {
                ...state, 
                friendReqSubmitted: action.payload
            }
        case GET_FRIEND_REQUEST_SUBMITTED:
            return {
                ...state, 
                friendReqSubmitted: action.payload
            }
        case GET_POSTS:
            return {
                ...state,
                allUserPosts: action.payload
            }
        case EDIT_PROFILE_INFO:
        case GET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.payload
            }
        case EDIT_BACKGROUND_PHOTO:
        case GET_BACKGROUND_PHOTO:
            return {
                ...state,
                backgroundImage: action.payload
            }
        case GET_PHOTOALBUM:
            return {
                ...state,
                photoAlbum: action.payload
            }
        case CLEAR_PROFILE_STATE:
            return {
                ...state,
                allUsers: [],
                allFriends: [],
                allUserPosts: [],
                pendingFriends: [],
                friendReqSubmitted: [],
                profileInfo: {},
                backgroundImage: null
            }
        default:
            return state;
    }
}
