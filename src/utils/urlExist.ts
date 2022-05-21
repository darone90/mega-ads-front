export const urlExist = async (url: string):Promise<boolean> => {
    const req = await fetch(`http://localhost:3030/ad/urlcheck/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url,})
    });
    const res = await req.json();

    if(res.ok) {
        return true
    } else {
        return false
    };
}