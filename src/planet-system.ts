import 'phaser';

const RADIUS = 50;

export default class PlanetSystem extends Phaser.GameObjects.Ellipse {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, RADIUS * 2, RADIUS * 2, 0x00a050);
    this.on(
      'pointerdown',
      () => {
        alert('Click');
      },
      scene,
    );
    this.setInteractive(
      new Phaser.Geom.Circle(x - RADIUS, y - RADIUS, RADIUS),
      Phaser.Geom.Circle.Contains,
    );
  }
}
