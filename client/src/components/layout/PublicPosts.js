
import React, { useContext, useEffect, useState } from 'react'
import PostContext from '../../context/post/postContext'
import AuthContext from '../../context/auth/authContext'
import CommentForm from '../../components/layout/CommentForm'
import EditPostForm from './EditPostForm'
import Comment from '../../components/layout/Comment'
import Post from '../../components/layout/Post'
import CommentContext from '../../context/comment/commentContext'
import ProfileContext from '../../context/profile/profileContext'


const Posts = ({profileID}) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)
    const commentContext = useContext(CommentContext)
    const { profileInfo } = useContext(ProfileContext)

    const { allPosts, getAllPosts } = postContext
    const { user, loadUser } = authContext
    const { allComments, getAllComments } = commentContext

    const [openComments, setOpenComments] = useState([])
    const [commentForm, setCommentForm] = useState([])

    const [editForm, setEditForm] = useState([])
    

    useEffect(() => {
        loadUser()
        getAllPosts()
        getAllComments()
        // eslint-disable-next-line
    }, [])

    const toggleComments = (postID) => {
        if (!openComments.includes(postID)){
            setOpenComments(prev => [...prev, postID])
        } else {
            setOpenComments(prev => [...prev.filter(c => c !== postID)])
        } 
    }

    const showComments = (postID) => {
        setOpenComments(prev => [...prev, postID])
    }

    const toggleCommentForm = (postID) => {
        if (commentForm.includes(postID)){
            setCommentForm([])
        } else {
            setCommentForm([postID])
        }
    }

    const toggleEditForm = (postID) => {
        if (editForm.includes(postID)){
            setEditForm([])
        } else {
            setEditForm([postID])
        }
    }

    return (
        <div className="posts">
            <h1 className='postTitle' >Posts by {profileInfo.info?.name || profileInfo.name}</h1>
            {allPosts && allPosts.map(post => post.user === profileID &&
                <div key={post._id} className="postContainer">
                    <Post 
                        post={post} 
                        user={user} 
                        toggleComments={toggleComments} 
                        toggleEditForm={toggleEditForm}
                        toggleCommentForm={toggleCommentForm} />                    

                    {commentForm.includes(post._id) && 
                    <CommentForm 
                        post={post} 
                        toggleComments={toggleComments} 
                        showComments={showComments} 
                        toggleCommentForm={toggleCommentForm}/>
                    }
                    {editForm.includes(post._id) && 
                    <EditPostForm 
                        post={post} 
                        toggleComments={toggleComments} 
                        showComments={showComments} 
                        toggleEditForm={toggleEditForm}
                        postID={post._id}/>
                    }

                    {openComments.includes(post._id) && allComments && allComments.map(c => c.parentID === post._id && (
                    <Comment 
                        key={c._id} 
                        comment={c} 
                        post={post} 
                        toggleComments={toggleComments} 
                        showComments={showComments} 
                        openComments={openComments}  
                        />
                    ))}
                    <br></br>
                </div>  
            )}
        </div>
    )
}

export default Posts
