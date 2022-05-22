import {ApiConfig} from "../config/api.config";

interface geoData {
    lat: number;
    lon: number
}

export const geocoding = async (address: string):Promise<geoData> => {
    const geoRes = await fetch(`${ApiConfig.geoPath}${encodeURIComponent(address)}`);
    const geoData = await geoRes.json();


    if (geoData.length < 1) {
        return {
            lat: 0,
            lon: 0
        }
    }

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    return {
        lat,
        lon
    }
}