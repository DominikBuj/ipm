
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
        draggedElement = listElement;
    });

    listElement.addEventListener('dragover', (event) => {
        event.preventDefault();
        const elementAfterDraggedElement = getElemenetAfterDraggedElement(event.clientY);
        if (elementAfterDraggedElement !== null) document.getElementById('list').insertBefore(draggedElement, elementAfterDraggedElement);
    });

    listElement.addEventListener('dragend', (event) => {
        listElement.style.opacity = '1';
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

function checkCollision(draggedElement, collisionElement) {

    const draggedElementRectangle = draggedElement.getBoundingClientRect();
    const collisionElementRectangle = collisionElement.getBoundingClientRect();

    const isColliding = !(
        (draggedElementRectangle.bottom < (collisionElementRectangle.y)) ||
        (draggedElementRectangle.y > (collisionElementRectangle.y + collisionElementRectangle.height)) ||
        (draggedElementRectangle.right < collisionElementRectangle.x) ||
        (draggedElementRectangle.x > (collisionElementRectangle.x + collisionElementRectangle.width))
    );

    return isColliding;

}

function checkAreaContainment(rectangle) {

    let isInsidePlatformArea = false;

    const rectangleRectangle = rectangle.getBoundingClientRect();
    const platformAreaRectangle = document.getElementById('platform-area').getBoundingClientRect();
    const generationAreaRectangle = document.getElementById('generation-area').getBoundingClientRect();

    if (rectangleRectangle.bottom > platformAreaRectangle.bottom) rectangle.style.top = `${platformAreaRectangle.bottom - rectangleRectangle.height}px`;
    if (rectangleRectangle.right > platformAreaRectangle.right) rectangle.style.left = `${platformAreaRectangle.right - rectangleRectangle.width}px`;

    if (rectangleRectangle.bottom < platformAreaRectangle.top) {
        if (rectangleRectangle.top < generationAreaRectangle.top) rectangle.style.top = `${generationAreaRectangle.top}px`;
        if (rectangleRectangle.left < generationAreaRectangle.left) rectangle.style.left = `${generationAreaRectangle.left}px`;
    } else {
        isInsidePlatformArea = true;
        if (rectangleRectangle.top < platformAreaRectangle.top) rectangle.style.top = `${platformAreaRectangle.top}px`;
        if (rectangleRectangle.left < platformAreaRectangle.left) rectangle.style.left = `${platformAreaRectangle.left}px`;
    }

    return isInsidePlatformArea;

}

function drag(event) {

    if (draggedElement === null) return;
    event.preventDefault();

    const isInsidePlatformArea = checkAreaContainment(draggedElement);

    if (isInsidePlatformArea) {
        const collisionElements = Array.from(document.querySelectorAll('.rectangle')).filter(collisionElement => collisionElement !== draggedElement);
        for (const collisionElement of collisionElements) {
            if (checkCollision(draggedElement, collisionElement)) return;
        }
    }

    const draggedElementX = draggedElement.offsetLeft + (event.clientX - dragStartX);
    const draggedElementY = draggedElement.offsetTop + (event.clientY - dragStartY);

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
