import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
const Home = () => {

    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => {
        const res = await axios.get('http://localhost:4000/api/memes', {
            headers: { Authentication: token }
        })
        setNotes(res.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getNotes(token);
        }

    }, [])

    const deleteNote = async (id) => {
        try {
            if (token) {
                await axios.delete(`http://localhost:4000/api/memes/${id}`, {
                    headers: { Authentication: token }
                })
                getNotes(token);
            }
        } catch (err) {
            window.location.href = "/";
        }


    }
    return (
        <div className="container">
            <div className="note-wrapper">
                {
                    notes.map(note => {
                        return <div className="card" key={note._id}>
                            <h4 title={note.title}>{note.title}</h4>
                            <div className="text-wrapper">
                                <img src={`http://localhost:4000/${note.image}`} className="img-fluid" alt="" />
                            </div>
                            
                            <div className="date">{format(note.date)}</div>
                            <div className="card-footer">
                                {note.name} <span className=""></span>
                                {note.likes.length} likes
                                <Link to={`/edit/${note._id}`}>Edit</Link>
                            </div>
                            <button onClick={() => deleteNote(note._id)} className="close">X</button>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Home;