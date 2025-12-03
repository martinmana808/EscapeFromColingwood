import Phaser from 'phaser'

export default class DialogueSystem {
    private scene: Phaser.Scene
    private dialogueData: any
    private textObject!: Phaser.GameObjects.Text
    private background!: Phaser.GameObjects.Rectangle
    private container!: Phaser.GameObjects.Container

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        
        // Load dialogue data (assuming it's loaded in Preloader)
        this.dialogueData = scene.cache.json.get('dialogue')
        
        this.createUI()
    }

    private createUI() {
        const width = this.scene.cameras.main.width
        const height = this.scene.cameras.main.height
        
        // Background box
        this.background = this.scene.add.rectangle(0, 0, width - 40, 80, 0x000000, 0.8)
        this.background.setStrokeStyle(2, 0xffffff)
        
        // Text
        this.textObject = this.scene.add.text(- (width - 60) / 2, -30, '', {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '12px',
            color: '#ffffff',
            wordWrap: { width: width - 60 }
        })
        
        this.container = this.scene.add.container(width / 2, height - 50, [this.background, this.textObject])
        this.container.setScrollFactor(0) // Fixed to camera
        this.container.setVisible(false)
    }

    public showDialogue(npcId: string, key: string = 'default') {
        if (!this.dialogueData || !this.dialogueData[npcId]) return

        const lines = this.dialogueData[npcId][key]
        const randomLine = Phaser.Utils.Array.GetRandom(lines)
        
        this.textObject.setText(`${npcId.toUpperCase()}: ${randomLine}`)
        this.container.setVisible(true)

        // Auto-hide after 3 seconds for now, or wait for input
        this.scene.time.delayedCall(3000, () => {
            this.hideDialogue()
        })
    }

    public hideDialogue() {
        this.container.setVisible(false)
    }
}
