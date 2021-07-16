//This is how everything on the frontend will interact with the API and hence the database.
const fetch = require("node-fetch");

async function getApiData(url,requestOptions) {
    const response = await fetch('http://localhost:3001/'+url, requestOptions)
    const data = response;
    console.log(data)
    return data;
}
getApiData("friend",{id:"1"})

//export default getApiData;
