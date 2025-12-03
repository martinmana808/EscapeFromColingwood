import Phaser from 'phaser'
import Boot from './scenes/Boot'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import UI from './scenes/UI'
import Hallway from './scenes/Hallway'

import Bedroom from './scenes/Bedroom'
import Kitchen from './scenes/Kitchen'
import Bathroom from './scenes/Bathroom'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 400, // Small resolution for pixel art feel (zoom handled by canvas or camera)
	height: 300,
    zoom: 2,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0, x: 0 }, // Top down, no gravity
			debug: true // Enable debug for now
		}
	},
    pixelArt: true, // Critical for pixel art look
	scene: [Boot, Preloader, Game, UI, Hallway, Bedroom, Kitchen, Bathroom],
    parent: 'app'
}

export default new Phaser.Game(config)
