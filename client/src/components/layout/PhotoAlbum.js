// import React, { useContext, useState, useEffect } from 'react'
// import UsersContext from '../../context/users/usersContext'
// import AuthContext from '../../context/auth/authContext'
// import { useNavigate } from "react-router-dom";
// import ImageUploading from 'react-images-uploading';
// import PhotoItem from '../layout/PhotoItem';
// import { v4 as uuidv4 } from 'uuid';

// import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';


// const PhotoAlbum = ({open, setOpen, onOpenModal}) => {
//     // const [open, setOpen] = useState(false);
    
//     const onCloseModal = () => {setOpen(false)}

//     const navigate = useNavigate();
//     const { addToPhotoAlbum, getPhotoAlbum, photoAlbum } = useContext(UsersContext)
//     const { loadUser, user } = useContext(AuthContext);

//     const [images, setImages] = useState([]);
//     const [description, setDescription] = useState('');
//     const maxNumber = 69;

// 	useEffect(() => {
// 		loadUser();
//         getPhotoAlbum(user._id)
// 		// eslint-disable-next-line
// 	}, []);

//     const onSubmit = async (e) => {
//         e.preventDefault()
//         // eslint-disable-next-line 
//         images.map(img => {
//             let id = uuidv4()
//             img.id = id
//             img.owner = user._id
//             img.description = description       
//         })
//         await addToPhotoAlbum(user._id, images)
//         getPhotoAlbum(user._id)
//         setImages([])
//         setDescription('')
//         navigate('/');
//     }

//     const onDescriptionChange = (e) => {
//         setDescription(e.target.value)
//     }

//     const uploadImage = (files) => {
//         console.log(files)
//         // setImages(files)        
//     }

//     return (
//         <div className='addToAlbum'>
//             <h1>Add photo to Album</h1>
//             <form onSubmit={onSubmit}>
//                 <input type='file' name='profilePhoto' onChange={(e) => uploadImage(e.target.files)} />
//                 <br></br>
//                 <label for='description' className='desc'>Description</label>
//                 <input onChange={onDescriptionChange} name='description' type='text' value={description}  ></input>

//                 <div>
//                     <input type="submit" className="btn btn-primary btn-block" onClick={onOpenModal}/>
//                 </div>
//             </form>

//             <button onClick={onOpenModal} className='btn btn-sm'>Open Album</button>
//             <Modal open={open} onClose={onCloseModal} center >
//                 <div className='photoCont'>
//                     {photoAlbum && photoAlbum.length ? (
//                         <>
//                         <h2>Photo Album</h2>
//                         <div className="card grid-4 m-3">
//                             {photoAlbum && photoAlbum.map(photo => <PhotoItem key={photo.id} photo={photo} getPhotoAlbum={getPhotoAlbum}/>)}
//                         </div>
//                         </>)
//                     : <h3 className='post'>No photos yet</h3>
//                     }
//                 </div>
//             </Modal>
//         </div>
//     )
// }

// export default PhotoAlbum




import React, { useContext, useState, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from "react-router-dom";

import PhotoItem from '../layout/PhotoItem';


import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const PhotoAlbum = ({open, setOpen, onOpenModal}) => {
    const onCloseModal = () => {setOpen(false)}

    const navigate = useNavigate();
    const { addToPhotoAlbum, getPhotoAlbum, photoAlbum } = useContext(UsersContext)
    const { loadUser, user } = useContext(AuthContext);

    const [image, setImage] = useState([]);
    const [description, setDescription] = useState('');

	useEffect(() => {
		loadUser();
        getPhotoAlbum(user._id)
		// eslint-disable-next-line
	}, []);

    const onSubmit = async (e) => {
        e.preventDefault()
        await addToPhotoAlbum(user._id, image, description)
        getPhotoAlbum(user._id)
        setImage([])
        setDescription('')
        navigate('/');
    }

    const uploadImage = (files) => {
        setImage(files[0])        
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div className='addToAlbum'>
            <h1>Add photo to Album</h1>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type='file' name='profilePhoto' onChange={(e) => uploadImage(e.target.files)} />

                <br></br>
                <label htmlFor='description' className='desc'>Description</label>
                <input onChange={onDescriptionChange} name='description' type='text' value={description} ></input>

                <div>
                    <input type="submit" className="btn btn-primary btn-block" onClick={onOpenModal}/>
                </div>
            </form>

            <button onClick={onOpenModal} className='btn btn-sm'>Open Album</button>
            <Modal open={open} onClose={onCloseModal} center >
                <div className='photoCont'>
                    {photoAlbum && photoAlbum.length ? (
                        <>
                        <h2>Photo Album</h2>
                        <div className="card grid-4 m-3">
                            {photoAlbum && photoAlbum.map(photo => <PhotoItem key={photo.public_id} photo={photo} getPhotoAlbum={getPhotoAlbum}/>)}
                        </div>
                        </>)
                    : <h3 className='post'>No photos yet</h3>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default PhotoAlbum
