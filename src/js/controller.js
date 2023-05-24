import * as model from './model.js';

// model.getData();

async function controlLoadingPage() {
    // loading

    // getting data
    const ipAddress = await model.getIPAddress();

    const location = await model.getLocation(ipAddress);

    model.state.set({ location });

    console.log(model.state);
    // render

    // remove loading
}

controlLoadingPage();
