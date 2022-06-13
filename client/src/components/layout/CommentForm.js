import React, { useContext, useState } from 'react'
import PostContext from '../../context/post/postContext'
import AuthContext from '../../context/auth/authContext'
import CommentContext from '../../context/comment/commentContext'


const CommentForm = ({ post, showComments, toggleCommentForm }) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)
    const commentContext = useContext(CommentContext)
    
    const { getAllPosts } = postContext
    const { user } = authContext
    const { addCommentToDB, getAllComments } = commentContext

    const [comment, setComment] = useState({
        body: null,
        authorID: null,
        authorName: null,
        parentID: null,
        date: null,
    })

    const handleCommentSubmit = (e) => {        
        e.preventDefault()    
        toggleCommentForm(post._id)            
        addCommentToDB(user._id, comment)
        showComments(post._id)  
        getAllPosts()
        getAllComments()           

        setComment({
            body: null,
            authorID: null,
            parentID: null,
            date: null,
        })
    }

    const attachParentID = (parentID) => {
        setComment(prev => ({
            ...prev,
            parentID: parentID
        }))
    }

    const onCommentChange = (e) => {
        setComment({
            ...comment,
            authorID: user._id,
            authorName: user.name,
            date: Date.now(),
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form className='comment-form' onSubmit={handleCommentSubmit}>
                <div className="form-group" onChange={() => attachParentID(post._id)}>
                    <textarea placeholder='comment' type="text" name="body" value={comment?.body|| ''} onChange={onCommentChange} required />
                </div>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default CommentForm
