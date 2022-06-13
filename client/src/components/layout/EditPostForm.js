import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import PostContext from '../../context/post/postContext'

const EditPostForm = ({postID, toggleEditForm}) => {
    const usersContext = useContext(UsersContext)
    const authContext = useContext(AuthContext)
    const postContext = useContext(PostContext)
    
    const { profileInfo } = usersContext
    const { user } = authContext
    const { editPost } = postContext

    const [post, setPost] = useState({
        name: '',
        title: '',
        body: '',
        date: null
    })

    useEffect(() => {
        const fetchData = async (postID) => {
            const res = await axios.get(`/api/posts/post/${postID}`)
            
            setPost(prev => ({
                ...prev,
                title: res.data.title,
                body: res.data.body,
            }))
        }
        fetchData(postID)
        // eslint-disable-next-line
    }, [])


    const onChange = (e) => {
        console.log(e.target.name);
        setPost({
            ...post,
            name: ( profileInfo && profileInfo.name ) || user.name,
            [e.target.name]: e.target.value,
            date: Date.now() 
            // new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
        })
    }


    const onSubmit = (e) => {
        e.preventDefault()      
        editPost(postID, post) 
        toggleEditForm(postID)

        setPost({
            name: '',
            title: '',
            body: '',
            date: null
        })
    }

    return (
        <div className="postEditForm">
            <h2>Edit post</h2>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input type="text" name="title" value={post.title} onChange={onChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="body">Body</label>
					<textarea rows = "3" cols = "60"  type="text" name="body" value={post.body} onChange={onChange} required/>
				</div>
				<input type="submit" value="Update post" className="btn btn-success btn-block" />
			</form>

        </div>
    )
}

export default EditPostForm

