import { Moment } from 'moment';
import { IPlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';
import { ICurso } from 'app/shared/model/pedagogico/curso.model';

export interface IDosificacao {
  id?: number;
  peridoLective?: string;
  objectivoGeral?: any;
  semanaLectiva?: number;
  de?: Moment;
  ate?: Moment;
  unidadeTematica?: string;
  conteudo?: any;
  procedimentoEnsino?: any;
  recursosDidaticos?: any;
  tempoAula?: number;
  formaAvaliacao?: string;
  planoAulas?: IPlanoAula[];
  cursos?: ICurso[];
  curriuloDescricao?: string;
  curriuloId?: number;
}

export class Dosificacao implements IDosificacao {
  constructor(
    public id?: number,
    public peridoLective?: string,
    public objectivoGeral?: any,
    public semanaLectiva?: number,
    public de?: Moment,
    public ate?: Moment,
    public unidadeTematica?: string,
    public conteudo?: any,
    public procedimentoEnsino?: any,
    public recursosDidaticos?: any,
    public tempoAula?: number,
    public formaAvaliacao?: string,
    public planoAulas?: IPlanoAula[],
    public cursos?: ICurso[],
    public curriuloDescricao?: string,
    public curriuloId?: number
  ) {}
}
