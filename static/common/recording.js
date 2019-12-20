function confirmDialog(msg) {
	return new Promise(function(resolve, reject) {
		let confirmed = window.confirm(msg);

		return confirmed ? resolve(true) : reject(false);
	});
}

const recordAudio = () =>
	new Promise(async (resolve) => {
		//console.debug('recordAudio:1');
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			const mediaRecorder = new MediaRecorder(stream);
			const audioChunks = [];
			//console.debug('recordAudio:2');
			mediaRecorder.addEventListener('dataavailable', (event) => {
				audioChunks.push(event.data);
			});
			//console.debug('recordAudio:3');
			const start = () => mediaRecorder.start();

			const stop = () =>
				new Promise((resolve) => {
					//console.debug('recordAudio:stop');

					mediaRecorder.addEventListener('stop', () => {
						const audioBlob = new Blob(audioChunks);
						if (null != audioBlob) {
							console.debug('blob is not empty');
						} else {
							console.debug('blob is empty');
						}

						const audioUrl = URL.createObjectURL(audioBlob);
						const audio = new Audio(audioUrl);
						const play = () => audio.play();
						resolve({ audioBlob, audioUrl, play });
					});

					if (mediaRecorder.state == 'recording') {
						mediaRecorder.stop();
					} else {
						alert("recording.js:43:mediaRecorder.state != 'recording' but it should be recording ");
					}
				});
			resolve({ start, stop });
		});
	});

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

/* mouseUp: This version didn't work because getElementByID for the stop button was not found
    I put in a fix, but this should be a todo:
const mouseUp = (elementID) =>
	new Promise((resolve) => document.getElementById(elementID).addEventListener('mouseup', resolve, { once: true })); 

The following line was the original code.
	//const mouseUp = (elementID) => new Promise((resolve) => window.addEventListener('mouseup', resolve, { once: true }));
*/
//const mouseUp = (elementID) => new Promise((resolve) => document.addEventListener('mouseup', resolve, { once: true }));

var listening = false;
var recorder;

const handleAction = async (recordAudioId, recordedAudioFileName, recordButtonId, recordPlayButtonId) => {
	console.debug('handleAction:recordAudioId=' + recordAudioId);
	console.debug('handleAction:recordedAudioFileName=' + recordedAudioFileName);
	console.debug('handleAction:recordButtonId=' + recordButtonId);
	console.debug('handleAction:recordPlayButtonId=' + recordPlayButtonId);

	if (false == listening) {
		listening = true;
		console.debug('setting listening to true');
		console.debug('handleAction:about to recordAudio');
		recorder = await recordAudio();
		console.debug('handleAction:recorder.start()');
		returnLastElementByID(recordButtonId).style.backgroundColor = 'red';
		const dave = await recorder.start();
	} else {
		console.debug('handleAction:about to await recoder.stop()');
		const audio = await recorder.stop();
		returnLastElementByID(recordButtonId).style.backgroundColor = '';
		console.debug('disabling buttons');
		returnLastElementByID(recordPlayButtonId).disabled = true; //finally enable the play button
		returnLastElementByID(recordButtonId).disabled = true; //finally disable the record button

		var url = window.URL.createObjectURL(audio.audioBlob, { type: 'audio/webm' });
		var url2 = window.URL.createObjectURL(audio.audioBlob, { type: 'audio/mp3' });

		//var a1 = new Audio();
		//a1.src = url2;
		//a1.play();

		//create audio element
		tmpAudioElement1 = document.createElement('audio'); //create a new audio element and populate
		tmpAudioElement1.controls = false;
		tmpAudioElement1.id = recordAudioId; //audio_play

		//create source element
		var sourceWebm = document.createElement('source'); //create a new source element and populate
		sourceWebm.src = url;
		sourceWebm.type = 'audio/webm';

		//remove the old audio node
		console.debug('handleAction:myAudioElementParent:append start');
		var myAudioElement = returnLastElementByID(recordAudioId); //get the audio node
		console.debug('handleAction:myAudioElement.id=' + myAudioElement.id);

		var myAudioElementParent = myAudioElement.parentNode; //get the parent node
		console.debug('handleAction:myAudioElementParent.id=' + myAudioElementParent.id);

		myAudioElementParent.removeChild(myAudioElement); //remove the child(audio) from the parent
		console.debug('handleAction:myAudioElementParent.removeChild complete');

		myAudioElementParent.appendChild(tmpAudioElement1); //now add the new audio child
		myAudioElement = returnLastElementByID(recordAudioId);
		myAudioElement.append(sourceWebm);
		console.debug('handleAction:myAudioElementParent.append complete');

		console.debug('handleAction:download the webm file');
		const a = document.createElement('a');
		a.style.display = 'none';
		a.onclick = 'return false';
		console.debug('url=' + url);
		a.href = url;
		console.debug('a.href=' + a.href);
		a.download = recordedAudioFileName + '.webm';
		console.debug('a.download=' + a.download);
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
			console.debug('handleAction:File Should now Be Saved as:' + recordedAudioFileName + '.webm');

			console.debug('handleAction:download the mp3 file');
			const b = document.createElement('a');
			b.style.display = 'none';
			b.onclick = 'return false';
			console.debug('url2=' + url2);
			b.href = url2;
			console.debug('b.href=' + b.href);
			b.download = recordedAudioFileName + '.mp3';
			console.debug('b.download=' + b.download);
			document.body.appendChild(b);
			b.click();
			setTimeout(() => {
				document.body.removeChild(b);
				window.URL.revokeObjectURL(url2);
				console.debug('handleAction:File Should now Be Saved as:' + recordedAudioFileName + '.mp3');
				returnLastElementByID(recordPlayButtonId).disabled = false; //finally enable the play button
				returnLastElementByID(recordButtonId).disabled = false; //finally disable the record button
				listening = false; //you can listen again
			}, 1000);
		}, 1000);
	}
};

