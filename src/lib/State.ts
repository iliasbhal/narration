export class State {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  static create(stateName: string) {
    return new State(stateName);
  }
}