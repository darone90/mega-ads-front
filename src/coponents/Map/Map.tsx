import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon';

import './map.css';
import 'leaflet/dist/leaflet.css';



export const Map = () => {
    return (
        <div className="map">
            <MapContainer center={[50.11864, 19.97973]} zoom={25}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[50.11864, 19.97973]}>
                    <Popup>
                        <h2>Domek mój</h2>
                        <p>Tu mieszka pan Kotełek</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}