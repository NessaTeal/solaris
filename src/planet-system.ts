import 'phaser';

const RADIUS = 50;

export const SHOW_SYSTEM_STATS_EVENT = 'show_system_stats';
export const HIDE_SYSTEM_STATS_EVENT = 'hide_system_stats';
export const HABITABLE_AREA_KEY = 'habitable_area';
export const EXPLORABLE_AREA_KEY = 'explorable_area';

export default class PlanetSystem extends Phaser.GameObjects.Container {
  planet: Phaser.GameObjects.Ellipse;
  habitableArea: number;
  explorableArea: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.configurePlanet(scene);
    this.habitableArea = Phaser.Math.Between(100, 200);
    this.explorableArea = Phaser.Math.Between(300, 400);
  }

  configurePlanet(scene: Phaser.Scene): void {
    this.planet = new Phaser.GameObjects.Ellipse(
      scene,
      0,
      0,
      RADIUS * 2,
      RADIUS * 2,
      0x00a050,
    );
    this.add(this.planet);

    this.planet.on(
      'pointerdown',
      () => {
        alert('Click');
      },
      scene,
    );

    this.planet.on('pointerover', () => {
      scene.registry.set(HABITABLE_AREA_KEY, this.habitableArea);
      scene.registry.set(EXPLORABLE_AREA_KEY, this.explorableArea);
      scene.events.emit(SHOW_SYSTEM_STATS_EVENT);
    });
    this.planet.on('pointerout', () => {
      scene.events.emit(HIDE_SYSTEM_STATS_EVENT);
    });

    this.planet.setInteractive(
      new Phaser.Geom.Circle(RADIUS, RADIUS, RADIUS),
      Phaser.Geom.Circle.Contains,
    );
  }
}