function pauseOthersAndTogglePlay(id) {
	console.debug('pauseOthersAndTogglePlay: starting - note: has callback method');

	//helper method to enable sleep using a callback
	//https://flaviocopes.com/javascript-sleep/
	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	console.debug('get the audio element you will want to play and load it');
	var ele = returnLastElementByID(id);
	if (!ele.readyState) {
		console.debug('pauseOthersAndTogglePlay:if !ele.readyState: try and load it');
		console.debug('pauseOthersAndTogglePlay:if !ele.readyState:id=' + ele.getAttribute('id'));
		ele.load();
		console.debug('pauseOthersAndTogglePlay:if: ele.load was executed');
	}

	console.debug('stopping all other audio from playing');
	var sounds = document.getElementsByTagName('audio');
	for (i = 0; i < sounds.length; i++) {
		if (sounds[i].id != id) {
			sounds[i].pause();
			sounds[i].currentTime = 0;
			console.debug('pauseOthersAndTogglePlay:stopping:=' + sounds[i].id);
		}
	}
	//console.debug("if ready, toggle the play state, else try waiting for load");
	if (ele.readyState) {
		// console.debug('pauseOthersAndTogglePlay:if(ele.readyState)=true');
		if (!ele.paused) {
			ele.pause();
		} else {
			ele.play();
		}
	} else {
		var sleeptime = 2000;
		console.debug(
			'pauseOthersAndTogglePlay:The element is not ready, I will wait for ' +
				sleeptime +
				' and try to play it again'
		);
		sleep(sleeptime).then(() => {
			//console.debug('sleep(' + sleeptime + ') complete');
			if (ele.readyState) {
				//console.debug('pauseOthersAndTogglePlay:Done Sleeping and the element is now ready');
				var temp = ele.id + '_pb';
				ele.play();
			} else {
				//console.debug('pauseOthersAndTogglePlay:Done Sleeping and the element is still not ready, give an error message');
				console.debug('pauseOthersAndTogglePlay:Error: Cannot play \n' + ele.src + '\n as it was not loaded');

				console.debug('pauseOthersAndTogglePlay:disable the play button IF it is there');
				var playButtonElement = ele.id + '_pb';
				if (null != returnLastElementByID(playButtonElement)) {
					console.debug('pauseOthersAndTogglePlay:disabling play button');
					returnLastElementByID(playButtonElement).disabled = true;
				} else {
					console.debug('pauseOthersAndTogglePlay:playButtonElement is null, so not disabling it');
				}
			}
		});
	}
}

//created this function to disable the record button,
//needed a special function since our tool creates a duplicate ID (so we cannot just set one, we need to set both)
function returnLastElementByID(id) {
	var querySelector = '[id="' + id + '"]';
	console.debug('returnLastElementByID:querySelector=' + querySelector);

	var elms = document.querySelectorAll(querySelector);
	if (elms.length > 0) {
		console.debug('returnLastElementByID:returning a elm');
		return elms[elms.length - 1];
	} else {
		console.debug('returnLastElementByID:returning null');
		return null;
	}
}

//created this function to disable the record button,
//needed a special function since our tool creates a duplicate ID (so we cannot just set one, we need to set both)
function disableElements(id) {
	var querySelector = '[id="' + id + '"]';
	//console.debug('disableElements:querySelector=' + querySelector);

	var elms = document.querySelectorAll(querySelector);
	for (var i = 0; i < elms.length; i++) {
		//console.debug('disableElements:disabling one of the values found');
		//elms[i].style.display = 'none'; // <-- whatever you need to do here.
		elms[i].disabled = true;
	}
}

// ------------------------------------------------------------------------
selection_error_message =
	"Couldn't retrieve the selected text. \nNote: Speechy won't work on PDFs, urls starts with chrome:// and Chrome app store, because of the limit of Chrome's API.";

