import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

function FileUpload({ values, setValues, setLoading }) {

    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if(files) {
            setLoading(true);
            for( let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                        headers: {
                            authToken: user ? user.token : "",
                        }
                    })
                    .then((response) => {
                        setLoading(false);
                        allUploadedFiles.push(response.data);
                        setValues({ ...values, images: allUploadedFiles });
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log('Error Uploading Images : ', error);
                    })
                }, "base64");
            }
        }
    }

    return (
        <>
            <div className="row">
                {
                    values.images.map((image) => {
                        return (
                            <Avatar key={image.public_id} src={image.url} size={100} style={{ marginRight: '20px', marginBottom: '10px' }} />
                        )
                    })
                }
            </div>
            <div className="row">
                <label className="btn btn-primary btn-raised">
                    Choose File
                    <input 
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={fileUploadAndResize}
                        />
                </label>
            </div>
        </>
    )
}

export default FileUpload;
