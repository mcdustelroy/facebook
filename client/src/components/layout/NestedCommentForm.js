import React, { useContext, useState } from 'react'
import PostContext from '../../context/post/postContext'
import AuthContext from '../../context/auth/authContext'
import CommentContext from '../../context/comment/commentContext'

const NestedCommentForm = ({ parentCommentID, toggleComments, toggleCommentForm, showComments, setOpenComments }) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)
    const commentContext = useContext(CommentContext)
    
    const { getAllPosts } = postContext
    const { user } = authContext
    const { addNestedCommentToDB, getAllComments } = commentContext

    const [comment, setComment] = useState({
        body: null,
        authorID: null,
        authorName: null,
        parentID: null,
        date: null,
    })

    const attachParentID = (parentID) => {
        setComment(prev => ({
            ...prev,
            parentID: parentCommentID
        }))
    }

    const onCommentChange = (e) => {
        setComment({
            ...comment,
            authorID: user._id,
            authorName: user.info.name,
            date: Date.now(),
            [e.target.name]: e.target.value
        })
    }

    const handleCommentSubmit = async (e) => {        
        e.preventDefault()    
        toggleCommentForm(comment._id)
        
        setOpenComments(prev => [...prev, comment.parentID])  

        await addNestedCommentToDB(comment, user._id)
        // !commented && toggleComments(parentCommentID) 
        // commented = true

        setComment({
            body: null,
            authorID: null,
            parentID: null,
            date: null,
        })
        getAllPosts()
        getAllComments()
    }

    return (
        <div>
            <form className='comment-form' onSubmit={handleCommentSubmit}>
                <div className="form-group" onChange={() => attachParentID(comment.parentID)}>
                    <textarea placeholder='comment' type="text" name="body" value={comment ? comment.body : ''} onChange={onCommentChange} />
                </div>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default NestedCommentForm
