import {getJSON} from './utils.js';
// import {API_KEY_GEOAPIFY, API_KEY_UNSPLASH} from './keys.js';
import {API_URL_GEOAPIFY, API_URL_IPAPI, API_URL_QUOTABLE, API_URL_UNSPLASH} from './config.js';

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
    location: {},
});

export async function getIPAddress() {
    const {ip} = await getJSON(`https://api.ipify.org?format=json`);
    return ip;
}

export async function getInitializationData() {
    const promises = [
        getJSON(`${API_URL_UNSPLASH}?client_id=${API_KEY_UNSPLASH}&orientation=${state.image.viewportOrientation}&query=${state.time.timeOfDay}`),
        getJSON(`${API_URL_QUOTABLE}`),
        getJSON(`${API_URL_IPAPI}/${state.location.ipAddress}`,),
    ];

    const settledPromises = await Promise.allSettled(promises);
    return settledPromises.map(promise => {
        if (Array.isArray(promise.value)) {
            promise.value = promise.value[0];
        }
        return promise;
    });
}

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords;
                try {
                    const response = await fetch(`${API_URL_GEOAPIFY}?lat=${latitude}&lon=${longitude}&format=json&apiKey=${API_KEY_GEOAPIFY}`);
                    const data = await response.json();
                    resolve({currentPosition: data.results[0].city});
                } catch (error) {
                    reject('Error retrieving city information');
                }
            }, () => {
                reject('Unable to retrieve your location');
            });
        }
    });
}

export async function getQuoteData() {
    const data = await getJSON(`${API_URL_QUOTABLE}`);
    return data[0];
}

export function getViewportOrientation() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (width > height) {
        return 'landscape';
    } else {
        return 'portrait';
    }
}

function getDayOfWeek(now) {
    return now.getDay();
}

function getWeekNumber(now) {
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
    const daysOffset = firstDayOfYear.getDay() === 0 ? 1 : 8 - firstDayOfYear.getDay();
    const daysSinceStartOfYear = (now - firstDayOfYear) / (1000 * 60 * 60 * 24) + daysOffset;
    const weekNumber = Math.ceil(daysSinceStartOfYear / 7);
    return weekNumber;
}

function getDayOfYear(now) {
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
}

function getTimeOfDay(now) {
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

function getTheme(now) {
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 18) {
        return 'light';
    } else {
        return 'dark';
    }
}

function getLocalTime(now) {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
    });

    return formatter.format(now);
}

function getTimezoneName(now) {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
        timeZoneName: 'short'
    });

    return formatter.formatToParts(now)
    .find(part => part.type === 'timeZoneName')
        .value;
}

export function createTimeObj() {
    const now = new Date();

    return {
        dayOfWeek: getDayOfWeek(now),
        weekNumber: getWeekNumber(now),
        dayOfYear: getDayOfYear(now),
        timeOfDay: getTimeOfDay(now),
        localTime: getLocalTime(now),
        timezoneName: getTimezoneName(now),
        theme: getTheme(now),
    };
}

export function createLocationObj(data) {
    const _data = data.value ?? data;

    return {
        status : data.status,
        timezone: _data.timezone,
        countryCode: _data.countryCode,
        city: _data.city,
    };
}

export function createQuoteObj(data) {
    const _data = data.value ?? data;

    return {
        status: data.status,
        author: _data.author,
        quote: _data.content,
    };
}

export function createImageObj(data) {
    return {
        status: data.status,
        author: {
            name: `${data.value.user.first_name} ${data.value.user.last_name}`,
            url: data.value.user.links.html,
        },
        srcs: [
            {
                src: `${data.value.urls.raw}&fit=crop&w=1920&h=1080&q=80`,
                width: 1920,
            },
            {
                src: data.value.urls.regular,
                width: 1080,
            },
            {
                src: data.value.urls.small,
                width: 400,
            },
        ]
    };
}

export function calcSecondsToNextMinute() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsToNextMinute = 60 - seconds;
    return secondsToNextMinute;
}
