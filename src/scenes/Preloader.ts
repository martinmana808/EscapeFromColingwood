import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'

export default class Preloader extends Phaser.Scene {
	constructor() {
		super(SceneKeys.Preloader)
	}

	preload() {
        // Create a simple loading bar
        const width = this.cameras.main.width
        const height = this.cameras.main.height
        
        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50)
        
        this.load.on('progress', (value: number) => {
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30)
        })
        
        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
        })

		// Load assets
        this.load.setPath('assets')
        
        // Placeholder assets (we will generate these)
        this.load.svg('tiles', 'tilesets/interior.svg', { width: 32, height: 32 })
        this.load.svg('ellie', 'sprites/ellie.svg', { width: 32, height: 32 })
        // this.load.image('martin', 'sprites/martin.png')
        this.load.svg('norbert', 'sprites/norbert.svg', { width: 32, height: 32 })
        this.load.svg('jessie', 'sprites/jessie.svg', { width: 32, height: 32 })
        this.load.svg('jesus', 'sprites/jesus.svg', { width: 32, height: 32 })
        this.load.svg('salo', 'sprites/salo.svg', { width: 32, height: 32 })
        
        // Load dialogue data
        this.load.json('dialogue', 'data/dialogue.json')
	}

	create() {
		this.scene.start(SceneKeys.Game)
	}
}
