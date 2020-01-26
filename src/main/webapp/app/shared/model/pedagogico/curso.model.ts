import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { IPlanoActividade } from 'app/shared/model/pedagogico/plano-actividade.model';
import { IDosificacao } from 'app/shared/model/pedagogico/dosificacao.model';

export interface ICurso {
  id?: number;
  nome?: string;
  sigla?: string;
  competencias?: any;
  areaFormacao?: string;
  planoCurriculars?: IPlanoCurricular[];
  turmas?: ITurma[];
  planoActividades?: IPlanoActividade[];
  dosificacaoCursos?: IDosificacao[];
}

export class Curso implements ICurso {
  constructor(
    public id?: number,
    public nome?: string,
    public sigla?: string,
    public competencias?: any,
    public areaFormacao?: string,
    public planoCurriculars?: IPlanoCurricular[],
    public turmas?: ITurma[],
    public planoActividades?: IPlanoActividade[],
    public dosificacaoCursos?: IDosificacao[]
  ) {}
}
