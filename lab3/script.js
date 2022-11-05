
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let draggedElement = null

const listElements = Array.from(document.querySelectorAll('.list-element'));

function getElemenetAfterDraggedElement(mouseY) {
    const availableElements = listElements.filter(listElement => listElement !== draggedElement)
    return availableElements.reduce((closestElement, availableElement) => {
        const availableElementRectangle = availableElement.getBoundingClientRect();
        const offset = mouseY - availableElementRectangle.top - availableElementRectangle.height / 2;
        return (offset < 0 && offset > closestElement.offset) ? { offset: offset, element: availableElement } : closestElement;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

listElements.forEach(listElement => {

    listElement.addEventListener('dragstart', (event) => {
        listElement.style.opacity = '0.5';
        // listElement.style.borderStyle = 'dashed';
        draggedElement = listElement;
    });

    listElement.addEventListener('dragover', (event) => {
        event.preventDefault();
        const elementAfterDraggedElement = getElemenetAfterDraggedElement(event.clientY);
        if (elementAfterDraggedElement !== null) document.getElementById('list').insertBefore(draggedElement, elementAfterDraggedElement);
    });

    listElement.addEventListener('dragend', (event) => {
        listElement.style.opacity = '1';
        // listElement.style.borderStyle = 'solid';
    });

});
