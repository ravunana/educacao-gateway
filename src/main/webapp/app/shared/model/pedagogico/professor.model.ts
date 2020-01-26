import { IHorario } from 'app/shared/model/pedagogico/horario.model';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { IPlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';
import { INota } from 'app/shared/model/pedagogico/nota.model';
import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

export interface IProfessor {
  id?: number;
  nome?: string;
  sexo?: string;
  fotografia?: string;
  contacto?: string;
  email?: string;
  residencia?: string;
  numeroAgente?: string;
  utilizadorId?: string;
  ativo?: boolean;
  horarios?: IHorario[];
  turmas?: ITurma[];
  planoAulas?: IPlanoAula[];
  notas?: INota[];
  testeConhecimentos?: ITesteConhecimento[];
}

export class Professor implements IProfessor {
  constructor(
    public id?: number,
    public nome?: string,
    public sexo?: string,
    public fotografia?: string,
    public contacto?: string,
    public email?: string,
    public residencia?: string,
    public numeroAgente?: string,
    public utilizadorId?: string,
    public ativo?: boolean,
    public horarios?: IHorario[],
    public turmas?: ITurma[],
    public planoAulas?: IPlanoAula[],
    public notas?: INota[],
    public testeConhecimentos?: ITesteConhecimento[]
  ) {
    this.ativo = this.ativo || false;
  }
}
