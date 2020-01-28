import { Moment } from 'moment';

export interface IHorario {
  id?: number;
  inicio?: string;
  fim?: string;
  data?: Moment;
  anoLectivo?: number;
  diaSemana?: string;
  categoria?: string;
  turmaDescricao?: string;
  turmaId?: number;
  professorNumeroAgente?: string;
  professorId?: number;
  curriculoDescricao?: string;
  curriculoId?: number;
}

export class Horario implements IHorario {
  constructor(
    public id?: number,
    public inicio?: string,
    public fim?: string,
    public data?: Moment,
    public anoLectivo?: number,
    public diaSemana?: string,
    public categoria?: string,
    public turmaDescricao?: string,
    public turmaId?: number,
    public professorNumeroAgente?: string,
    public professorId?: number,
    public curriculoDescricao?: string,
    public curriculoId?: number
  ) {}
}
