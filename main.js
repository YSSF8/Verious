function dateTime() {
    let time = new Date();
    let hours = addZero(time.getHours());
    let minutes = addZero(time.getMinutes());

    document.querySelector('.hrs').innerHTML = hours;
    document.querySelector('.mins').innerHTML = minutes;

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }
}

setInterval(dateTime, 200);

const timer = document.querySelector('h1');
const lockBtn = document.querySelector('.lock-btn');
const content = document.querySelector('.content');

lockBtn.addEventListener('click', () => {
    timer.style.margin = '0';
    timer.style.fontSize = '32px';

    setTimeout(() => {
        lockBtn.style.opacity = 0;
        lockBtn.style.pointerEvents = 'none';

        content.style.opacity = 1;
        content.style.pointerEvents = 'all';
    }, 200);
});

const ipt = document.querySelector('.terminal input'), opt = document.querySelector('.terminal textarea');
const terminal = document.querySelector('.terminal-icon');
const ipAddress = document.querySelector('.weather pre b');

document.addEventListener('keypress', () => {
    if (event.keyCode == 13) {
        lockBtn.click();
    }

    if (event.keyCode == 13 && ipt.value == 'restart') {
        location.reload();
    } else if (event.keyCode == 13 && ipt.value == '') {
        opt.value += '';
    } else if (event.keyCode == 13 && ipt.value == 'cls' || event.keyCode == 13 && ipt.value == 'clear') {
        opt.value = '';
        ipt.value = '';
    } else if (event.keyCode == 13 && ipt.value == 'echo') {
        let msg = prompt('Message');
        opt.value += msg + '\n\n';
        ipt.value = '';
        opt.scrollTop = opt.scrollHeight;
    } else if (event.keyCode == 13 && ipt.value == 'ip') {
        opt.value += ipAddress.innerHTML + '\n\n';
        ipt.value = '';
        opt.scrollTop = opt.scrollHeight;
    } else if (event.keyCode == 13 && ipt.value == 'shutdown') {
        window.close();
    } else if (event.keyCode == 13 && ipt.value == 'exit') {
        terminal.click();
        ipt.value = '';
    } else if (event.keyCode == 13 && ipt.value == 'help') {
        opt.value += 'restart: restarts the OS.\ncls/clear: clears the console.\necho: shows up a message on the console.\nip: shows up your IP address.\nexit: closes the terminal.\nhelp: shows up the list of the commands.\n\n';
        ipt.value = '';
        opt.scrollTop = opt.scrollHeight;
    } else if (event.keyCode == 13) {
        opt.value += `'${ipt.value}' is not recognized as an internal or external command.\n\n`;
        ipt.value = '';
        opt.scrollTop = opt.scrollHeight;
    }
});

document.querySelector('.weather-icon').addEventListener('click', () => {
    document.querySelector('.weather').classList.toggle('opened');
});

terminal.addEventListener('click', () => {
    const terminalTransition = document.querySelector('.terminal');
    terminalTransition.classList.toggle('opened');

    if (terminalTransition.classList.contains('opened')) {
        ipt.focus();
    } else {
        document.body.focus();
        opt.value = '';
    }
});


document.querySelector('.google-icon').addEventListener('click', () => {
    document.querySelector('iframe').classList.toggle('opened');
});

const ctx = document.querySelector('.ctx-menu');

document.addEventListener('contextmenu', e => {
    e.preventDefault();

    let x = e.clientX, y = e.clientY;
    ctx.style.left = x + 'px';
    ctx.style.top = y + 'px';
    ctx.classList.add('active');
});

document.addEventListener('click', () => {
    ctx.classList.remove('active');
});

async function ipApi() {
    const response = await fetch('https://api64.ipify.org/?format=json'), data = await response.json();

    ipAddress.innerHTML = data.ip;
}

ipApi();

const weatherInput = document.querySelector('.weather .weather-form input'),
    weatherBtn = document.querySelector('.weather .weather-form button');

weatherBtn.addEventListener('click', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&appid=50a7aa80fa492fa92e874d23ad061374`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.weather .occ-overview .weather-desc .main').innerHTML = data['weather'][0]['main'];
            document.querySelector('.weather .occ-overview .weather-desc .desc').innerHTML = ', ' + data['weather'][0]['description'];

            document.querySelector('.weather .occ-overview .wind-desc .deg').innerHTML = 'deg - ' + data['wind']['deg'];
            document.querySelector('.weather .occ-overview .wind-desc .gust').innerHTML = ', gust - ' + data['wind']['gust'];
            document.querySelector('.weather .occ-overview .wind-desc .speed').innerHTML = ', speed - ' + data['wind']['speed'];

            if (weatherInput.value == 'Israel') {
                alert('Did you mean "Trash"?');
            }
        })
        .catch(() => {
            alert(`Location "${weatherInput.value}" not found!\nDouble check the word, may you have entered the name wrong`);
        });
});