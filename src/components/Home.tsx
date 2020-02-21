import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>StarWars Users Management System</h1>
            <Link to="/users">Users List</Link>
        </div>
    );
};

export default Home;
