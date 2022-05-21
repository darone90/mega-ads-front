import React from "react";
import './Btn.css';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    to?: string;
    func?: () => void;
}

export const Button = (props: Props) => (
    props.to
        ? <Link className='btn' to={props.to}>{props.text}</Link>
        : <button onClick={props.func}>{props.text}</button>
);