const rollDie = (obj) => {
	let sides = +Object.keys(obj)[0];
	console.log(sides);
	result = Math.floor(Math.random() * sides + 1);
	console.log(result);
	return result;
};

const rollDice = (arr) => {
	let total = 0;
	for (let die in arr) {
		total += rollDie(die);
	}
	return total;
};

// export { rollDice, rollDie };
