import React, { useContext } from 'react'
import PostContext from '../../context/post/postContext'
import AuthContext from '../../context/auth/authContext'

import { Link } from "react-router-dom";

const Post = ({ post, toggleComments, toggleCommentForm, profileID, toggleEditForm }) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)
    
    const { addLike, removeLike, getAllPosts, deletePost } = postContext
    const { user } = authContext;

    const handleAddLike = async (postID, userID) => {
        await addLike(postID, userID)
        getAllPosts()
    }
    const handleRemoveLike = async (postID, userID) => {
        await removeLike(postID, userID)
        getAllPosts()
    }

    const handleDelete = async (userID, postID) => {
        await deletePost(userID, postID)
        getAllPosts()
    }
    
    return (
        <div className='post'>
            <div className="grid-2">
                <div className="text-left">
                    <h1>{post.title}</h1>   
                </div>
                <div>
                    <h4>Posted by <Link to={`/${post.user}`}>
                        {user && user._id === post.user ? 'You' : post.name || user.name}
                        </Link></h4>
                    <h4>on {post.date}</h4>                            
                </div>
            </div>
            <div className="card bg-light">
                {post.body}
            </div>
            <div className='likeandcomment'>
                <h4 className='likes'>{post.likes.length} &nbsp; &nbsp;
                    {post && user && post.likes.includes(user._id) ? 
                        <i onClick={() => handleRemoveLike(post._id, user._id)} className="fas fa-heart" style={{color: 'rgba(255, 0, 0, 0.795)'}}>&nbsp; &nbsp;
                        </i>
                        :
                        <i 
                        onClick={() => handleAddLike(post._id, user._id)} className="far fa-heart" 
                        style={{color: 'rgba(255, 0, 0, 0.795)'}}>&nbsp; &nbsp;</i> 
                    }
                </h4>
                {post && user &&
                <button onClick={() => toggleCommentForm(post._id)} className='btn btn-sm btn-success'>comment</button>
                }
                {post && post.comments && post.comments.length ?
                <button className='btn btn-sm btn-success' onClick={() => toggleComments(post._id)}>{post.comments.length} comments</button>
                :   
                <h4>no comments</h4>
                }

                {post && user && !profileID && user._id === post.user && 
                    <button className='btn btn-sm btn-danger delbtn' onClick={() => handleDelete(user._id, post._id)}>X</button>     
                }
                {post && user && !profileID && user._id === post.user && 
                    <button className='btn btn-sm btn-warning' onClick={() => toggleEditForm(post._id)}>edit</button>  
                }
            </div>
        </div>
            
        )
}

export default Post
