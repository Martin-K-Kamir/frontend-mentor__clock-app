import * as model from './model.js';

async function controlInitializationApp() {
    try {
        const ipAddress = await model.getIPAddress();

        const viewportOrientation = model.getViewportOrientation();

        model.state.set({
            location: { ipAddress },
            image: { viewportOrientation },
            time: model.createTimeObj()
        });

        const [ imageData, quoteData, locationData ] = await model.getAppData();

        model.state.set({
            quote: model.createQuoteObj(quoteData),
            location: { ...model.state.location, ...model.createLocationObj(locationData) },
        });

        console.log(model.state);
    } catch (error) {
        console.error(`!!! ${error} !!!`);
    }
}

async function controlCurrentPosition() {
    try {
        const currentPosition = await model.getCurrentPosition();
        model.state.set({ location: { ...model.state.location, currentPosition } });

        console.log(model.state);
    } catch (error) {
        console.error(`!!! ${error} !!!`);
    }
}

controlInitializationApp();
controlCurrentPosition();
