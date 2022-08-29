
export interface StateConfig {
  initial: boolean;
}

export class State<Config extends StateConfig> {
  name: string;
  config: Config;

  constructor(name: string, config?: Config) {
    this.name = name;
    this.config = config;
  }
}