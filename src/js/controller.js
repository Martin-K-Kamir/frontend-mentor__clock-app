import * as model from './model.js';
import quoteView from './views/quoteView.js';
import backgroundView from './views/backgroundView.js';
import clockView from './views/clockView.js';
import panelView from './views/panelView.js';
import appView from './views/appView.js';

import staticData from './staticData.json';

async function controlInitializationApp() {
    try {
        const ipAddress = await model.getIPAddress();

        const viewportOrientation = model.getViewportOrientation();

        model.state.set({
            location: {ipAddress},
            image: {viewportOrientation},
            time: model.createTimeObj()
        });

        const [imageData, quoteData, locationData] = await model.getInitializationData();

        if (imageData.status === 'rejected') {
            imageData.value = staticData.image;
        }

        if (quoteData.status === 'rejected') {
            quoteData.value = staticData.quote;
        }

        model.state.set({
            quote: model.createQuoteObj(quoteData),
            image: model.createImageObj(imageData),
            location: {...model.state.location, ...model.createLocationObj(locationData)},
        });

        quoteView.render(model.state.quote);
        backgroundView.render(model.state.image);
        backgroundView.renderAuthor(model.state.image);
        clockView.render({...model.state.location, ...model.state.time});
        panelView.render({...model.state.location, ...model.state.time});

        document.body.dataset.theme = model.state.time.theme;

        console.log(model.state)

    } catch (error) {
        console.error(error);
        appView.renderLoaderError()
    }
}

async function controlUserPosition() {
    try {
        const currentPosition = await model.getCurrentPosition();
        model.state.set({location: {...model.state.location, ...currentPosition}});
        clockView.update({...model.state.location, ...model.state.time});
    } catch (error) {
        console.error(error);
    }
}

function controlClock() {
    function updateClock() {
        model.state.set({time: model.createTimeObj()});
        clockView.update({...model.state.location, ...model.state.time});
        panelView.update({...model.state.location, ...model.state.time});
        document.body.dataset.theme = model.state.time.theme;
    }

    setTimeout(() => {
        updateClock()

        setInterval(() => {
            updateClock()

        }, 60 * 1000);
    }, model.calcSecondsToNextMinute() * 1000);
}

async function controlNewQuote() {
    try {
        const quoteData = await model.getQuoteData();
        model.state.set({quote: model.createQuoteObj(quoteData)});
        quoteView.update(model.state.quote);
    } catch (error) {
        console.error(`!!! ${error} !!!`);
    }
}

function controlOpenPanel() {
    panelView.showPanel();
}

function controlHidePanel() {
    panelView.hidePanel();
}

function init() {
    controlInitializationApp();
    controlUserPosition();
    controlClock();
    quoteView.handleClick(controlNewQuote);
    clockView.handleToggle(controlOpenPanel, controlHidePanel);
}

init();