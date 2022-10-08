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
    ['+1 202-918-2132', '+376 690 065 611']
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
}

function validateWindowsPath() {
    if (document.getElementById('windows-path').value.match(/[a-zA-z]:\\(windows|winnt|win|dos|msdos)(\\\w+)*/i)) {
        document.getElementById('windows-path').setCustomValidity("");
    } else {
        document.getElementById('windows-path').setCustomValidity("Invalid");
    }
}