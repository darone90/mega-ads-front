import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {SearchContext} from "../../contexts/search.context";

import {SingleAd} from "./SingleAd";

import '../../utils/fix-map-icon';
import {SimpleAdEntity} from "types";

import './map.css';
import 'leaflet/dist/leaflet.css';



export const Map = () => {

    const {search} = useContext(SearchContext)
    const [ads, setAds] = useState<SimpleAdEntity[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3030/ad/search/${search}`);
            const data = await res.json();

            setAds(data);
        })();
    }, [search])

    return (
        <div className="map">

            <MapContainer center={[50.11864, 19.97973]} zoom={25}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {ads.map(ad => (
                    <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                        <Popup>
                            <SingleAd id={ad.id}/>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}