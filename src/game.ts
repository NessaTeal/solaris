import 'phaser';
import { HUD } from './hud';
import PlanetSystem, {
  HIDE_SYSTEM_STATS_EVENT,
  KNOWN_SECTORS_KEY,
  SHOW_SYSTEM_STATS_EVENT,
  UNKNOWN_SECTORS_KEY,
  UPDATE_SYSTEM_STATS_EVENT,
} from './planet-system';
import { ResourceManager } from './resource-manager';

export default class Main extends Phaser.Scene {
  stats: Phaser.GameObjects.Container;
  statsHabitableArea: Phaser.GameObjects.Text;
  statsExplorableArea: Phaser.GameObjects.Text;
  planetSystems: Phaser.GameObjects.Group;
  resourceManager: ResourceManager;
  hud: HUD;

  constructor() {
    super('main');
  }

  preload(): void {
    //
  }

  create(): void {
    this.resourceManager = new ResourceManager(0, this.registry);

    this.planetSystems = new Phaser.GameObjects.Group(this);
    const planetSystem = new PlanetSystem(this, 100, 100);
    planetSystem.setOwner(0);
    this.planetSystems.add(planetSystem, true);
    this.planetSystems.add(new PlanetSystem(this, 400, 400), true);

    const statsHabitableAreaLabel = new Phaser.GameObjects.Text(
      this,
      30,
      0,
      'Known sectors:',
      {
        fontFamily: 'Arial',
        color: '#00ddff',
        fontSize: '18px',
      },
    );
    this.statsHabitableArea = new Phaser.GameObjects.Text(this, 230, 0, '', {
      fontFamily: 'Arial',
      color: '#00ddff',
      fontSize: '18px',
    });

    const statsExplorableAreaLabel = new Phaser.GameObjects.Text(
      this,
      30,
      50,
      'Unknown sectors:',
      {
        fontFamily: 'Arial',
        color: '#00ddff',
        fontSize: '18px',
      },
    );
    this.statsExplorableArea = new Phaser.GameObjects.Text(this, 230, 50, '', {
      fontFamily: 'Arial',
      color: '#00ddff',
      fontSize: '18px',
    });
    this.stats = new Phaser.GameObjects.Container(this, 0, 800, [
      statsHabitableAreaLabel,
      this.statsHabitableArea,
      statsExplorableAreaLabel,
      this.statsExplorableArea,
    ]);
    this.stats.setVisible(false);
    this.add.existing(this.stats);

    this.events.on(UPDATE_SYSTEM_STATS_EVENT, () => {
      this.statsHabitableArea.setText(this.registry.get(KNOWN_SECTORS_KEY));
      this.statsExplorableArea.setText(this.registry.get(UNKNOWN_SECTORS_KEY));
    });
    this.events.on(SHOW_SYSTEM_STATS_EVENT, () => {
      this.stats.setVisible(true);
    });
    this.events.on(HIDE_SYSTEM_STATS_EVENT, () => {
      this.stats.setVisible(false);
    });

    this.hud = new HUD(this, this.resourceManager);
  }

  update(time: number, delta: number): void {
    this.planetSystems.getChildren().forEach((ps) => {
      ps.update(time, delta / 1000);
    });
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#123456',
  width: 1000,
  height: 1000,
  scene: Main,
};

new Phaser.Game(config);
