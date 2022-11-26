
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

let open = indexedDB.open('MyDatabase', 1);

const fieldNames = ['email', 'area-code', 'nip', 'id', 'ipv4', 'website', 'windows-path-small', 'windows-path', 'file-path', 'ipv6', 'phone-number', 'date', 'date-limited', 'time-24', 'time-12', 'color'];

const possibleIdsHeader = document.getElementById('possible-ids-header');
const possibleIds = document.getElementById('possible-ids');

open.onupgradeneeded = function() {
    let database = open.result;
    let store = database.createObjectStore("MyObjectStore", {keyPath: "id"});
};

open.onsuccess = function() {
    showPossibleIds();
}

function showPossibleIds() {

    possibleIdsHeader.textContent = 'Brak Klientów';
    possibleIds.innerHTML = null;

    let database = open.result;
    let transaction = database.transaction("MyObjectStore", "readwrite");
    let store = transaction.objectStore("MyObjectStore");

    const getIds = store.getAll();
    getIds.onsuccess = () => {
        
        let ids = [];
        for (let id of getIds.result) {
            ids += id['id'];
        }

        if (ids.length > 0) {
            possibleIdsHeader.textContent = 'Lista Klientów';
            for (let id of ids) {
                possibleIds.innerHTML += `
                    <div class="flex-container-row form-cell">
                        <span style="flex: 1 1 auto;">${id}</span>
                        <button style="margin: 0;" onclick="loadClientData(${id});">Wczytaj dane klienta</button>
                    </div>
                `
            }
        };

    };

}

function loadClientData(id) {
    
    let database = open.result;
    let transaction = database.transaction("MyObjectStore", "readwrite");
    let store = transaction.objectStore("MyObjectStore");

    let getData = store.get(String(id));

    getData.onsuccess = function() {
        if (!getData.result) {
            alert('Nie udało się wczytać klienta!');
            return;
        }
        document.getElementById('person-id').value = String(id);
        for (let fieldName of fieldNames) {
            document.getElementById(fieldName).value = getData.result.data[fieldName];
        }
    };

}

function saveClientData() {

    let data = {}
    for (let fieldName of fieldNames) {
        data[fieldName] = document.getElementById(fieldName).value;
    }

    let database = open.result;
    let transaction = database.transaction("MyObjectStore", "readwrite");
    let store = transaction.objectStore("MyObjectStore");

    const id = document.getElementById('person-id').value;
    if (!id) {
        alert('Wpisz nazwę klienta!');
        return;
    }

    store.put({id: id, data: data});

    showPossibleIds();

}

const today = new Date();
const currentWeekMonday = new Date(new Date().setDate(new Date().getDate() - (today.getDay() == 0 ? 6 : today.getDay() - 1)))
const currentWeekFriday = new Date(new Date().setDate(new Date().getDate() - (today.getDay() == 0 ? 2 : today.getDay() - 5)))

document.getElementById('date-limited').min = currentWeekMonday.toLocaleDateString('en-ca');
document.getElementById('date-limited').max = currentWeekFriday.toLocaleDateString('en-ca');

const randomValuesArray = [
    ['safinatka@jamtogel.org', 'pashocek@email-temp.com'],
    ['11-111', '22-222'],
    ['AA1111111111', 'AB1231231231'],
    ['AAA111111', 'BBB123123'],
    ['181.180.154.206', '216.39.25.244'],
    ['https://www.youtube.com/', 'https://www.filmweb.pl/'],
    ['D:\\winnt\\test', 'd:\\msdos'],
    ['D:\\wiNnt\\test', 'd:\\msdOS'],
    ['/etc/aaaa', '/etc/bBbbb'],
    ['da88:d5fa:d823:efe5:1d30:c853:d297:578b', 'c78f:ffb7:e9f4:d28f:ee4b:adce:9122:8402'],
    ['+1 202-918-2132', '+376 690 065 611'],
    ['2022-01-01', '2000-12-24'],
    ['21:21', '11:11'],
    ['10:10 AM', '11:21 PM'],
    ['#e66465', '#f6b73c']
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeInputs() {

    document.getElementById('email').value = randomValuesArray[0][getRandomInt(0, 1)];
    document.getElementById('area-code').value = randomValuesArray[1][getRandomInt(0, 1)];
    document.getElementById('nip').value = randomValuesArray[2][getRandomInt(0, 1)];
    document.getElementById('id').value = randomValuesArray[3][getRandomInt(0, 1)];
    document.getElementById('ipv4').value = randomValuesArray[4][getRandomInt(0, 1)];
    document.getElementById('website').value = randomValuesArray[5][getRandomInt(0, 1)];
    document.getElementById('windows-path-small').value = randomValuesArray[6][getRandomInt(0, 1)];
    document.getElementById('windows-path').value = randomValuesArray[7][getRandomInt(0, 1)];
    document.getElementById('file-path').value = randomValuesArray[8][getRandomInt(0, 1)];
    document.getElementById('ipv6').value = randomValuesArray[9][getRandomInt(0, 1)];
    document.getElementById('phone-number').value = randomValuesArray[10][getRandomInt(0, 1)];
    document.getElementById('date').value = randomValuesArray[11][getRandomInt(0, 1)];
    document.getElementById('date-limited').value = new Date(new Date().setDate(currentWeekMonday.getDate() + getRandomInt(0, 4))).toLocaleDateString('en-ca');
    document.getElementById('time-24').value = randomValuesArray[12][getRandomInt(0, 1)];
    document.getElementById('time-12').value = randomValuesArray[13][getRandomInt(0, 1)];
    document.getElementById('color').value = randomValuesArray[14][getRandomInt(0, 1)];

    validateWindowsPath();
    validateWebsite();

}

function validateWindowsPath() {
    if (document.getElementById('windows-path').value.match(/[a-zA-z]:\\(windows|winnt|win|dos|msdos)(\\\w+)*/i)) {
        document.getElementById('windows-path').setCustomValidity('');
    } else {
        document.getElementById('windows-path').setCustomValidity('Invalid');
    }
}

function validateWebsite() {
    if (document.getElementById('website').value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)) {
        document.getElementById('website').setCustomValidity('');
    } else {
        document.getElementById('website').setCustomValidity('Invalid');
    }
}

let draggableInputElements = Array.from(document.querySelectorAll('.form-input.draggable'));

let draggedElement = null;

function getElemenetAfterDraggedElement(mouseY) {
    const availableElements = draggableInputElements.filter(inputElement => inputElement !== draggedElement)
    return availableElements.reduce((closestElement, availableElement) => {
        const availableElementRectangle = availableElement.getBoundingClientRect();
        const offset = mouseY - availableElementRectangle.top - availableElementRectangle.height / 2;
        return (offset < 0 && offset > closestElement.offset) ? { offset: offset, element: availableElement } : closestElement;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.querySelectorAll('.form-input.draggable').forEach(inputElement => {

    inputElement.addEventListener('dragstart', (event) => {
        inputElement.style.opacity = '0.5';
        inputElement.style.borderStyle = 'dashed';
        draggedElement = inputElement;
    });

    inputElement.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const elementAfterDraggedElement = getElemenetAfterDraggedElement(event.clientY);
        if (elementAfterDraggedElement !== null) {
            document.getElementById('inputs-container').insertBefore(draggedElement, elementAfterDraggedElement);
        }
    });

    inputElement.addEventListener('dragend', (event) => {
        inputElement.style.opacity = '1';
        inputElement.style.borderStyle = 'solid';
    });

});
