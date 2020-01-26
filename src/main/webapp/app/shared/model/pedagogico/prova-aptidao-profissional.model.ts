import { Moment } from 'moment';

export interface IProvaAptidaoProfissional {
  id?: number;
  numeroProcesso?: string;
  nomeAluno?: string;
  livroRegistro?: number;
  folhaRegistro?: number;
  temaProjectoTecnologio?: string;
  notaProjectoTecnologio?: number;
  dataDefesa?: Moment;
  localEstagio?: string;
  aproveitamentoEstagio?: string;
  inicioEstagio?: Moment;
  finalEstagio?: Moment;
  data?: Moment;
}

export class ProvaAptidaoProfissional implements IProvaAptidaoProfissional {
  constructor(
    public id?: number,
    public numeroProcesso?: string,
    public nomeAluno?: string,
    public livroRegistro?: number,
    public folhaRegistro?: number,
    public temaProjectoTecnologio?: string,
    public notaProjectoTecnologio?: number,
    public dataDefesa?: Moment,
    public localEstagio?: string,
    public aproveitamentoEstagio?: string,
    public inicioEstagio?: Moment,
    public finalEstagio?: Moment,
    public data?: Moment
  ) {}
}
