import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import CommentContext from '../../context/comment/commentContext'
import NestedCommentForm from '../../components/layout/NestedCommentForm'
import EditCommentForm from './EditCommentForm'
import { Link } from "react-router-dom";

const Comment = ({ post, comment, showComments, profileID }) => {
    const commentContext = useContext(CommentContext)
    const authContext = useContext(AuthContext)
    
    const { user } = authContext
    const { getAllComments, addNestedCommentLike, allComments, deleteComment, removeNestedCommentLike } = commentContext

    const [openComments, setOpenComments] = useState([])
    const [commentForm, setCommentForm] = useState([])
    const [editCommentForm, setEditCommentForm] = useState([])

    const toggleCommentForm = (commentID) => {
        if (commentForm.includes(commentID)){
            setCommentForm([])
        } else {
            setCommentForm([commentID])
        }
    }

    const toggleComments = (commentID) => {
        if (!openComments.includes(commentID)){
            setOpenComments(prev => [...prev, commentID])
        } else {
            setOpenComments(prev => [...prev.filter(c => c !== commentID)])
        } 
    }

    const handleAddLike = async (commentID, userID) => {
        await addNestedCommentLike(commentID, userID)
        getAllComments()
    }

    const handleRemoveLike = async (postID, userID) => {
        await removeNestedCommentLike(postID, userID)
        getAllComments()
    }

    const toggleEditCommentForm = (commentID) => {
        if (editCommentForm.includes(commentID)) {
            setEditCommentForm([])
        } else {
            setEditCommentForm([commentID])
        }
    }

    return (
        <div className="commentsbox">   
            <div className='comment submenu'>
                <div className="form-group comment-body">
                    <p>{comment.body}</p>
                </div>
                <div className='text-right'>
                    <h4>Posted by <Link to={`/${comment.authorID}`}>
                        {user && user._id === comment.authorID ? 'You' : comment.authorName || user.name}</Link></h4>
                    <h4>on {comment.date}</h4>                            
                </div>

                <div className='likeandcomment'>
                    <div className='likes'> 
                    {comment.likes && comment.likes.length} &nbsp; &nbsp;

                    {comment && user && comment.likes.includes(user._id) ? 
                        <i onClick={() => handleRemoveLike(comment._id, user._id)} className="fas fa-heart" style={{color: 'rgba(255, 0, 0, 0.795)'}}>&nbsp; &nbsp;
                        </i>
                        :
                        <i 
                        onClick={() => handleAddLike(comment._id, user._id)} className="far fa-heart" 
                        style={{color: 'rgba(255, 0, 0, 0.795)'}}>&nbsp; &nbsp;</i> 
                    }




                            {/* <div className='likeCount'>
                                {comment.likes && comment.likes.length} &nbsp; &nbsp;
                                <i onClick={() => handleAddLike(comment._id, user._id)} className="far fa-heart" 
                                style={{color: 'rgba(255, 0, 0, 0.795)'}}></i> &nbsp; &nbsp;
                            </div> */}
                            
                    </div>

                    {user && 
                    <button onClick={() => toggleCommentForm(comment._id)} className='btn btn-sm btn-success'>comment</button>
                    }   

                    {comment.comments && comment.comments.length ?
                    <button  className='btn btn-sm btn-success' onClick={() => toggleComments(comment._id)}>{comment.comments && comment.comments.length} comments</button>
                    : 
                    <button disable='true' className='btn btn-sm btn-success'>no comments</button>
                    }

                    {user && user._id === comment.authorID && !profileID &&
                        <button className='btn btn-sm btn-danger' onClick={() => deleteComment(comment._id)}>X</button>
                    }

                    {user && user._id === comment.authorID && !profileID &&
                        <button className='btn btn-sm btn-warning' onClick={() => toggleEditCommentForm(comment._id)}>edit</button>
                    }
                </div>
                    {editCommentForm.includes(comment._id) ?
                    <EditCommentForm 
                        post={post} 
                        toggleComments={toggleComments} 
                        showComments={showComments} 
                        toggleEditCommentForm={toggleEditCommentForm}
                        commentID={comment._id} />
                    : ''} 

                    {commentForm.includes(comment._id) && 
                        <NestedCommentForm 
                            parentCommentID={comment._id} 
                            toggleComments={toggleComments} 
                            showComments={showComments} 
                            toggleCommentForm={toggleCommentForm} 
                            setOpenComments={setOpenComments} 
                            openComments={openComments}/>
                    }

                    {openComments.includes(comment._id) && allComments && allComments.map(c => comment._id === c.parentID && (
                        <Comment 
                            key={c._id} 
                            comment={c} 
                            post={post} 
                            allComments={allComments} 
                            showComments={showComments}/>
                    ))}

            </div>                                
        </div>
    )
}

export default Comment
