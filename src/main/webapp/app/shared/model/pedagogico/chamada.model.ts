import { Moment } from 'moment';

export interface IChamada {
  id?: number;
  data?: Moment;
  presente?: boolean;
  numeroProcesso?: string;
  aulaData?: string;
  aulaId?: number;
}

export class Chamada implements IChamada {
  constructor(
    public id?: number,
    public data?: Moment,
    public presente?: boolean,
    public numeroProcesso?: string,
    public aulaData?: string,
    public aulaId?: number
  ) {
    this.presente = this.presente || false;
  }
}
