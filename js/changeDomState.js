function changeDomState(state) {
    const { display, hidden } = state
    display.forEach(id => document.querySelector(id).classList.remove("hidden"));
    hidden.forEach(id => document.querySelector(id).classList.add("hidden"));
}

export default changeDomState;