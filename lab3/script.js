
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

function generateRectangle() {

    const generationAreaRectangle = document.getElementById('generation-area').getBoundingClientRect();

    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.top = `${getRandomInt(generationAreaRectangle.top + 8, generationAreaRectangle.bottom - 64 - 8)}px`;
    rectangle.style.left = `${getRandomInt(generationAreaRectangle.left + 8, generationAreaRectangle.right - 64 - 8)}px`;
    rectangle.style.background = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
    
    document.getElementById('platform-area').appendChild(rectangle);

}

let dragStartX = 0;
let dragStartY = 0;

function dragStart(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('rectangle') !== true) return;
    draggedElement = clickedElement;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
};

function drag(event) {

    if (draggedElement === null) return;
    event.preventDefault();

    const draggedElementY = draggedElement.offsetTop + (event.clientY - dragStartY);
    const draggedElementX = draggedElement.offsetLeft + (event.clientX - dragStartX);

    draggedElement.style.top = `${draggedElementY}px`;
    draggedElement.style.left = `${draggedElementX}px`;
    dragStartX = event.clientX;
    dragStartY = event.clientY;

};

function dragEnd(event) {
    draggedElement = null;
};

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);
