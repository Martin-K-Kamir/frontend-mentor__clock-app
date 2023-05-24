import { getJSON } from './utils.js';
// import { API_KEY_1 } from './keys.js';

class State {
    constructor(initValue) {
        Object.assign(this, initValue)
    }

    set(newValue) {
        Object.assign(this, {...newValue})
    }
}

export const state = new State({
    image: {},
    quote: {},
    ipAddress: '',
    location: {},
});

export async function getIPAddress() {
    const { ip } = await getJSON(`https://api.ipify.org?format=json`);
    return ip;
}

export async function getLocation(ip) {
    const data = await getJSON(`https://api.ipbase.com/v2/info?ip=${ip}`)
    // const data = await getJSON(`http://worldtimeapi.org/api/ip`)
    return data;
}


export async function getData() {
    const data = await Promise.all([
        getJSON(`https://api.unsplash.com/photos/random?client_id=`),
        getJSON(`https://api.quotable.io/quotes/random`)
    ]);

    console.log(data.flat());
}

function getCurrentDayOfYear() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
}

const currentDayOfYear = getCurrentDayOfYear();
console.log(currentDayOfYear);


function getTimeOfDay() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

const timeOfDay = getTimeOfDay();
console.log('It is currently', timeOfDay);