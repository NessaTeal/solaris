export const RESOURCE_MANAGER_KEY = 'RESOURCE_MANAGER';

export class ResourceManager {
  player: number;
  dataManager: Phaser.Data.DataManager;

  constructor(player: number, dataManager: Phaser.Data.DataManager) {
    this.player = player;
    this.dataManager = dataManager;
    dataManager.set(RESOURCE_MANAGER_KEY + player, this);
    dataManager.set(ResourceType.FOOD + player, 0);
    dataManager.set(ResourceType.INDUSTRY + player, 0);
  }

  getFood(): number {
    return this.getResource(ResourceType.FOOD);
  }

  getIndustry(): number {
    return this.getResource(ResourceType.INDUSTRY);
  }

  getResource(type: ResourceType): number {
    return this.dataManager.get(type + this.player);
  }

  increaseFood(amount: number): void {
    this.increaseResource(amount, ResourceType.FOOD);
  }

  increaseIndustry(amount: number): void {
    this.increaseResource(amount, ResourceType.INDUSTRY);
  }

  increaseResource(amount: number, type: ResourceType): void {
    const key = type + this.player;
    this.dataManager.values[key] += amount;
  }
}

enum ResourceType {
  FOOD = 'FOOD',
  INDUSTRY = 'INDUSTRY',
}
