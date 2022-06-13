import React, { useState, useContext } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import PostContext from '../../context/post/postContext'

const PostForm = () => {
    const usersContext = useContext(UsersContext)
    const authContext = useContext(AuthContext)
    const postContext = useContext(PostContext)
    
    const { newPost, profileInfo } = usersContext
    const { user } = authContext
    const { addPost } = postContext

    const [post, setPost] = useState({
        name: '',
        title: '',
        body: '',
        date: null
    })

    const onChange = (e) => setPost({
        ...post,
        name: ( profileInfo && profileInfo.name ) || (user && user.name),
        [e.target.name]: e.target.value,
        date: Date.now() 
        // new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    })

    const onSubmit = (e) => {
        e.preventDefault()      
        newPost(user._id, post) // adds to user
        addPost(user._id, post)  // adds to allPosts

        setPost({
            name: '',
            title: '',
            body: '',
            date: null
        })
    }

    return (
        <div className="postForm">
            <h2>Make a post</h2>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input type="text" name="title" value={post.title} onChange={onChange} required/>
				</div>
				<div className="form-group">
					<label htmlFor="body">Body</label>
					<textarea rows = "5" cols = "60"  type="text" name="body" value={post.body} onChange={onChange} required/>
				</div>
				<input type="submit" value="post" className="btn btn-success btn-block" />
			</form>

        </div>
    )
}

export default PostForm

