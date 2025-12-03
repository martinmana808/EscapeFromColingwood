import Phaser from 'phaser'
import { SceneKeys } from '../consts/SceneKeys'
import DialogueSystem from '../systems/DialogueSystem'

export default class UI extends Phaser.Scene {
    private dialogueSystem!: DialogueSystem

	constructor() {
		super(SceneKeys.UI)
	}

	create() {
        this.add.text(10, 10, 'Boarding House Valley', {
            fontSize: '16px',
            fontFamily: '"Press Start 2P", cursive', // Assuming a pixel font or fallback
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        })

        this.dialogueSystem = new DialogueSystem(this)

        // Listen for dialogue events from other scenes
        this.game.events.on('show-dialogue', (data: { npcId: string, key?: string }) => {
            this.dialogueSystem.showDialogue(data.npcId, data.key)
        })
	}
}
