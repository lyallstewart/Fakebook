//This is how everything on the frontend will interact with the API and hence the database.
const fetch = require("node-fetch");


async function getApiData(url,body) {
    const response = await fetch('http://localhost:3001/'+url, {method: 'POST'});
    const data = await response.json();
    return data;
}



export default getApiData;