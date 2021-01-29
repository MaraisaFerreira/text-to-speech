let voiceList = document.querySelector('#voice-list');
let txtInput = document.querySelector('#txt-input');
let btnSpeak = document.querySelector('#btn-speak');

let tts = window.speechSynthesis;
let voices = [];

getVoices();

if (speechSynthesis !== undefined) {
	speechSynthesis.onvoiceschanged = getVoices;
}

btnSpeak.addEventListener('click', () => {
	let toSpeak = new SpeechSynthesisUtterance(txtInput.value);
	let selectedVoice = voiceList.selectedOptions[0].getAttribute('data-name');

	voices.forEach((voice) => {
		if (voice.name === selectedVoice) {
			toSpeak.voice = voice;
		}
	});
	tts.speak(toSpeak);
});

function getVoices() {
	voices = tts.getVoices();
	voiceList.innerHTML = '';
	voices.forEach((voice) => {
		let listItem = document.createElement('option');
		listItem.textContent = voice.name;

		listItem.setAttribute('data-lang', voice.lang);
		listItem.setAttribute('data-name', voice.name);

		voiceList.appendChild(listItem);
	});

	voiceList.selectedIndex = 0;
}
