import View from './View.js';

class BackgroundView extends View {
    _parentElement = document.getElementById('background');

    _generateMarkup() {
        // <source srcset="${this._data.srcs.map(src => `${src.src} ${src.width}x`)}" type="image/jpg">

        return `
            <source srcset="${this._data.srcs[1].src}" media="(min-width: 48em)" type="image/jpg">
            <img src="${this._data.srcs[0].src}" fetchpriority="high" aria-hidden="true">
        `
    }

}

export default new BackgroundView();