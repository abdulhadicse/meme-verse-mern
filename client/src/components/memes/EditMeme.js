import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditMeme = ({match}) => {
    
    const [note, setNote] = useState({
        title: '',
        id:''
    })

    const [file, setFile] = useState({
        image:''
    })

    let { id } = useParams();
    const history = useHistory();


    useEffect(()=>{
        const getNote = async () =>{
            
            const token = localStorage.getItem('tokenStore');

            if(id){
                const res = await Axios.get(`http://localhost:4000/api/memes/${id}`,{
                    headers: { Authentication: token }
                })
                
                setNote({
                    title: res.data.title,
                    id: res.data._id
                })

                console.log(res);
            }
        }
        getNote();
    },[id])
    
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    }
    
    const onChangeFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const editNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                
                const{title, id} = note;

                let formData = new FormData();
                formData.append('image', file);
                formData.append('title', title);
                formData.append('id', id);

                await Axios.put(`http://localhost:4000/api/memes/${id}`, formData ,{
                    headers: { Authentication: token }
                })

                return history.push('/');
            }
        } catch (err) {
            window.location.href = "/";
        }
    }
    
    return (
        <div className="create-note">
            <h2>Edit Note</h2>
            <form onSubmit={editNote} autoComplete="off">
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

export default EditMeme;