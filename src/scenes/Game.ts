import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'

export default class Game extends Phaser.Scene {
	constructor() {
		super(SceneKeys.Game)
	}

	create() {
        // Start the UI scene in parallel
		this.scene.launch(SceneKeys.UI)
        
        // Start the initial zone (Hallway)
        this.scene.start(SceneKeys.Hallway)
	}
}
