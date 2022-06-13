/* eslint-disable import/no-anonymous-default-export */
import {
	GET_ALL_POSTS
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case GET_ALL_POSTS:
			return {
				...state,
				allPosts: action.payload
			};
		default:
			return state;
	}
};
