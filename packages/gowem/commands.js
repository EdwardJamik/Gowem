// Команда: /sellcar
mp.events.addCommand('sellcar', (player, fullText) => {
	// fullText може бути ціною, наприклад: /sellcar 5000
	let price = fullText.trim() || 'Договірна';

	// Координати гравця
	const pos = player.position;

	// Створюємо авто біля гравця
	const vehicle = mp.vehicles.new(
		mp.joaat('infernus'), // модель машини
		new mp.Vector3(pos.x + 2, pos.y, pos.z), // спавнимо поруч
		{
			heading: player.heading,
			color: [
				[255, 0, 0],
				[0, 0, 0],
			],
			numberPlate: 'SELL',
		}
	);

	// Додаємо 3D текст над авто
	const text = mp.labels.new(
		`🚗 Продається авто\nЦіна: ${price}$`,
		new mp.Vector3(pos.x + 2, pos.y, pos.z + 1.5), // трохи вище машини
		{
			los: false,
			font: 0,
			drawDistance: 20,
			color: [255, 255, 255, 255],
			dimension: 0,
		}
	);

	// Зберігаємо посилання, щоб потім видаляти текст разом із авто
	vehicle.customText = text;

	player.outputChatBox(`Машина створена з ціною: ${price}$`);
});

// При видаленні машини — видаляємо текст
mp.events.add('entityDestroy', entity => {
	if (entity.type === 'vehicle' && entity.customText) {
		entity.customText.destroy();
	}
});

mp.events.addCommand('car', (player, fullText, model) => {
	if (!model) return player.outputChatBox('Використання: /car [model]');
	player.spawnNewVehicle(model.toLowerCase());
});

mp.Player.prototype.spawnNewVehicle = function (model) {
	if (this.vehicle) this.vehicle.destroy();
	const pos = this.position;
	this.vehicle = mp.vehicles.new(
		mp.joaat(model),
		new mp.Vector3(pos.x + 2, pos.y, pos.z),
		{
			numberPlate: 'CUSTOM',
			color: [
				[255, 0, 0],
				[0, 0, 255],
			],
		}
	);
	this.putIntoVehicle(this.vehicle, -1);
};
