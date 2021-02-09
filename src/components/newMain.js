import React from 'react';
import css from "./Main.css";
import Toolbar from "./Module/Toolbar";

const Main = (props) => {
    return (
        <>
            <Toolbar {...props}/>
            {<div className="divWhite">/user/85/cards</div>}
            {<div className="divWhite">/user/85/profile</div>}
        </>
    )
}

export default Main;