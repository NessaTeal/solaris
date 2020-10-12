import 'phaser';
import PlanetSystem, {
  EXPLORABLE_AREA_KEY,
  HABITABLE_AREA_KEY,
  HIDE_SYSTEM_STATS_EVENT,
  SHOW_SYSTEM_STATS_EVENT,
} from './planet-system';

export default class Main extends Phaser.Scene {
  stats: Phaser.GameObjects.Container;
  statsHabitableArea: Phaser.GameObjects.Text;
  statsExplorableArea: Phaser.GameObjects.Text;
  planetSystems: Phaser.GameObjects.Group;

  constructor() {
    super('main');
  }

  preload(): void {
    //
  }

  create(): void {
    this.planetSystems = new Phaser.GameObjects.Group(this);
    this.planetSystems.add(new PlanetSystem(this, 100, 100), true);
    this.planetSystems.add(new PlanetSystem(this, 400, 400), true);

    const statsHabitableAreaLabel = new Phaser.GameObjects.Text(
      this,
      30,
      0,
      'Habitable area:',
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
      'Explorable area:',
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

    this.events.on(SHOW_SYSTEM_STATS_EVENT, () => {
      this.statsHabitableArea.setText(this.registry.get(HABITABLE_AREA_KEY));
      this.statsExplorableArea.setText(this.registry.get(EXPLORABLE_AREA_KEY));
      this.stats.setVisible(true);
    });
    this.events.on(HIDE_SYSTEM_STATS_EVENT, () => {
      this.stats.setVisible(false);
    });
  }

  update(time: number, delta: number): void {
    this.planetSystems.getChildren().forEach((ps) => {
      ps.update(time, delta);
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
