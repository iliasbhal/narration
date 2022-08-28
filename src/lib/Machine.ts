import { State } from './State';

export class Machine {
  states = new Map<string, State>();
}