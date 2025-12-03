import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'
import Player from '../entities/Player'

export default class Kitchen extends Phaser.Scene {
    private player!: Player

	constructor() {
		super(SceneKeys.Kitchen)
	}

	create() {
        this.add.text(10, 10, 'Kitchen', { color: '#000' })

        this.physics.world.setBounds(0, 0, 400, 300)
        
        const floor = this.add.tileSprite(0, 0, 400, 300, 'tiles')
        floor.setOrigin(0, 0)
        floor.setTint(0xffcccc)
        
        const walls = this.physics.add.staticGroup()
        walls.create(200, 10, 'tiles').setScale(25, 1).refreshBody()
        walls.create(200, 290, 'tiles').setScale(25, 1).refreshBody()
        
        this.player = new Player(this, 200, 150, 'ellie')
        
        this.cameras.main.startFollow(this.player, true)
        this.physics.add.collider(this.player, walls)
        
        // Door back to Hallway (or wherever it connects)
        const door = this.add.rectangle(350, 150, 32, 32, 0x0000ff)
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
