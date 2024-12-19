import React from 'react';
import Navbar from "../Navbar/Navbar.jsx";


const Wrapper = ({ children}) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
};

export default Wrapper;