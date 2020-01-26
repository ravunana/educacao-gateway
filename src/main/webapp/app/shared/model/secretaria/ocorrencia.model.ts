import { Moment } from 'moment';

export interface IOcorrencia {
  id?: number;
  tipoOcorrencia?: string;
  data?: Moment;
  numero?: string;
  reportarEncarregado?: boolean;
  de?: Moment;
  ate?: Moment;
  descricao?: any;
  matriculaNumeroProcesso?: string;
  matriculaId?: number;
}

export class Ocorrencia implements IOcorrencia {
  constructor(
    public id?: number,
    public tipoOcorrencia?: string,
    public data?: Moment,
    public numero?: string,
    public reportarEncarregado?: boolean,
    public de?: Moment,
    public ate?: Moment,
    public descricao?: any,
    public matriculaNumeroProcesso?: string,
    public matriculaId?: number
  ) {
    this.reportarEncarregado = this.reportarEncarregado || false;
  }
}
