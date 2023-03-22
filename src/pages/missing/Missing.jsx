import React from "react";
import { Link } from "react-router-dom";
import style from "./Missing.module.css";

function Missing() {
    return (
        <div className={style.main}>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Link to="/"><button className={style.button}>Go back</button></Link>
        </div>
    );
}

export default Missing;