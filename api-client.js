// ----------------------- request options ------------------------- 
const myHeaders = new Headers();

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
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12`, GetDeleteRequest('GET'));
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function deleteData(postId) {
    try {
        await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, GetDeleteRequest('DELETE'));
    } catch (err) {
        console.log(err);
    }
}

async function updateData(postId, raw) {
    try {
        await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, PostPutRequest('PUT', raw));
    } catch (err) {
        console.log(err);
    }
}

async function postData(raw) {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12`, PostPutRequest('POST', raw));
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}