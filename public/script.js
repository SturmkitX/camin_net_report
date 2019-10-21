document.addEventListener('load', () => {
    const btn = document.getElementById('contact-submit');
    btn.addEventListener('click', sendData);
});

function sendData() {
    const data = {
        name: document.getElementById('nameField').value,
        room: document.getElementById('roomField').value,
        description: document.getElementById('contentField').value
    };

    const req = new XMLHttpRequest();
    req.setRequestHeader('Content-Type', 'application/json');
    req.open('POST', '/api');
    req.onload = () => {
        if (req.responseText === 'OK') {
            window.alert('Plangerea a fost depusa');
        } else {
            window.alert('Problema cu serverul. Incearca mai tarziu...')
        }
    };

    req.send(JSON.stringify(data));
}
