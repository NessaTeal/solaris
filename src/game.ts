import 'phaser';
import PlanetSystem from './planet-system';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('demo');
  }

  preload(): void {
    //
  }

  create(): void {
    const planetSystem = new PlanetSystem(this, 100, 100);
    this.add.existing(planetSystem);
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#123456',
  width: 1000,
  height: 1000,
  scene: Demo,
};

new Phaser.Game(config);
