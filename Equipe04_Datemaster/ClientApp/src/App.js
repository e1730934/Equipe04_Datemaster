import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import './custom.css';
import Home from './page/Home';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        );
    }
}
