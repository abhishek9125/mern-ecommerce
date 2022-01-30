import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function FileUpload({ values, setValues, loading, setLoading }) {

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

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authToken: user ? user.token : "",
            }
        })
        .then((response) => {
            setLoading(false);
            const { images } = values;
            let filteredImages = images.filter((image) => image.public_id !== public_id);
            setValues({ ...values, images: filteredImages });
        })
        .catch((error) => {
            setLoading(false);
            console.log('Error Removing Image : ', error);
        })
    }

    return (
        <>
            <div className="row" style={{ marginLeft: '-35px' }}>
                {
                    values.images.map((image) => {
                        return (
                            <Badge 
                                count='X' 
                                key={image.public_id} 
                                onClick={() => {handleImageRemove(image.public_id)}}
                                style={{ cursor: 'pointer' }}
                            >
                                <Avatar
                                    src={image.url} 
                                    size={100} 
                                    style={{ marginLeft: '20px', marginBottom: '10px' }} 
                                    shape="square"
                                />
                            </Badge>
                        )
                    })
                }
            </div>
            <div className="row">
                <label className="btn btn-primary btn-raised mt-1">
                   { loading ? <LoadingOutlined /> : "Choose File"}
                    <input 
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={fileUploadAndResize}
                        disabled={loading}
                        />
                </label>
            </div>
        </>
    )
}

export default FileUpload;
