import { useParams } from 'react-router'
import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";
import UsersContext from "../../context/users/usersContext";
import PublicProfile from '../layout/PublicProfile';
import PublicFriends from '../layout/PublicFriends';
import PublicPosts from '../layout/PublicPosts';
import PublicPhotoItem from '../layout/PublicPhotoItem';


const PublicProfilePage = () => {
    let { id } = useParams();
    console.log('public profile page id: ', id)

    const { loadProfile } = useContext(ProfileContext);
    const { getPhotoAlbum, photoAlbum } = useContext(UsersContext)

	useEffect(() => {
		loadProfile(id);
        getPhotoAlbum(id)
		// eslint-disable-next-line
	}, [id]);

    return (
        <div>
            <div>
				<PublicProfile profileID={id}/>
			</div>

            <div className="grid-2">
                <div>
                    <br></br>
                    <br></br>
                        <PublicFriends loadProfile={loadProfile} profileID={id || null} />
                    <br></br>
                        
                        <div className='publicPhotoCont'>
                            {photoAlbum && photoAlbum.length ? (
                                <>
                                <h2>Photo Album</h2>
                                <div className="card grid-4 m-3">
                                    {photoAlbum && photoAlbum.map(photo => <PublicPhotoItem key={photo.public_id} photo={photo} getPhotoAlbum={getPhotoAlbum}/>)}
                                </div>
                                </>)
                            : <h3 className='card bg-light'>No photos yet</h3>
                            }
                        </div>

                </div>
            
                <div>
                        <PublicPosts profileID={id}/>
                    <br></br>
                </div>
            </div>
        </div>
    )
}

export default PublicProfilePage
