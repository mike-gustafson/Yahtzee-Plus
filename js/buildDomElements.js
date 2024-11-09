import domElements from './domElements.js';

function buildDomElements() {
    const elementRefs = { buttons: {}, modals: {}, spans: {}, scorecard: {} };
    domElements.buttons.forEach(button => {
        elementRefs.buttons[button.name] = document.getElementById(button.id);
    })
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
    domElements.spans.forEach(span => {
        elementRefs.spans[span.name] = document.getElementById(span.id);
    })
    domElements.scorecard.forEach(scorecard => {
        elementRefs.scorecard[scorecard.name] = document.getElementById(scorecard.id);
    })
    Object.entries(elementRefs.buttons).forEach(([key, value]) => {
        window[key] = value;
    })
    Object.entries(elementRefs.modals).forEach(([key, value]) => {
        window[key] = value;
        if (value.settings) {
            Object.entries(value.settings).forEach(([settingKey, settingValue]) => {
                window[settingKey] = settingValue;
            });
        }
    })
    Object.entries(elementRefs.spans).forEach(([key, value]) => {
        window[key] = value;
    })
    Object.entries(elementRefs.scorecard).forEach(([key, value]) => {
        window[key] = value;
    })
}

export default buildDomElements;