import React, {useEffect, useState} from "react";
import {AdTypes} from "types";


interface Props {
    id: string;
}

export const SingleAd = (props: Props) => {

    const [ad, setAd] = useState<AdTypes | null>(null)

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3030/ad/${props.id}`);
            const data = await res.json();

            setAd(data);
        })()
    },[props.id])

    if (!ad) return <p>Wczytywanie...</p>

    return (
        <>
            <h2>{ad.name}</h2>
            <p>{ad.description}</p>
            {ad.price && <p><b>{ad.price} zł</b></p>}
            <a href={ad.url} target="_blank" rel='noreferrer'>Otwórz ogłoszenie</a>
            <strong>Liczba wyświetleń: {ad.views}</strong>
        </>
    )
}