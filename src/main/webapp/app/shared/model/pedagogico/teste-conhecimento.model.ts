import { Moment } from 'moment';
import { IQuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';

export interface ITesteConhecimento {
  id?: number;
  categoria?: string;
  periodoLectivo?: string;
  duracao?: number;
  data?: Moment;
  questaoTestes?: IQuestaoTeste[];
  curriculoDescricao?: string;
  curriculoId?: number;
  turmaDescricao?: string;
  turmaId?: number;
  professorNome?: string;
  professorId?: number;
}

export class TesteConhecimento implements ITesteConhecimento {
  constructor(
    public id?: number,
    public categoria?: string,
    public periodoLectivo?: string,
    public duracao?: number,
    public data?: Moment,
    public questaoTestes?: IQuestaoTeste[],
    public curriculoDescricao?: string,
    public curriculoId?: number,
    public turmaDescricao?: string,
    public turmaId?: number,
    public professorNome?: string,
    public professorId?: number
  ) {}
}
