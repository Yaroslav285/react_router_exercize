import React from 'react';
import {Link} from "react-router-dom";

const Lost = () => {
    return (
        <div>
            <h1>Something went wrong. Try to start your journey from the page below:</h1>
            <p><Link to="/">Homepage</Link></p>
        </div>
    );
};

export default Lost;
