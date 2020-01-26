import { Moment } from 'moment';

export interface IMatricula {
  id?: number;
  data?: Moment;
  numeroChamada?: number;
  anoLectivo?: number;
  fotografia?: boolean;
  certificado?: boolean;
  documentoIdentificacao?: boolean;
  resenciamentoMilitar?: boolean;
  documentoSaude?: boolean;
  fichaTransferencia?: boolean;
  historicoEscolar?: boolean;
  observacao?: any;
  confirmacao?: boolean;
  periodoLectivo?: string;
  turma?: string;
  curso?: string;
  turno?: string;
  sala?: number;
  classe?: number;
  alunoNumeroProcesso?: string;
  alunoId?: number;
  categoriaNome?: string;
  categoriaId?: number;
}

export class Matricula implements IMatricula {
  constructor(
    public id?: number,
    public data?: Moment,
    public numeroChamada?: number,
    public anoLectivo?: number,
    public fotografia?: boolean,
    public certificado?: boolean,
    public documentoIdentificacao?: boolean,
    public resenciamentoMilitar?: boolean,
    public documentoSaude?: boolean,
    public fichaTransferencia?: boolean,
    public historicoEscolar?: boolean,
    public observacao?: any,
    public confirmacao?: boolean,
    public periodoLectivo?: string,
    public turma?: string,
    public curso?: string,
    public turno?: string,
    public sala?: number,
    public classe?: number,
    public alunoNumeroProcesso?: string,
    public alunoId?: number,
    public categoriaNome?: string,
    public categoriaId?: number
  ) {
    this.fotografia = this.fotografia || false;
    this.certificado = this.certificado || false;
    this.documentoIdentificacao = this.documentoIdentificacao || false;
    this.resenciamentoMilitar = this.resenciamentoMilitar || false;
    this.documentoSaude = this.documentoSaude || false;
    this.fichaTransferencia = this.fichaTransferencia || false;
    this.historicoEscolar = this.historicoEscolar || false;
    this.confirmacao = this.confirmacao || false;
  }
}
