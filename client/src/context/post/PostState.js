import React, { useReducer, useContext } from "react";
import axios from "axios";
import PostContext from "./postContext";
import PostReducer from "./postReducer";
import AlertContext from "../alert/alertContext";

import {
	GET_ALL_POSTS
} from "../types";

const PostState = (props) => {
	const initialState = {
		allPosts: []
	};
	const [state, dispatch] = useReducer(PostReducer, initialState);
	const { setAlert } = useContext(AlertContext)

	const addPost = async (userID, post) => {
		try {
			const config = {
				headers: {
				  "Content-Type": "application/json",
				},
			  };
			await axios.post(`/api/posts/allPosts/${userID}`, post, config)
			getAllPosts()
		} catch (err) {
			setAlert('Please fill out all fields', 'danger')
		}

	}

	const getAllPosts = async () => {
		try {
			const res = await axios.get(`/api/posts/allPosts`)
			dispatch({type: GET_ALL_POSTS, payload: res.data})
		} catch (error) {
			setAlert('Could not get all posts', 'danger')
		}

	}

	const addLike = async (postID, userID) => {
		try {
			const res = await axios.post(`/api/posts/addLike/${postID}/${userID}`)
			dispatch({type: GET_ALL_POSTS, payload: res.data})
		} catch (error) {
			setAlert('Add Like Failed', 'danger')
		}
	}

	const removeLike = async (postID, userID) => {
		try {
			const res = await axios.put(`/api/posts/removeLike/${postID}/${userID}`)
			dispatch({type: GET_ALL_POSTS, payload: res.data})
		} catch (error) {
			setAlert('Remove Like Failed', 'danger')
		}

	}

	const postComment = async (userID, comment) => {
		try {
			const config = {
				headers: {
				  "Content-Type": "application/json",
				},
			}
			await axios.post(`/api/posts/comments/${userID}`, comment, config)
			getAllPosts()	
		} catch (error) {
			setAlert('Post Comment Failed', 'danger')
		}
	}

	const deletePost = async (userID, postID) => {
		try {
			const res = await axios.delete(`/api/posts/delete/${userID}/${postID}`)
			// response is the IDs of all comments on the Post.  Map these and delete them all. 
			res.data.map(commentID => deleteComment(commentID))
		} catch (error) {
			setAlert('Delete Post Failed', 'danger')
		}

	}
	const editPost = async (postID, post) => {
		try {
			const config = {
				headers: {
				  "Content-Type": "application/json",
				},
			}
			console.log(postID);
			await axios.put(`/api/posts/edit/${postID}`, post, config)
			getAllPosts()
		} catch (error) {
			setAlert('Edit Post Failed', 'danger')
		}
	}

	const deleteComment = async (commentID) => {
		try {
			await axios.delete(`/api/comments/delete/${commentID}`)
		} catch (error) {
			setAlert('Delete Comment Failed', 'danger')
		}
	}

	return (
		<PostContext.Provider
			value={{
				allPosts: state.allPosts,
				likedButtonClicked: state.likedButtonClicked,
				addPost,
				getAllPosts,
				addLike,
				removeLike,
				postComment,
				deletePost,
				editPost
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
