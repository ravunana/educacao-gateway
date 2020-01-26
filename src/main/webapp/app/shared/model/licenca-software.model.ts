import { Moment } from 'moment';

export interface ILicencaSoftware {
  id?: number;
  tipoSubscricao?: string;
  inicio?: Moment;
  fim?: Moment;
  data?: Moment;
  valor?: number;
  codigo?: string;
  numeroUsuario?: number;
  numeroInstituicaoEnsino?: number;
  instituicaoEnsinoNome?: string;
  instituicaoEnsinoId?: number;
  softwareNome?: string;
  softwareId?: number;
}

export class LicencaSoftware implements ILicencaSoftware {
  constructor(
    public id?: number,
    public tipoSubscricao?: string,
    public inicio?: Moment,
    public fim?: Moment,
    public data?: Moment,
    public valor?: number,
    public codigo?: string,
    public numeroUsuario?: number,
    public numeroInstituicaoEnsino?: number,
    public instituicaoEnsinoNome?: string,
    public instituicaoEnsinoId?: number,
    public softwareNome?: string,
    public softwareId?: number
  ) {}
}
