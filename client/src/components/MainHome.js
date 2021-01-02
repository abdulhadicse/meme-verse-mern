import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { FaCommentAlt, FaRegThumbsUp } from "react-icons/fa";

const MainHome = () => {
    
    const [memes, setMemes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => {
        const res = await axios.get('http://localhost:4000/api/memes/all', {
            headers: { Authentication: token }
        })
        setMemes(res.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getNotes(token);
        }

    }, [])

    const handleLike = async (id) => {
        try {
            if (token) {
                await axios.put(`http://localhost:4000/api/memes/likes/${id}`, {
                    headers: { Authentication: token }
                })
                getNotes(token);
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div>

            <div className="container mt-4">
                <div className="row">
                    {
                        memes.map( item => {
                            return <div className="col-md-4">
                                <div class="card text-left">
                                    <div class="card-header">
                                        <span><BsFillPersonFill /> {item.name}</span>
                                    </div>
                                    <div class="card-body text-center">
                                        <img src={`http://localhost:4000/${item.image}`} className="img-fluid" alt="" />
                                    </div>
                                    <div class="card-footer text-muted d-flex content-align-center">
                                        <div>
                                            <span onClick={()=>handleLike(item._id)} className="mr-3 ml-1"><FaRegThumbsUp /></span>
                                            <span className="pt-5">{item.likes.length} likes</span> 
                                        </div>

                                        <div className="ml-auto">
                                            <span><FaCommentAlt /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>


        </div>
    );
};

export default MainHome;