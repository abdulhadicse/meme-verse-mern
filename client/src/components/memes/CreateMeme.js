import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateMeme = () => {

    const [note, setNote] = useState({
        title: ''
    })

    const [file, setFile] = useState({
        image:''
    })

    const history = useHistory();
    
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    }

    const onChangeFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const createNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');    

            if (token) {

                let formData = new FormData();
                formData.append('image', file);
                formData.append('title', note.title);
                
                await Axios.post('http://localhost:4000/api/memes', formData ,{
                    headers: { Authentication: token,'Content-Type': 'multipart/form-data' }
                })

                return history.push('/');
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="create-note mt-5">
            <h2>Upload Meme</h2>
            <form onSubmit={createNote} enctype="multipart/form-data" autoComplete="off">
                
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input onChange={onChangeInput} type="text" value={note.title} id="title" name="title" required />
                </div>

                <div className="row">
                    <label htmlFor="content">Upload</label>
                    <input onChange={onChangeFile} type="file" value={file.image} id="image" name="image" required />
                </div>
                
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CreateMeme;