require('./commands.js');

mp.events.add('playerJoin', player => {
	player.spawn(new mp.Vector3(-425.517, 1123.62, 325.854)); // приклад координат
	player.outputChatBox('Ласкаво просимо на сервер! Машина біля тебе.');
});

// Створюємо машину біля точки спавну
mp.vehicles.new(
	mp.joaat('infernus'), // модель машини (Infernus)
	new mp.Vector3(-430.0, 1120.0, 325.0), // координати біля спавну
	{
		heading: 90, // кут повороту
		color: [
			[255, 0, 0],
			[0, 0, 0],
		], // кольори
		numberPlate: 'TEST',
	}
);
