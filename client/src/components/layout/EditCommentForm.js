import React, { useContext, useState, useEffect } from 'react'
import PostContext from '../../context/post/postContext'
import AuthContext from '../../context/auth/authContext'
import CommentContext from '../../context/comment/commentContext'
import axios from "axios";


const EditCommentForm = ({ toggleEditCommentForm, profileID, commentID }) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)
    const commentContext = useContext(CommentContext)
    
    const { getAllPosts } = postContext
    const { user } = authContext
    const { getAllComments, editComment } = commentContext

    const [comment, setComment] = useState({
        body: null,
        authorID: null,
        authorName: null,
        parentID: null,
        date: null,
    })
    
    useEffect(() => {
        const fetchData = async (commentID) => {
            const res = await axios.get(`/api/comments/comment/${commentID}`)
            setComment(prev => ({
                ...prev,
                ...res.data
            }))
        }
        fetchData(commentID)
        // eslint-disable-next-line
    }, [])

    const handleCommentSubmit = (e) => {        
        e.preventDefault()    
        // attachParentID(comment.parentID)
        editComment(commentID, comment)

        toggleEditCommentForm(commentID)
        getAllPosts()
        getAllComments()           
        setComment({
            body: null,
            authorID: null,
            parentID: null,
            date: null,
        })
    }

    const onCommentChange = (e) => {
        setComment({
            ...comment,
            authorID: profileID ? profileID : user._id,
            authorName: user.name,
            date: Date.now(),
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='commentEditForm' >
            <form className='comment-form' onSubmit={handleCommentSubmit}>
                <div className="form-group" >
                    <textarea placeholder='comment' type="text" name="body" value={comment && comment.body} onChange={onCommentChange} required />
                </div>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default EditCommentForm
