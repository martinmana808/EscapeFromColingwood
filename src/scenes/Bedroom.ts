import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'
import Player from '../entities/Player'

export default class Bedroom extends Phaser.Scene {
    private player!: Player

	constructor() {
		super(SceneKeys.Bedroom)
	}

	create() {
        this.add.text(10, 10, 'Bedroom', { color: '#000' })

        // Level bounds
        this.physics.world.setBounds(0, 0, 400, 300)
        
        // Background
        const floor = this.add.tileSprite(0, 0, 400, 300, 'tiles')
        floor.setOrigin(0, 0)
        floor.setTint(0xdddddd) // Slightly different tint
        
        // Walls
        const walls = this.physics.add.staticGroup()
        walls.create(200, 10, 'tiles').setScale(25, 1).refreshBody()
        walls.create(200, 290, 'tiles').setScale(25, 1).refreshBody()
        
        // Player
        this.player = new Player(this, 200, 150, 'ellie')
        
        this.cameras.main.startFollow(this.player, true)
        this.physics.add.collider(this.player, walls)
        
        // Door back to Hallway
        const door = this.add.rectangle(50, 150, 32, 32, 0x0000ff)
        this.physics.add.existing(door, true)
        
        this.physics.add.overlap(this.player, door, () => {
            this.scene.start(SceneKeys.Hallway)
        })
	}

    update() {
        if (this.player) {
            this.player.update()
        }
    }
}
