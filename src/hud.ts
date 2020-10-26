import { ResourceManager } from './resource-manager';

export const UPDATE_HUD_EVENT = 'UPDATE_HUD_EVENT';

export class HUD extends Phaser.GameObjects.Container {
  food: Phaser.GameObjects.Text;
  industry: Phaser.GameObjects.Text;
  resourceManager: ResourceManager;

  constructor(scene: Phaser.Scene, resourceManager: ResourceManager) {
    super(scene, 0, 0);
    this.resourceManager = resourceManager;

    const foodLabel = new Phaser.GameObjects.Text(scene, 30, 0, 'Food:', {
      fontFamily: 'Arial',
      color: '#00ddff',
      fontSize: '18px',
    });
    this.food = new Phaser.GameObjects.Text(scene, 230, 0, '0', {
      fontFamily: 'Arial',
      color: '#00ddff',
      fontSize: '18px',
    });

    const industryLabel = new Phaser.GameObjects.Text(
      scene,
      30,
      50,
      'Industry:',
      {
        fontFamily: 'Arial',
        color: '#00ddff',
        fontSize: '18px',
      },
    );
    this.industry = new Phaser.GameObjects.Text(scene, 230, 50, '0', {
      fontFamily: 'Arial',
      color: '#00ddff',
      fontSize: '18px',
    });

    this.add([foodLabel, this.food, industryLabel, this.industry]);
    scene.add.existing(this);

    scene.events.on(UPDATE_HUD_EVENT, () => {
      this.food.setText(Math.floor(resourceManager.getFood()).toString());
      this.industry.setText(
        Math.floor(resourceManager.getIndustry()).toString(),
      );
    });
  }
}
