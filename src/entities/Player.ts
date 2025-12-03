import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private speed: number = 100

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        
        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys()
        } else {
            // Fallback or error handling if keyboard is not available
            this.cursors = {
                up: { isDown: false } as Phaser.Input.Keyboard.Key,
                down: { isDown: false } as Phaser.Input.Keyboard.Key,
                left: { isDown: false } as Phaser.Input.Keyboard.Key,
                right: { isDown: false } as Phaser.Input.Keyboard.Key,
                space: { isDown: false } as Phaser.Input.Keyboard.Key,
                shift: { isDown: false } as Phaser.Input.Keyboard.Key
            } as any
        }
    }

    update() {
        if (!this.body) return

        const body = this.body as Phaser.Physics.Arcade.Body

        body.setVelocity(0)

        if (this.cursors.left.isDown) {
            body.setVelocityX(-this.speed)
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(this.speed)
        }

        if (this.cursors.up.isDown) {
            body.setVelocityY(-this.speed)
        } else if (this.cursors.down.isDown) {
            body.setVelocityY(this.speed)
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        body.velocity.normalize().scale(this.speed)
    }
}
