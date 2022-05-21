import React from "react";

interface Props {
    text: string
}

export const Popup = (props: Props) => {
    return (
        <div className='popup'>
            {props.text}
        </div>
    )
}