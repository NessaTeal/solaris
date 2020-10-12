import 'phaser';

const RADIUS = 50;
const EXPLORATION_SPEED = 40;

export const SHOW_SYSTEM_STATS_EVENT = 'show_system_stats';
export const HIDE_SYSTEM_STATS_EVENT = 'hide_system_stats';
export const UPDATE_SYSTEM_STATS_EVENT = 'system_stats_updated';
export const HABITABLE_AREA_KEY = 'habitable_area';
export const EXPLORABLE_AREA_KEY = 'explorable_area';

export default class PlanetSystem extends Phaser.GameObjects.Container {
  planet: Phaser.GameObjects.Ellipse;
  habitableArea: number;
  explorableArea: number;
  explorationProgress: number;
  shown: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.configurePlanet(scene);
    this.habitableArea = Phaser.Math.Between(100, 200);
    this.explorableArea = Phaser.Math.Between(300, 400);
    this.explorationProgress = 0;
    this.shown = false;
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
      this.shown = true;
      scene.registry.set(HABITABLE_AREA_KEY, this.habitableArea);
      scene.registry.set(EXPLORABLE_AREA_KEY, this.explorableArea);
      scene.events.emit(UPDATE_SYSTEM_STATS_EVENT);
      scene.events.emit(SHOW_SYSTEM_STATS_EVENT);
    });
    this.planet.on('pointerout', () => {
      this.shown = false;
      scene.events.emit(HIDE_SYSTEM_STATS_EVENT);
    });

    this.planet.setInteractive(
      new Phaser.Geom.Circle(RADIUS, RADIUS, RADIUS),
      Phaser.Geom.Circle.Contains,
    );
  }

  update(time: number, delta: number): void {
    if (this.explorableArea === 0) {
      return;
    }

    this.explorationProgress += (EXPLORATION_SPEED * delta) / 1000;

    if (this.explorationProgress > 0) {
      const wholeValue = Math.min(
        Math.floor(this.explorationProgress),
        this.habitableArea,
      );
      this.explorationProgress -= wholeValue;
      this.habitableArea += wholeValue;
      this.explorableArea -= wholeValue;
    }

    if (this.shown) {
      this.scene.registry.set(HABITABLE_AREA_KEY, this.habitableArea);
      this.scene.registry.set(EXPLORABLE_AREA_KEY, this.explorableArea);
      this.scene.events.emit(UPDATE_SYSTEM_STATS_EVENT);
    }
  }
}
