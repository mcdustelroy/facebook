import React, { useReducer, useContext } from "react";
import axios from "axios";
import CommentContext from "./commentContext";
import CommentReducer from "./commentReducer";
import PostContext from '../../context/post/postContext'

import {
	GET_COMMENTS,
	GET_CURRENTUSER_COMMENTS,
	ADD_COMMENT_LIKE
} from "../types";

const CommentState = (props) => {
	const postContext = useContext(PostContext)

	const initialState = {
		allComments: [],
		currentUserComments: [],
		commentLikes: []
	};

	const { postComment } = postContext
	const [state, dispatch] = useReducer(CommentReducer, initialState)

	const addCommentToDB = async (userID, comment ) => {
		const res = await axios.post(`/api/comments/${userID}`, comment)
		postComment(userID, res.data)
		getAllComments()
	}

	const getAllComments = async () => {
		const res = await axios.get(`/api/comments`)		
		dispatch({
			type: GET_COMMENTS,
			payload: res.data,
		});
	}

	const getCurrentUserComments = async (userID) => {
		const res = await axios.get(`/api/comments/${userID}`)		
		dispatch({
			type: GET_CURRENTUSER_COMMENTS,
			payload: res.data,
		});
	}
    const addNestedCommentLike = async (commentID, userID) => {
		const res = await axios.post(`/api/comments/addlike/${commentID}/${userID}`)
		dispatch({
			type: ADD_COMMENT_LIKE,
			payload: res.data,
		});
		getAllComments()
	}

    const removeNestedCommentLike = async (commentID, userID) => {
		await axios.post(`/api/comments/removelike/${commentID}/${userID}`)

		// dispatch({
		// 	type: ADD_COMMENT_LIKE,
		// 	payload: res.data,
		// });
		getAllComments()
	}

    const addNestedCommentToDB = async (comment, userID) => {
		await axios.post(`/api/comments/nestedcomments/${userID}`, comment)
	}

	const deleteComment = async (commentID) => {
		await axios.delete(`/api/comments/delete/${commentID}`)
		getAllComments()
	}

	const editComment = async (commentID, comment) => {
		const config = {
			headers: {
			  "Content-Type": "application/json",
			},
		}
		await axios.put(`/api/comments/edit/${commentID}`, comment, config)
		getAllComments()
	}

	return (
		<CommentContext.Provider
			value={{
				allComments: state.allComments,
				currentUserComments: state.currentUserComments,
				addCommentToDB,
				getCurrentUserComments,
				getAllComments,
				addNestedCommentLike,
				addNestedCommentToDB,
				deleteComment,
				editComment,
				removeNestedCommentLike
			}}
		>
			{props.children}
		</CommentContext.Provider>
	);
};

export default CommentState;
