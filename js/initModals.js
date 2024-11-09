async function initModals() {
    await loadModalContent("instructions-modal", "../html/instructions-modal.html");
    await loadModalContent("settings-modal", "../html/settings-modal.html");
}
async function loadModalContent(modalID, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load content for ${modalID}`);
        }
        const modalContent = await response.text();
        const modal = document.getElementById(modalID);
        modal.innerHTML = modalContent;
    } catch (error) {
        console.error('Error fetching modal content for',modalID+':',error);
    }
}

export default initModals;