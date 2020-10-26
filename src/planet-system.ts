import 'phaser';
import { UPDATE_HUD_EVENT } from './hud';
import { RESOURCE_MANAGER_KEY } from './resource-manager';
import PlanetSector from './sector';

const RADIUS = 50;
const EXPLORATION_SPEED = 1;

export const SHOW_SYSTEM_STATS_EVENT = 'show_system_stats';
export const HIDE_SYSTEM_STATS_EVENT = 'hide_system_stats';
export const UPDATE_SYSTEM_STATS_EVENT = 'system_stats_updated';
export const KNOWN_SECTORS_KEY = 'known_sectors';
export const UNKNOWN_SECTORS_KEY = 'unknown_sectors';

export default class PlanetSystem extends Phaser.GameObjects.Container {
  planet: Phaser.GameObjects.Ellipse;
  explorationProgress: number;
  shown: boolean;
  unknownSectors: PlanetSector[];
  knownSectors: PlanetSector[];
  owner: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.configurePlanet(scene);
    this.unknownSectors = PlanetSector.generatePlanetSectors(200, 3);

    this.knownSectors = [];
    this.explorationProgress = 0;
    this.shown = false;
    this.owner = null;
  }

  setOwner(player: number): void {
    this.owner = player;
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
      scene.registry.set(KNOWN_SECTORS_KEY, this.knownSectors.length);
      scene.registry.set(UNKNOWN_SECTORS_KEY, this.unknownSectors.length);
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
    if (this.owner === null) {
      return;
    }

    if (this.unknownSectors.length !== 0) {
      this.explorationProgress += EXPLORATION_SPEED * delta;

      if (this.explorationProgress > 0) {
        const wholeValue = Math.min(
          Math.floor(this.explorationProgress),
          this.unknownSectors.length,
        );
        this.explorationProgress -= wholeValue;
        this.knownSectors.push(...this.unknownSectors.splice(0, wholeValue));
      }

      if (this.shown) {
        this.scene.registry.set(KNOWN_SECTORS_KEY, this.knownSectors.length);
        this.scene.registry.set(
          UNKNOWN_SECTORS_KEY,
          this.unknownSectors.length,
        );
        this.scene.events.emit(UPDATE_SYSTEM_STATS_EVENT);
      }
    }

    this.knownSectors
      .filter((s) => s.isActive)
      .forEach((s) =>
        s.update(
          delta,
          this.scene.registry.get(RESOURCE_MANAGER_KEY + this.owner),
        ),
      );

    this.scene.events.emit(UPDATE_HUD_EVENT);
  }
}
