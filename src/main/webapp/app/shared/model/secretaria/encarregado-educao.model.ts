import { IAluno } from 'app/shared/model/secretaria/aluno.model';

export interface IEncarregadoEducao {
  id?: number;
  nome?: string;
  sexo?: string;
  nif?: string;
  numeroIdentificacao?: string;
  residencia?: string;
  contactoPessoal?: string;
  contactoTrabalho?: string;
  contactoResidencia?: string;
  email?: string;
  localTrabalho?: string;
  cargo?: string;
  salario?: number;
  grauParentesco?: string;
  alunos?: IAluno[];
}

export class EncarregadoEducao implements IEncarregadoEducao {
  constructor(
    public id?: number,
    public nome?: string,
    public sexo?: string,
    public nif?: string,
    public numeroIdentificacao?: string,
    public residencia?: string,
    public contactoPessoal?: string,
    public contactoTrabalho?: string,
    public contactoResidencia?: string,
    public email?: string,
    public localTrabalho?: string,
    public cargo?: string,
    public salario?: number,
    public grauParentesco?: string,
    public alunos?: IAluno[]
  ) {}
}