const recordGoogleReading = async (paragraphID, googleAudioId, googleAudioFileName, googleVoiceChoice) => {
	console.debug('recordGoogleReading:paragraphID=' + paragraphID);
	console.debug('recordGoogleReading:googleAudioID=' + googleAudioId);
	console.debug('recordGoogleReading:googleAudioFileName=' + googleAudioFileName);

	var currentVoice;
	if (null != googleVoiceChoice && '' != googleVoiceChoice) {
		currentVoice = googleVoiceChoice;
		console.debug('recordGoogleReading:currentVoice=' + currentVoice);
	} else {
		currentVoice = 'en-US-Standard-B';
		console.debug('recordGoogleReading:currentVoice was empty, setting it to default value=' + currentVoice);
	}
	var api_provider = 'google';
	var api_key = '';
	if ('' == api_provider) {
		api_provider = prompt('Enter your TTS API_Provider', 'google');
	}
	if ('' == api_key) {
		api_key = prompt('Enter your API_Key', '');
	}
	if ('' == api_provider || '' == api_key) {
		alert('recordGoogleReading:api_provider or api_key is empty, cannot use google voice');
	} else {
		var text = document.getElementById(paragraphID).innerText;
		console.debug('recordGoogleReading=' + text);
		var endpoint = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + api_key;
		var language = currentVoice.split('-').slice(0, 2).join('-');
		var speed = 1;
		returnLastElementByID(recordPlayButtonId).disabled = true; //finally enable the play button
		returnLastElementByID(recordButtonId).disabled = true; //finally disable the record button
		fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify({
				input: { text: text },
				voice: { name: currentVoice, languageCode: language },
				audioConfig: { audioEncoding: 'LINEAR16', speakingRate: speed }
			})
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((json) => {
						audio_string = json.audioContent;
						console.debug('debug:text=' + text);

						var speaker = returnLastElementByID(googleAudioId);
						speaker.src = 'data:audio/wav;base64,' + audio_string;
						//warning, the speaker.play causes a problem on the replay feature speaker.play();
						var bin = atob(audio_string.replace(/^.*,/, ''));
						var buffer = new Uint8Array(bin.length);
						for (var i = 0; i < bin.length; i++) {
							buffer[i] = bin.charCodeAt(i);
						}

						var url = window.URL.createObjectURL(new Blob([ buffer.buffer ], { type: 'audio/wav' }));
						var a = document.createElement('a');
						a.style.display = 'none';
						a.onclick = 'return false';
						console.debug('url=' + url);
						a.href = url;
						console.debug('a.href=' + a.href);
						a.download = googleAudioFileName + '.wav';
						console.debug('a.download=' + a.download);
						document.body.appendChild(a);
						a.click();
						setTimeout(() => {
							document.body.removeChild(a);
							window.URL.revokeObjectURL(url);
							var speaker2 = returnLastElementByID(googleAudioId);
							speaker2.src = 'data:audio/webm;base64,' + audio_string;
							// //warning, the speaker.play causes a problem on the replay feature speaker.play();

							var url2 = window.URL.createObjectURL(new Blob([ buffer.buffer ], { type: 'audio/webm' }));
							var a2 = document.createElement('a');

							a2.style.display = 'none';
							a2.onclick = 'return false';
							console.debug('url2=' + url2);
							a2.href = url2;
							console.debug('a2.href=' + a2.href);
							a2.download = googleAudioFileName + '.webm';
							console.debug('a2.download=' + a2.download);
							document.body.appendChild(a2);
							a2.click();
							setTimeout(() => {
								document.body.removeChild(a2);
								window.URL.revokeObjectURL(url2);
							}, 1000);
							returnLastElementByID(recordPlayButtonId).disabled = false; //finally enable the play button
							returnLastElementByID(recordButtonId).disabled = false; //finally disable the record button
						}, 1000);
					});
				} else {
					res.json().then(google_cloud_tts_error_handler);
				}
			})
			.catch(function(err) {
				console.error(err);
				alert('Error using GoogleVoices (likely missing api_key), see console for details.');
			});
	}
};

// function playvoice(audio_string, text) {
// 	alert(text);

// 	var speaker = returnLastElementByID(recordAudioId); //get the audio node

// 	speaker.src = 'data:audio/wav;base64,' + audio_string;
// 	speaker.play();

// 	// var bin = atob(audio_string.replace(/^.*,/, ''));
// 	// var buffer = new Uint8Array(bin.length);
// 	// for (var i = 0; i < bin.length; i++) {
// 	// 	buffer[i] = bin.charCodeAt(i);
// 	// }

// 	// var blobURL = window.URL.createObjectURL(new Blob([ buffer.buffer ], { type: 'audio/wav' }));
// 	// var a = document.createElement('a');
// 	// a.download = 'file.wav';
// 	// a.href = blobURL;
// 	// a.click();
// }

function google_cloud_tts_error_handler(err) {
	try {
		alert(
			'Error from Google Cloud Text-to-Speech API\nCode: ' +
				err.error.code +
				'\nMessage: ' +
				err.error.message +
				'\nPlease check the options.'
		);
	} catch (e) {
		alert('Something went wrong. Please check settings.');
	}
	console.error(err);
}
//todo: https://cloud.google.com/text-to-speech/docs/voices
// function get_chosen_provider_options(api_provider) {
// 	if (api_provider == '' || api_provider == 'Google') {
// 		return {
// 			//todo: voice: 'en-US-Standard-B',
// 			voice: currentVoice,
// 			speed: '1.0'
// 		};
// 	}
// }
