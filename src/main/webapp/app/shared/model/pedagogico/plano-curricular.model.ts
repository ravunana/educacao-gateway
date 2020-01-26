import { IPlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';
import { IDosificacao } from 'app/shared/model/pedagogico/dosificacao.model';
import { INota } from 'app/shared/model/pedagogico/nota.model';
import { IAula } from 'app/shared/model/pedagogico/aula.model';
import { IHorario } from 'app/shared/model/pedagogico/horario.model';
import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

export interface IPlanoCurricular {
  id?: number;
  descricao?: string;
  terminal?: boolean;
  tempoSemanal?: number;
  periodoLectivo?: string;
  componente?: string;
  disciplina?: string;
  classe?: number;
  planoAulas?: IPlanoAula[];
  dosificacaos?: IDosificacao[];
  notas?: INota[];
  aulas?: IAula[];
  horarios?: IHorario[];
  testeConhecimentos?: ITesteConhecimento[];
  cursoNome?: string;
  cursoId?: number;
}

export class PlanoCurricular implements IPlanoCurricular {
  constructor(
    public id?: number,
    public descricao?: string,
    public terminal?: boolean,
    public tempoSemanal?: number,
    public periodoLectivo?: string,
    public componente?: string,
    public disciplina?: string,
    public classe?: number,
    public planoAulas?: IPlanoAula[],
    public dosificacaos?: IDosificacao[],
    public notas?: INota[],
    public aulas?: IAula[],
    public horarios?: IHorario[],
    public testeConhecimentos?: ITesteConhecimento[],
    public cursoNome?: string,
    public cursoId?: number
  ) {
    this.terminal = this.terminal || false;
  }
}
