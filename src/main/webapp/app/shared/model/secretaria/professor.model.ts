import { IHorario } from 'app/shared/model/secretaria/horario.model';
import { ITurma } from 'app/shared/model/secretaria/turma.model';
import { IPlanoAula } from 'app/shared/model/secretaria/plano-aula.model';
import { INota } from 'app/shared/model/secretaria/nota.model';
import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

export interface IProfessor {
  id?: number;
  nome?: string;
  sexo?: string;
  fotografiaContentType?: string;
  fotografia?: any;
  contacto?: string;
  email?: string;
  residencia?: string;
  numeroAgente?: string;
  utilizadorId?: string;
  grauAcademico?: string;
  cursoAcademico?: string;
  observacao?: any;
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
    public fotografiaContentType?: string,
    public fotografia?: any,
    public contacto?: string,
    public email?: string,
    public residencia?: string,
    public numeroAgente?: string,
    public utilizadorId?: string,
    public grauAcademico?: string,
    public cursoAcademico?: string,
    public observacao?: any,
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
