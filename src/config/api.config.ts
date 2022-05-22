interface API {
    backPath: string;
    geoPath: string;
}

export const ApiConfig: API = {
    backPath: process.env.REACT_APP_API_URL ?? "http://localhost:3030",
    geoPath: `https://nominatim.openstreetmap.org/search?format=json&q=`,
}