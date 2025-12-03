import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'

export default class Boot extends Phaser.Scene {
	constructor() {
		super(SceneKeys.Boot)
	}

	preload() {
		// Load minimal assets for the preloader (e.g. loading bar)
        // For now, we just have a simple colored bar, so no assets needed
	}

	create() {
		this.scene.start(SceneKeys.Preloader)
	}
}
