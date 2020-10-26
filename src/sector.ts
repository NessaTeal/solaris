import { ResourceManager } from './resource-manager';

export default class PlanetSector {
  distance: number;
  type: PlanetSectorType;
  isActive: boolean;

  constructor(distance: number) {
    this.distance = distance;
    const random = Math.random();
    if (random <= 0.5) {
      this.type = PlanetSectorType.HABITABLE;
    } else if (random <= 0.75) {
      this.type = PlanetSectorType.FOOD;
    } else {
      this.type = PlanetSectorType.INDUSTRY;
    }
    this.isActive = true;
  }

  update(delta: number, resourceManager: ResourceManager): void {
    if (this.isActive) {
      switch (this.type) {
        case PlanetSectorType.FOOD:
          resourceManager.increaseFood(2 * delta);
          break;
        case PlanetSectorType.INDUSTRY:
          resourceManager.increaseIndustry(3 * delta);
          break;
      }
    }
  }

  static generatePlanetSectors(
    size: number,
    maxDistance: number,
  ): PlanetSector[] {
    const planetSectors = Array<PlanetSector>();
    let sizeThreshold = Math.floor(size * 0.4);
    let currentSize = size;

    for (
      let currentDistance = maxDistance;
      currentDistance >= 0;
      currentDistance--
    ) {
      if (currentDistance == 0) {
        sizeThreshold = 0;
      }
      for (let i = currentSize; i > sizeThreshold; i--) {
        planetSectors.push(new PlanetSector(currentDistance));
      }
      currentSize = sizeThreshold;
      sizeThreshold = Math.floor(sizeThreshold * 0.4);
    }

    return planetSectors.sort((a, b) => a.distance - b.distance);
  }
}

export enum PlanetSectorType {
  HABITABLE,
  FOOD,
  INDUSTRY,
}
