/** Client-side of groupchat. */

const urlParts = document.URL.split('/');
const roomName = urlParts[urlParts.length - 1];
const ws = new WebSocket(`ws://localhost:3000/chat/${roomName}`);
// import { rollDice, rollDie } from '/roll';

const name = prompt('Username?');

// TODO: Find proper way to put these functions in seperate folder

const rollDie = (sides) => {
	console.log(sides);
	let result = Math.floor(Math.random() * sides + 1);
	console.log(`${sides}: ${result}`);
	return result;
};

const rollDice = (diceInputObj) => {
	let total = 0;
	const convertKeyToSides = (str) => {
		let sides = +str.substring(1);
		console.log(sides);
		return sides;
	};

	for (let die in diceInputObj) {
		console.log(die);
		let numSides = convertKeyToSides(die);
		let timesToRoll = diceInputObj[die];
		console.log(diceInputObj[die]);
		for (let i = 1; i <= timesToRoll; i++) {
			let res = rollDie(numSides);
			console.log(`${die}: ${res}`);
			let data = { type: 'chat', text: `${die}: ${res}` };
			console.log(data);
			ws.send(JSON.stringify(data));
		}
	}
	return total;
};

/** called when connection opens, sends join info to server. */

ws.onopen = function(evt) {
	console.log('open', evt);

	let data = { type: 'join', name: name };
	ws.send(JSON.stringify(data));
};

/** called when msg received from server; displays it. */

ws.onmessage = function(evt) {
	console.log('message', evt);

	let msg = JSON.parse(evt.data);
	let item;

	if (msg.type === 'note') {
		item = $(`<li><i>${msg.text}</i></li>`);
	} else if (msg.type === 'chat') {
		item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);
	} else if (msg.type === 'roll') {
		item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);
	} else {
		return console.error(`bad message: ${msg}`);
	}

	$('#messages').append(item);
};

/** called on error; logs it. */

ws.onerror = function(evt) {
	console.error(`err ${evt}`);
};

/** called on connection-closed; logs it. */

ws.onclose = function(evt) {
	console.log('close', evt);
};

/** send message when button pushed. */

$('#dice-form').submit(function(evt) {
	evt.preventDefault();
	console.log(evt.target);

	// add logic to count dice here, before roll
	let rollCountMap;
	let rollCountObj = {};
	let diceArr = $.makeArray($('.d'));

	rollCountMap = diceArr.map((d) => {
		if (d.value) {
			rollCountObj[d.id] = +d.value;
			return { [d.id]: +d.value };
		}
	});
	rollDice(rollCountObj);
	console.log(rollCountMap);
	console.log(rollCountObj);

	// for (let d in rollCountObj) {
	// 	console.log([ d ]);
	//   let
	// }

	// for (let d in diceInput) {
	// 	let obj = { name: d.name, value: d.val };
	// 	console.log(obj);
	// }

	// let data = { type: 'chat', text: `${rollCountObj}` };
	// console.log(data);
	// ws.send(JSON.stringify(data));

	$('#m').val('');
});
