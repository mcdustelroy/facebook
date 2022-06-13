import {
	GET_COMMENTS,
	GET_CURRENTUSER_COMMENTS,
	ADD_COMMENT_LIKE
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case GET_COMMENTS:
			return {
				...state,
				allComments: action.payload
			};
		case GET_CURRENTUSER_COMMENTS:
			return {
				...state,
				currentUserComments: action.payload
			};
		case ADD_COMMENT_LIKE:
			return {
				...state,
				commentLikes: action.payload
			};
		default:
			return state;
	}
};
