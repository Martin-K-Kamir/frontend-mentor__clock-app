import * as model from './model.js';
import quoteView from './views/quoteView.js';

async function controlInitializationApp() {
    try {
        const ipAddress = await model.getIPAddress();

        const viewportOrientation = model.getViewportOrientation();

        model.state.set({
            location: { ipAddress },
            image: { viewportOrientation },
            time: model.createTimeObj()
        });

        const [ imageData, quoteData, locationData ] = await model.getInitializationData();

        model.state.set({
            quote: model.createQuoteObj(quoteData),
            image: model.createImageObj(imageData),
            location: { ...model.state.location, ...model.createLocationObj(locationData) },
        });

        quoteView.render(model.state.quote);

        console.log(model.state)
    } catch (error) {
        console.error(`!!! ${error} !!!`);
    }
}

async function controlUserPosition() {
    try {
        const currentPosition = await model.getCurrentPosition();
        model.state.set({ location: { ...model.state.location, currentPosition } });
    } catch (error) {
        console.error(`!!! ${error} !!!`);
    }
}


controlInitializationApp();
controlUserPosition();

async function controlNewQuote() {
    try {
        const quoteData = await model.getQuoteData();
        model.state.set({ quote: {...model.state.quote, ...model.createQuoteObj(quoteData)} });
        console.log(model.state)
        quoteView.update(model.state.quote);
    } catch (error) {
        console.error(`!!! ${error} !!!`);
    }
}



function init() {

    quoteView.handleClick(controlNewQuote);
}
init();