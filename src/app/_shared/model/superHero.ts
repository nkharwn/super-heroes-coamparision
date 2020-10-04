export class SuperHero {
    constructor(public id: number, public name: string, public powerstats:any, public selected?: boolean) {
      if (selected === undefined) selected = false;
    }
  }