import { Moment } from 'moment';
import { IChamada } from 'app/shared/model/pedagogico/chamada.model';
import { IPlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';

export interface IAula {
  id?: number;
  data?: Moment;
  sumario?: string;
  licao?: number;
  dada?: boolean;
  chamadas?: IChamada[];
  planoAulas?: IPlanoAula[];
  turmaDescricao?: string;
  turmaId?: number;
  curriuloDescricao?: string;
  curriuloId?: number;
}

export class Aula implements IAula {
  constructor(
    public id?: number,
    public data?: Moment,
    public sumario?: string,
    public licao?: number,
    public dada?: boolean,
    public chamadas?: IChamada[],
    public planoAulas?: IPlanoAula[],
    public turmaDescricao?: string,
    public turmaId?: number,
    public curriuloDescricao?: string,
    public curriuloId?: number
  ) {
    this.dada = this.dada || false;
  }
}
