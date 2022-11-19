
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

let open = indexedDB.open('MyDatabase', 1);

open.onupgradeneeded = function() {
    let db = open.result;
    let store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    let index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("NameIndex");

    // Add some data
    store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
    store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
    
    // Query the data
    var getJohn = store.get(12345);
    var getBob = index.get(["Smith", "Bob"]);

    getJohn.onsuccess = function() {
        console.log(getJohn.result.name.first);  // => "John"
    };

    getBob.onsuccess = function() {
        console.log(getBob.result.name.first);   // => "Bob"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}

function saveData() {
    
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

function randomValues() {
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
}

function validateWindowsPath() {
    if (document.getElementById('windows-path').value.match(/[a-zA-z]:\\(windows|winnt|win|dos|msdos)(\\\w+)*/i)) {
        document.getElementById('windows-path').setCustomValidity("");
    } else {
        document.getElementById('windows-path').setCustomValidity("Invalid");
    }
}

function validateWebsite() {
    if (document.getElementById('website').value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)) {
        document.getElementById('website').setCustomValidity("");
    } else {
        document.getElementById('website').setCustomValidity("Invalid");
    }
}

let draggedElement = null;

document.querySelectorAll('.input-container').forEach(inputContainer => {

    inputContainer.addEventListener('dragstart', (event) => {

        inputContainer.style.opacity = '0.5';

        event.dataTransfer.effectAllowed = 'move';

        draggedElement = inputContainer;
        event.dataTransfer.setData('text/html', inputContainer.innerHTML);
        
    });

    inputContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    inputContainer.addEventListener('drop', (event) => {

        event.preventDefault();

        if (inputContainer !== draggedElement) {
            draggedElement.innerHTML = inputContainer.innerHTML;
            inputContainer.innerHTML = event.dataTransfer.getData('text/html');
        }
        
    });

    inputContainer.addEventListener('dragend', (event) => {
        inputContainer.style.opacity = '1';
    });

});