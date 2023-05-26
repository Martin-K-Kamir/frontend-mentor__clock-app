import View from './View.js';

class clockView extends View {
    _parentElement = document.getElementById('panel');

    showPanel() {
        this._parentElement.dataset.state = 'visible';
    }

    hidePanel() {
        this._parentElement.dataset.state = 'hidden';
    }

    _generateMarkup() {
        return `
            <div class="[ panel__wrapper ] [ flow wrapper grid ]" data-grid="switch">
                <div class="direction-row//below-md align-items-center//below-md">
                    <h2 class="f-size-fluid-1 f-spacing-3 fw-regular text-uppercase">CURRENT TIMEZONE</h2>
                    <p class="f-size-fluid-7 fw-bold justify-self-end//below-md">${this._data.timezone}</p>
                </div>
                <div class="direction-row//below-md align-items-center//below-md">
                    <h2 class="f-size-fluid-1 f-spacing-3 fw-regular text-uppercase">Day of the week</h2>
                    <p class="f-size-fluid-7 fw-bold justify-self-end//below-md">${this._data.dayOfWeek}</p>
                </div>
                <div class="direction-row//below-md align-items-center//below-md">
                    <h2 class="f-size-fluid-1 f-spacing-3 fw-regular text-uppercase">Day of the year</h2>
                    <p class="f-size-fluid-7 fw-bold justify-self-end//below-md">${this._data.dayOfYear}</p>
                </div>
                <div class="direction-row//below-md align-items-center//below-md">
                    <h2 class="f-size-fluid-1 f-spacing-3 fw-regular text-uppercase">Week number</h2>
                    <p class="f-size-fluid-7 fw-bold justify-self-end//below-md">${this._data.weekNumber}</p>
                </div>
            </div>
        `
    }

}

export default new clockView();