import {getJSON} from './utils.js';
import {
    API_URL_UNSPLASH,
    API_KEY_UNSPLASH,
    API_URL_QUOTABLE,
    API_URL_IPAPI,
    API_URL_GEOAPIFY,
    API_KEY_GEOAPIFY
} from './keys.js';


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
    const { ip } = await getJSON(`https://api.ipify.org?format=json`);
    return ip;
}

export async function getInitializationData() {
    const data = await Promise.all([
        // getJSON(`${API_URL_UNSPLASH}?client_id=${API_KEY_UNSPLASH}&orientation=${state.image.viewportOrientation}&query=${state.time.timeOfDay}`),
        getJSON(`${API_URL_QUOTABLE}`),
        getJSON(`${API_URL_IPAPI}/${state.location.ipAddress}`)
    ]);
    return data.flat();
}

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`${API_URL_GEOAPIFY}?lat=${latitude}&lon=${longitude}&format=json&apiKey=${API_KEY_GEOAPIFY}`);
                    const data = await response.json();
                    resolve(data.results[0].city);
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

function getLocalTime(now) {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
    });

    return formatter.format(now);
}

function getTimeZoneName(now) {
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
        timeZoneName: getTimeZoneName(now),
    };
}

export function createLocationObj(data) {
    return {
        timezone: data.timezone,
        countryCode: data.countryCode,
        city: data.city,
    };
}

export function createQuoteObj(data) {
    return {
        author: data.author,
        quote: data.content,
    };
}

export function createImageObj(data) {
    return {
        author: {
            name: `${data.user.first_name} ${data.user.last_name}`,
            url: data.user.links.html,
        },
        srcs: [
            {
                src: data.urls.regular,
            },
            {
                src: data.urls.full,
            }
        ]
    };
}
