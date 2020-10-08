import 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('demo');
  }

  preload(): void {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create(): void {
    this.add.image(206, 46, 'logo');
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#123456',
  width: 413,
  height: 93,
  scene: Demo,
};

new Phaser.Game(config);
