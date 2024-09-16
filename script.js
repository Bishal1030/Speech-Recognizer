const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
texts.appendChild(p);

recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    p.innerText = text;

    if (e.results[0].isFinal) {
        const normalizedText = text.trim().toLowerCase();

        if (normalizedText.includes('hello')) {
            p = document.createElement('p');
            p.classList.add('replay');
            p.innerText = 'Hi';
            texts.appendChild(p);
        }

        if (normalizedText.includes('open my youtube channel')) {
            p = document.createElement('p');
            p.classList.add('replay');
            p.innerText = 'Opening your channel';
            texts.appendChild(p);
            
            window.open('https://www.youtube.com');// Or use window.open
        }

        p = document.createElement('p');
        texts.appendChild(p);
    }

    console.log(e);
});

recognition.addEventListener('end', () => {
    recognition.start();
});

recognition.addEventListener('error', (e) => {
    console.error('Speech recognition error detected: ', e.error);
});

recognition.start();
