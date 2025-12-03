import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'
import Player from '../entities/Player'
import NPC from '../entities/NPC'

export default class Hallway extends Phaser.Scene {
    private player!: Player

	constructor() {
		super(SceneKeys.Hallway)
	}

    preload() {
        // Load the map (we'll do this in Preloader later, but for now/testing maybe here or just use what's loaded)
        // Actually Preloader is better.
    }

	create() {
        // Create a simple map programmatically for now if CSV isn't ready, 
        // OR load the CSV. Let's assume we load a CSV.
        // For the starter, let's just place tiles manually to ensure it works without complex map parsing first.
        
        // Level bounds
        this.physics.world.setBounds(0, 0, 400, 300)
        
        // Add background (floor)
        // We'll use a tileSprite for the floor
        const floor = this.add.tileSprite(0, 0, 400, 300, 'tiles')
        floor.setOrigin(0, 0)
        
        // Add walls (static group)
        const walls = this.physics.add.staticGroup()
        // Top wall
        walls.create(200, 10, 'tiles').setScale(25, 1).refreshBody() // Placeholder scaling
        // Bottom wall
        walls.create(200, 290, 'tiles').setScale(25, 1).refreshBody()
        
        // Player
        this.player = new Player(this, 100, 150, 'ellie')
        
        // Camera follows player
        this.cameras.main.startFollow(this.player, true)
        
        // Collisions
        this.physics.add.collider(this.player, walls)

        // Doors
        // Bedroom Door (Left)
        const bedroomDoor = this.add.rectangle(50, 150, 32, 32, 0x00ff00)
        this.physics.add.existing(bedroomDoor, true)
        this.physics.add.overlap(this.player, bedroomDoor, () => {
            this.scene.start(SceneKeys.Bedroom)
        })

        // Kitchen Door (Right)
        const kitchenDoor = this.add.rectangle(350, 150, 32, 32, 0x00ff00)
        this.physics.add.existing(kitchenDoor, true)
        this.physics.add.overlap(this.player, kitchenDoor, () => {
            this.scene.start(SceneKeys.Kitchen)
        })

        // Bathroom Door (Bottom)
        const bathroomDoor = this.add.rectangle(200, 250, 32, 32, 0x00ff00)
        this.physics.add.existing(bathroomDoor, true)
        this.physics.add.overlap(this.player, bathroomDoor, () => {
            this.scene.start(SceneKeys.Bathroom)
        })

        // NPCs
        const norbert = new NPC(this, 300, 100, 'norbert')
        const jessie = new NPC(this, 100, 250, 'jessie')
        const jesus = new NPC(this, 350, 250, 'jesus')
        const salo = new NPC(this, 50, 50, 'salo')

        // NPC Interaction
        const npcs = [
            { sprite: norbert, id: 'norbert' },
            { sprite: jessie, id: 'jessie' },
            { sprite: jesus, id: 'jesus' },
            { sprite: salo, id: 'salo' }
        ]

        npcs.forEach(npc => {
            this.physics.add.collider(this.player, npc.sprite, () => {
                // Trigger dialogue on collision/touch
                this.game.events.emit('show-dialogue', { npcId: npc.id })
            })
        })
	}

    update() {
        if (this.player) {
            this.player.update()
        }
    }
}
