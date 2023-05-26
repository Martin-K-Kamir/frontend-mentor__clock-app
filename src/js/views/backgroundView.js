import View from './View.js';

class BackgroundView extends View {
    _parentElement = document.getElementById('background');

    _generateMarkup() {
        return `
            <source srcset="${this._data.srcs.map(src => `${src.src} ${src.width}w`)}" type="image/jpg">
            <img src="${this._data.srcs[1].src}" fetchpriority="high" aria-hidden="true">
        `
    }

}

export default new BackgroundView();