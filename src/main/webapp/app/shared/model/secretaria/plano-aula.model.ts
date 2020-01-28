import { Moment } from 'moment';
import { ITurma } from 'app/shared/model/secretaria/turma.model';
import { IAula } from 'app/shared/model/secretaria/aula.model';

export interface IPlanoAula {
  id?: number;
  objectivoGeral?: any;
  objectivoEspecifico?: any;
  conteudo?: any;
  estrategia?: any;
  actividades?: any;
  tempo?: Moment;
  recursosEnsino?: any;
  avaliacao?: any;
  observacao?: any;
  bibliografia?: any;
  perfilEntrada?: any;
  perfilSaida?: any;
  anexo1ContentType?: string;
  anexo1?: any;
  turmas?: ITurma[];
  dosificacaoId?: number;
  professorNome?: string;
  professorId?: number;
  curriculoDescricao?: string;
  curriculoId?: number;
  aulaPlanoAulas?: IAula[];
}

export class PlanoAula implements IPlanoAula {
  constructor(
    public id?: number,
    public objectivoGeral?: any,
    public objectivoEspecifico?: any,
    public conteudo?: any,
    public estrategia?: any,
    public actividades?: any,
    public tempo?: Moment,
    public recursosEnsino?: any,
    public avaliacao?: any,
    public observacao?: any,
    public bibliografia?: any,
    public perfilEntrada?: any,
    public perfilSaida?: any,
    public anexo1ContentType?: string,
    public anexo1?: any,
    public turmas?: ITurma[],
    public dosificacaoId?: number,
    public professorNome?: string,
    public professorId?: number,
    public curriculoDescricao?: string,
    public curriculoId?: number,
    public aulaPlanoAulas?: IAula[]
  ) {}
}
