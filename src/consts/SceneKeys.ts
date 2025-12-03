export const SceneKeys = {
	Boot: 'boot',
	Preloader: 'preloader',
	Game: 'game',
	UI: 'ui',
	Hallway: 'hallway',
	Bedroom: 'bedroom',
	Kitchen: 'kitchen',
	Bathroom: 'bathroom'
} as const

export type SceneKey = typeof SceneKeys[keyof typeof SceneKeys]
