import React, {useState} from 'react';

function Loader() {
    return (<div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>);
}

export default Loader;
