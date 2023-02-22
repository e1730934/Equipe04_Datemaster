import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import './custom.css';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/> 
            </Routes>
        );
    }
}
