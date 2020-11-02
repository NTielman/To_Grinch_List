const myHeaders = new Headers();
// const input = { description: "buy oatmeal", done: false };
const raw = JSON.stringify({ description: "buy oatmeal", done: false });

const requestPostUpdate = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: raw,
    // body: JSON.stringify(input),
    redirect: 'follow'
};

const requestGetDelete = (VERB) => {
    const setVerb = {
        method: `${VERB}`,
        headers: myHeaders,
        redirect: 'follow'
    };
    return setVerb;
}

async function getData(VERB) {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12`, requestGetDelete(VERB));
        const data = await response.text();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function deleteData(VERB, postId) {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, requestGetDelete(VERB));
        const data = await response.text();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function updateData(VERB, postId) {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, requestGetDelete(VERB));
        const data = await response.text();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function postData() {
    try {
        const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/`, requestPostUpdate);
        const data = await response.text();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

getData('GET');

// async function deleteData(postId) {
//     try {
//         const response = await fetch(`https://jsonbox.io/box_ad91117cbbec078a7e12/${postId}`, request('DELETE'));
//         const data = await response.text();
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// }

// async function getData() {
//     try {
//         const response = await fetch("https://jsonbox.io/box_ad91117cbbec078a7e12", request('GET'));
//         const data = await response.text();
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// }

