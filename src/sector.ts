export default class PlanetSector {
  distance: number;
  type: PlanetSectorType;

  constructor(distance: number) {
    this.distance = distance;
    this.type = PlanetSectorType.HABITABLE;
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
}
