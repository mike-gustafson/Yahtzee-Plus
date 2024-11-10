import domElements from '../data/domElements.js';

const elementRefs = { buttons: {}, modals: {}, spans: {}, scorecard: {}, containers: {} };

function mapDomElements() {
    mapButtons();
    mapSpans();
    mapModals();
    mapScorecard();
    mapContainers();
}

function mapButtons() {
    domElements.buttons.forEach(button => {
        elementRefs.buttons[button.name] = document.getElementById(button.id);
    })
    Object.entries(elementRefs.buttons).forEach(([key, value]) => {
        window[key] = value;
    })
}

function mapSpans() {
    domElements.spans.forEach(span => {
        elementRefs.spans[span.name] = document.getElementById(span.id);
    })
    Object.entries(elementRefs.spans).forEach(([key, value]) => {
        window[key] = value;
    })
}

function mapModals() {
    domElements.modals.forEach(modal => {
        elementRefs.modals[modal.name] = document.getElementById(modal.id);
        if (modal.settings) {
        elementRefs.modals[modal.name].settings = {};
            modal.settings.forEach(setting => {
                elementRefs.modals[modal.name].settings[setting.name] = document.getElementById(setting.id);
            });
        }
        if (modal.instructions) {
            elementRefs.modals[modal.name].instructions = {};
            modal.instructions.forEach(instruction => {
                elementRefs.modals[modal.name].instructions[instruction.name] = document.querySelectorAll(`.${instruction.id}`);
            });
        }
    });
    Object.entries(elementRefs.modals).forEach(([key, value]) => {
        window[key] = value;
        if (value.settings) {
            Object.entries(value.settings).forEach(([settingKey, settingValue]) => {
                window[settingKey] = settingValue;
            });
        }
    })
}

function mapScorecard() {
    domElements.scorecard.forEach(scorecard => {
        elementRefs.scorecard[scorecard.name] = document.getElementById(scorecard.id);
    })
    Object.entries(elementRefs.scorecard).forEach(([key, value]) => {
        window[key] = value;
    })
}

function mapContainers() {
    domElements.containers.forEach(container => {
        elementRefs.containers[container.name] = document.getElementById(container.id);
    })
    Object.entries(elementRefs.containers).forEach(([key, value]) => {
        window[key] = value;
    })
}

export default mapDomElements;