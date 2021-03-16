// ----------------------- request options ------------------------- 
const myHeaders = new Headers();
const jsonboxUrl = "https://jsonbox.io/box_e3b1b0a298df2db8a56a"

const PostPutRequest = (VERB, raw) => {
    const setVerb = {
        method: `${VERB}`,
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: 'follow'
    };
    return setVerb;
}

const GetDeleteRequest = (VERB) => {
    const setVerb = {
        method: `${VERB}`,
        headers: myHeaders,
        redirect: 'follow'
    };
    return setVerb;
}

// ----------------------- api-request functions ------------------------- 
async function getData() {
    try {
        const response = await fetch(`${jsonboxUrl}`, GetDeleteRequest('GET'));
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function deleteData(postId) {
    try {
        await fetch(`${jsonboxUrl}/${postId}`, GetDeleteRequest('DELETE'));
    } catch (err) {
        console.log(err);
    }
}

async function updateData(postId, raw) {
    try {
        await fetch(`${jsonboxUrl}/${postId}`, PostPutRequest('PUT', raw));
    } catch (err) {
        console.log(err);
    }
}

async function postData(raw) {
    try {
        const response = await fetch(`${jsonboxUrl}`, PostPutRequest('POST', raw));
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
