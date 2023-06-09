import View from './View.js';

class QuoteView extends View {
    _parentElement = document.getElementById('quote');
    _errorMessage = '';

    handleClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn');
            if (!btn) return;
            handler();
        });
    }

    _generateMarkup() {
        (this._renderElement ?? this._parentElement).ariaHidden = false;

        return `
            <figure class="flow">
                <blockquote>
                    <p>${this._data.quote.trim()}</p>
                </blockquote>
                <figcaption class="fw-bold">
                    ${this._data.author}
                </figcaption>
            </figure>
            <button class="btn" data-type="icon" aria-label="new quote">
                <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                    <use href="/assets/icons/icons.svg#refresh"/>
                </svg>
            </button>
        `
    }

}

export default new QuoteView();