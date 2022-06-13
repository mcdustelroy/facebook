import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import Users from '../layout/Users';
import Friends from '../layout/Friends';
import Pending from '../layout/Pending';
import PostForm from '../layout/PostForm';
import Posts from '../layout/Posts';
import Spinner from '../layout/Spinner';
import Profile from '../layout/Profile';
import AllPosts from '../layout/AllPosts'
import PhotoAlbum from '../layout/PhotoAlbum'

const Home = () => {
	const authContext = useContext(AuthContext);
	const { loadUser, user } = authContext;

	const [pageToDisplay, setPageToDisplay] = useState('yourPosts')
	
	const [open, setOpen] = useState(false);
	const onOpenModal = () => setOpen(true);
	
	const handleAlbumClick = (e) => {	
		setPageToDisplay(e.target.value)
		onOpenModal()	
	}
	const handleClick = (e) => {
		setPageToDisplay(e.target.value)
	}

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	if (user === null) return <Spinner />

	return (
		<div>			
			<div>
				<Profile />
			</div>

			<div className="grid-2">
				<div>
					<br></br>
						<Pending />
					<br></br>
						<Friends />
					<br></br>
						<Users />
					<br></br>
				</div>
				<div>
					<div className='homeBtns'>
						<button className='btn btn-sm btn-danger' onClick={handleClick} value='yourPosts'>Your Posts</button>
						<button className='btn btn-sm btn-success' onClick={handleClick} value='allPosts'>All Posts</button>
						<button className='btn btn-sm btn-dark' onClick={handleAlbumClick} value='photoAlbum'>Photo Album</button>
					</div>
					{pageToDisplay === 'yourPosts' && 
						<div>
							<br></br>
								<PostForm /> 
								<Posts />
							<br></br>
						</div> 
					}
					{pageToDisplay === 'allPosts' && 
						<div>
							<AllPosts />
						</div> 	
					}
					{pageToDisplay === 'photoAlbum' && 
						<div>
							<br></br>
							<PhotoAlbum open={open} setOpen={setOpen} onOpenModal={onOpenModal}/>
						</div> 	
					}
				</div>
			</div>
		</div>
	);
};

export default Home;
