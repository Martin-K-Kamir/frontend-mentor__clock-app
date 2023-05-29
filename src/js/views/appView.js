import View from './View.js';

class AppView extends View {
    _parentElement = document.getElementById('app');
    _loaderElement = document.getElementById('loader');
    _messageError = 'Something went wrong, please try again later :(';

    hideApp() {
        this._parentElement.style.opacity = 0;
    }

    showApp() {
        this._parentElement.style.opacity = 1;
        this._parentElement.style.transition = 'opacity 300ms ease-in-out';
        this._loaderElement.style.opacity = 0;
        this._loaderElement.style.transition = 'opacity 300ms ease-in-out';

        setTimeout(() => {
            this._loaderElement.remove()
        }, 300);
    }

    renderLoaderError(message = this._messageError) {
        const markup = `
            <p class="f-size-fluid-1 f-spacing-3">${message}</p>
        `;

        this._loaderElement.innerHTML = '';
        this._loaderElement.insertAdjacentHTML('beforeend', markup);
    }
}

export default new AppView();