import View from './View.js';

class clockView extends View {
    _parentElement = document.getElementById('clock');
    _toggled = false;

    handleToggle(handler1, handler2) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn');
            if (!btn) return;
            const btnIcon = btn.querySelector('[data-use="icon"] > use');
            const btnText = btn.querySelector('[data-use="text"]');

            if(this._toggled) {
                handler2();
                this._toggled = false;
                btnText.textContent = 'more';
                btnIcon.setAttribute('href', '/assets/icons/icons.svg#arrow-down');
            } else {
                handler1();
                this._toggled = true;
                btnText.textContent = 'less';
                btnIcon.setAttribute('href', '/assets/icons/icons.svg#arrow-up');
            }
        });
    }

    _generateMarkup() {
        return `
            <h1 class="text-uppercase">
                <span class="[ flow ] [ size-2 f-size-fluid-4 f-spacing-3 fw-regular direction-row align-items-center justify-content-start ]">
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                        <use href="/assets/icons/icons.svg#${this._data.theme === 'light' ? 'sun' : 'moon'}"/>
                    </svg>
                    <span>good ${this._data.timeOfDay}<span class="hide//below-sm">, it’s currently</span></span>
                </span>
                <span class="d-block f-height-1">
                    <span class="f-size-fluid-8 f-spacing-1 fw-bold">${this._data.localTime}</span>
                    <span class="f-size-fluid-6 fw-light">${this._data.timezoneName}</span>
                </span>
                ${this._data.city ? `<span class="f-size-fluid-5 f-spacing-3 fw-bold text-uppercase">${this._data.currentPosition ?? this._data.city}, ${this._data.countryCode}</span>` : ''}
            </h1>

            <button class="[ btn ] [ justify-self-start//below-md align-self-start//below-md justify-self-end//above-md align-self-end//above-md ]"
                    data-type="controls" aria-controls="panel">
                <span data-use="text">${this._toggled ? 'less' : 'more'}</span>
                <svg class="icon" focusable="false" width="1em" height="1em" data-use="icon" aria-hidden="true">
                    <use href="/assets/icons/icons.svg#${this._toggled ? 'arrow-up' : 'arrow-down'}"/>
                </svg>
            </button>
        `
    }

}

export default new clockView();