
import React, { useContext, useState, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
    const navigate = useNavigate();
    const { editProfile, getProfileInfo, profileInfo } = useContext(UsersContext)
    const { loadUser, user } = useContext(AuthContext);

	useEffect(() => {
		loadUser();
        getProfileInfo(user._id)
		// eslint-disable-next-line
	}, []);
    
    const [info, setInfo] = useState({
        name: profileInfo ? profileInfo.name : user.name,
        email: profileInfo ? profileInfo.email : user.email,
        location: profileInfo ? profileInfo.location : user.info && user.info.location,
        // profileImage: profileInfo ? profileInfo.profileImage : ''
    })
    
    const { name, email, location } = info;

    const onChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        })
    }
 
    const onSubmit = (e) => {
        e.preventDefault()
        editProfile(user._id, info)
        navigate('/');
    }

    // const uploadImage = (files) => {
    //     // const formData = new FormData()
    //     // formData.append('file', files[0])

    //     setInfo({
    //         ...info,
    //         profileImage: files[0]
    //     })        
    //     // console.log(files[0])
    // }


    // const photo = profileInfo && profileInfo.info && profileInfo.info.profileImage ? profileInfo.info.profileImage : Avatar

    return (
        <div className="form-container">
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit={onSubmit}>
                <input placeholder='Name' name='name' value={ name } type='text' onChange={onChange}/>
                <input placeholder='Email' name='email' value={ email } type='email' onChange={onChange}/>
                <input placeholder='location' name='location' value={ location } type='text' onChange={onChange}/>
                {/* <input type='file' name='profilePhoto' onChange={(e) => uploadImage(e.target.files)} /> */}

                <div>
                    <input type="submit" className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm





// ----------------------------------------------------------------------

// import React, { useContext, useState, useEffect } from 'react'
// import UsersContext from '../../context/users/usersContext'
// import AuthContext from '../../context/auth/authContext'
// import { useNavigate } from "react-router-dom";
// import ImageUploading from 'react-images-uploading';

// const EditProfileForm = () => {
//     const navigate = useNavigate();
//     const { editProfile, getProfileInfo, profileInfo } = useContext(UsersContext)
//     const { loadUser, user } = useContext(AuthContext);

//     const [images, setImages] = useState([]);
//     const maxNumber = 69;

// 	useEffect(() => {
// 		loadUser();
//         getProfileInfo(user._id)
// 		// eslint-disable-next-line
// 	}, []);
    
//     const [info, setInfo] = useState({
//         name: profileInfo.info ? profileInfo.info.name : profileInfo.name,
//         email: profileInfo.info ? profileInfo.info.email : profileInfo.email,
//         location: profileInfo.info ? profileInfo.info.location : ''
//     })
//     const { name, email, location } = info;


//     const onChange = (e) => {
//         setInfo({
//             ...info,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const onSubmit = (e) => {
//         e.preventDefault()
//         editProfile(user._id, info)
//         navigate('/');
//     }

//     const onImgChange = (imageList, addUpdateIndex) => {
//         setImages(imageList);
//         setInfo({
//             ...info,
//             profileImage: imageList[0]
//         })
//     };

//     return (
//         <div className="form-container">
//             <br></br>
//             <br></br>
//             <br></br>
//             <form onSubmit={onSubmit}>
//                 <input placeholder='Name' name='name' value={ name } type='text' onChange={onChange}/>
//                 <input placeholder='Email' name='email' value={ email } type='email' onChange={onChange}/>
//                 <input placeholder='location' name='location' value={location} type='text' onChange={onChange}/>
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
//                         <button
//                         style={isDragging ? { color: 'red' } : undefined}
//                         onClick={onImageUpload}
//                         {...dragProps}
//                         >
//                         Click or Drop here
//                         </button>
//                         &nbsp;
//                         <button onClick={onImageRemoveAll}>Remove all images</button>
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

// export default EditProfileForm
