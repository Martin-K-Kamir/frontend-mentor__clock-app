import View from './View.js';
import appView from './appView.js';

class BackgroundView extends View {
    _parentElement = document.getElementById('background');

    _handeLoadImage() {
        const imgElement = document.querySelector('#background > img');

        imgElement.addEventListener('load', function() {
            appView.showApp();
        });
    }

    _generateMarkup() {
        return `
            <source srcset="${this._data.srcs.map(src => `${src.src} ${src.width}w`)}" sizes="100vw" type="image/jpg">
            <img src="${this._data.srcs[1].src}" alt="" aria-hidden="true">
        `
    }

    renderAuthor(data) {
        const markup = `
            <footer class="[ author ] [ f-size-fluid-1 ]">
                Photo by
                <a href="${data.author.url}" target="_blank">${data.author.name}</a>
                on
                <a href="https://unsplash.com/" target="_blank">Unsplash</a>
            </footer>
        `;

        document.body.insertAdjacentHTML('beforeend', markup);
    }

    render(data) {
        super.render(data);
        this._handeLoadImage();
    }
}

export default new BackgroundView();