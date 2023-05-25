export default class View {
    _data;

    render(data, getMarkup = false) {
        if (!data || (Array.isArray(data) && data.length === 0)) return;

        this._data = data;
        const markup = this._generateMarkup();

        if (getMarkup) return markup;

        this.clear();
        (this._renderElement ?? this._parentElement).ariaHidden = false;
        (this._renderElement ?? this._parentElement).insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        if (!this._parentElement.hasChildNodes()) return;

        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
        });
    }

    clear() {
        (this._renderElement ?? this._parentElement).innerHTML = '';
    }
}