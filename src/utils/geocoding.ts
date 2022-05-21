interface geoData {
    lat: number;
    lon: number
}

export const geocoding = async (address: string):Promise<geoData> => {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
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