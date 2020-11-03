const myHeaders = new Headers();

const requestPostUpdate = (VERB, raw) => {
    const setVerb = {
        method: `${VERB}`,
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: 'follow'
    };
    return setVerb;
}
const requestGetDelete = (VERB) => {
    const setVerb = {
        method: `${VERB}`,
        headers: myHeaders,
        redirect: 'follow'
    };
    return setVerb;
}

async function getData() {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12`, requestGetDelete('GET'));
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
async function deleteData(postId) {
    try {
        fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, requestGetDelete('DELETE'));
    } catch (err) {
        console.log(err);
    }
}
async function updateData(postId, raw) {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, requestPostUpdate('PUT', raw));
    } catch (err) {
        console.log(err);
    }
}
async function postData(raw) {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12`, requestPostUpdate('POST', raw));
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}