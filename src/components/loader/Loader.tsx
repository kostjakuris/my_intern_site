import React from 'react';
import {Hourglass} from "react-loader-spinner";
import './Loader.min.css'

const Loader = () => {
    return (
        <div className="loader__wrapper">
        <div className="loader">
            <Hourglass
                visible={true}
                height="90"
                width="90"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#146fe7', '#72a1ed']}
            />
            <p className="loader__text">Loading...</p>
        </div>
        </div>
    );
};

export default Loader;