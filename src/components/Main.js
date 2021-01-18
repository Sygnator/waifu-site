import React from 'react';
import css from "./Main.css";
import Toolbar from "./Module/Toolbar";

const Main = () => {
    return (
        <>
            <Toolbar />
            {<div className="divWhite">/user/204697/cards</div>}
            {<div className="divWhite">/user/204697/profile</div>}
        </>
    )
}

export default Main;