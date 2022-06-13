
import React, { useContext, useState, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from "react-router-dom";

const EditBackgroundImage = () => {
    const navigate = useNavigate();
    const { changeBackgroundImage } = useContext(UsersContext)
    const { loadUser, user } = useContext(AuthContext);

    const [BGPic, setBGPic] = useState()

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

    const onSubmit = (e) => {
        e.preventDefault()
        changeBackgroundImage(user._id, BGPic)
        navigate('/');
    }

    const uploadImage = (files) => {
        setBGPic(files[0])        
    }

    return (
        <div className="form-container">
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit={onSubmit}>
                <input type='file' name='profilePhoto' onChange={(e) => uploadImage(e.target.files)} />
                <div>
                    <input type="submit" className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default EditBackgroundImage

// import React, { useContext, useState, useEffect } from 'react'
// import UsersContext from '../../context/users/usersContext'
// import AuthContext from '../../context/auth/authContext'
// import { useNavigate } from "react-router-dom";
// import ImageUploading from 'react-images-uploading';

// const EditBackgroundImage = () => {
//     const navigate = useNavigate();
//     const { changeBackgroundImage } = useContext(UsersContext)
//     const { loadUser, user } = useContext(AuthContext);

//     const [images, setImages] = useState([]);
//     const maxNumber = 69;

// 	useEffect(() => {
// 		loadUser();
//         // getProfileInfo(user._id)
// 		// eslint-disable-next-line
// 	}, []);

//     const onSubmit = (e) => {
//         e.preventDefault()
//         changeBackgroundImage(user._id, images[0])
//         navigate('/');
//     }

//     const onImgChange = (imageList, addUpdateIndex) => {
//       setImages(imageList);
//     };

//     return (
//         <div className="form-container">
//             <form onSubmit={onSubmit}>
//                 <ImageUploading
//                     multiple
//                     value={images}
//                     onChange={onImgChange}
//                     maxNumber={maxNumber}
//                     dataURLKey="data_url"
//                 >
//                     {({
//                     imageList,
//                     onImageUpload,
//                     onImageRemoveAll,
//                     onImageUpdate,
//                     onImageRemove,
//                     isDragging,
//                     dragProps,
//                     }) => (
//                     // write your building UI
//                     <div className="upload__image-wrapper">
//                         <button className='btn btn-lg'
//                         style={isDragging ? { color: 'red' } : undefined}
//                         onClick={onImageUpload}
//                         {...dragProps}
//                         >
//                         Click or Drop here
//                         </button>
//                         &nbsp;
//                         <button onClick={onImageRemoveAll} className='btn btn-lg'>Remove all images</button>
//                         {imageList.map((image, index) => (
//                         <div key={index} className="image-item">
//                             <img src={image['data_url']} alt="" width="100" />
//                             <div className="image-item__btn-wrapper">
//                             <button onClick={() => onImageUpdate(index)}>Update</button>
//                             <button onClick={() => onImageRemove(index)}>Remove</button>
//                             </div>
//                         </div>
//                         ))}
//                     </div>
//                     )}
//                 </ImageUploading>
//                 <div>
//                     <input type="submit" className="btn btn-primary btn-block" />
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default EditBackgroundImage
