import { Moment } from 'moment';
import { IHorario } from 'app/shared/model/pedagogico/horario.model';
import { IPlanoActividade } from 'app/shared/model/pedagogico/plano-actividade.model';
import { INota } from 'app/shared/model/pedagogico/nota.model';
import { IAula } from 'app/shared/model/pedagogico/aula.model';
import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';
import { IPlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';

export interface ITurma {
  id?: number;
  descricao?: string;
  anoLectivo?: number;
  data?: Moment;
  abertura?: Moment;
  encerramento?: Moment;
  lotacao?: number;
  aberta?: boolean;
  periodoLectivo?: string;
  turno?: string;
  sala?: number;
  classe?: number;
  horarios?: IHorario[];
  planoActividades?: IPlanoActividade[];
  notas?: INota[];
  aulas?: IAula[];
  testeConhecimentos?: ITesteConhecimento[];
  cursoNome?: string;
  cursoId?: number;
  coordenadorNome?: string;
  coordenadorId?: number;
  planoAulaTurmas?: IPlanoAula[];
}

export class Turma implements ITurma {
  constructor(
    public id?: number,
    public descricao?: string,
    public anoLectivo?: number,
    public data?: Moment,
    public abertura?: Moment,
    public encerramento?: Moment,
    public lotacao?: number,
    public aberta?: boolean,
    public periodoLectivo?: string,
    public turno?: string,
    public sala?: number,
    public classe?: number,
    public horarios?: IHorario[],
    public planoActividades?: IPlanoActividade[],
    public notas?: INota[],
    public aulas?: IAula[],
    public testeConhecimentos?: ITesteConhecimento[],
    public cursoNome?: string,
    public cursoId?: number,
    public coordenadorNome?: string,
    public coordenadorId?: number,
    public planoAulaTurmas?: IPlanoAula[]
  ) {
    this.aberta = this.aberta || false;
  }
}
