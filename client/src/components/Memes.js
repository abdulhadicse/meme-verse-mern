import React from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";
import '../App.css';
import MainHome from './MainHome';
import CreateMeme from './memes/CreateMeme';
import EditMeme from './memes/EditMeme';
import Home from './memes/Home';
import Nav from './memes/Nav';
const Memes = ({ setIsLoggedIn }) => {
    return (
        <>
            <Router>
                <div className="notes-page">
                    <Nav setIsLoggedIn={setIsLoggedIn}></Nav>
                    <Switch>
                        <Route path="/" exact>
                            <MainHome></MainHome>
                        </Route>
                        <Route path="/profile" exact>
                            <Home></Home>
                        </Route>
                        <Route path="/create" exact>
                            <CreateMeme></CreateMeme>
                        </Route>
                        <Route path="/edit/:id" exact>
                            <EditMeme></EditMeme>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
};

export default Memes;