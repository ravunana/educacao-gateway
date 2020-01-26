import { Moment } from 'moment';
import { IMatricula } from 'app/shared/model/secretaria/matricula.model';
import { IOcorrencia } from 'app/shared/model/secretaria/ocorrencia.model';

export interface IAluno {
  id?: number;
  nome?: string;
  sexo?: string;
  fotografiaContentType?: string;
  fotografia?: any;
  pai?: string;
  mae?: string;
  nascimento?: Moment;
  nacionalidade?: string;
  naturalidade?: string;
  contacto?: string;
  email?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  emissao?: Moment;
  validade?: Moment;
  localEmissao?: string;
  nif?: string;
  provincia?: string;
  municipio?: string;
  bairro?: string;
  rua?: string;
  quarteirao?: string;
  numeroPorta?: string;
  fazEducacaoFisica?: boolean;
  grupoSanguinio?: string;
  autorizaMedicamento?: boolean;
  altura?: number;
  peso?: number;
  nomeMedico?: string;
  contactoMedico?: string;
  desmaioConstante?: boolean;
  alergia?: string;
  dificiencia?: string;
  anoConclusao?: number;
  situacaoAnterior?: string;
  meioTransporte?: string;
  escolaAnterior?: string;
  classeAnterior?: number;
  cursoAnterior?: string;
  data?: Moment;
  numeroProcesso?: string;
  transferido?: boolean;
  observacao?: any;
  situacaoAtual?: string;
  matriculas?: IMatricula[];
  ocorrencias?: IOcorrencia[];
  encarregadoNome?: string;
  encarregadoId?: number;
}

export class Aluno implements IAluno {
  constructor(
    public id?: number,
    public nome?: string,
    public sexo?: string,
    public fotografiaContentType?: string,
    public fotografia?: any,
    public pai?: string,
    public mae?: string,
    public nascimento?: Moment,
    public nacionalidade?: string,
    public naturalidade?: string,
    public contacto?: string,
    public email?: string,
    public tipoDocumento?: string,
    public numeroDocumento?: string,
    public emissao?: Moment,
    public validade?: Moment,
    public localEmissao?: string,
    public nif?: string,
    public provincia?: string,
    public municipio?: string,
    public bairro?: string,
    public rua?: string,
    public quarteirao?: string,
    public numeroPorta?: string,
    public fazEducacaoFisica?: boolean,
    public grupoSanguinio?: string,
    public autorizaMedicamento?: boolean,
    public altura?: number,
    public peso?: number,
    public nomeMedico?: string,
    public contactoMedico?: string,
    public desmaioConstante?: boolean,
    public alergia?: string,
    public dificiencia?: string,
    public anoConclusao?: number,
    public situacaoAnterior?: string,
    public meioTransporte?: string,
    public escolaAnterior?: string,
    public classeAnterior?: number,
    public cursoAnterior?: string,
    public data?: Moment,
    public numeroProcesso?: string,
    public transferido?: boolean,
    public observacao?: any,
    public situacaoAtual?: string,
    public matriculas?: IMatricula[],
    public ocorrencias?: IOcorrencia[],
    public encarregadoNome?: string,
    public encarregadoId?: number
  ) {
    this.fazEducacaoFisica = this.fazEducacaoFisica || false;
    this.autorizaMedicamento = this.autorizaMedicamento || false;
    this.desmaioConstante = this.desmaioConstante || false;
    this.transferido = this.transferido || false;
  }
}
