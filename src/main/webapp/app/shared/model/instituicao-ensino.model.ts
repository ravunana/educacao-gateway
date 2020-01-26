import { Moment } from 'moment';
import { IInstituicaoEnsino } from 'app/shared/model/instituicao-ensino.model';
import { IContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';
import { ILicencaSoftware } from 'app/shared/model/licenca-software.model';
import { IAssinaturaDigital } from 'app/shared/model/assinatura-digital.model';

export interface IInstituicaoEnsino {
  id?: number;
  nome?: string;
  logotipoContentType?: string;
  logotipo?: any;
  fundacao?: Moment;
  fundador?: string;
  numero?: string;
  dimensao?: string;
  sede?: boolean;
  tipoVinculo?: string;
  unidadePagadora?: string;
  tipoInstalacao?: string;
  provincia?: string;
  municipio?: string;
  bairro?: string;
  rua?: string;
  quarteirao?: string;
  numeroPorta?: string;
  instituicaoEnsinos?: IInstituicaoEnsino[];
  contactoInstituicaos?: IContactoInstituicao[];
  licencaSoftwares?: ILicencaSoftware[];
  assinaturaDigitals?: IAssinaturaDigital[];
  hierarquiaNome?: string;
  hierarquiaId?: number;
}

export class InstituicaoEnsino implements IInstituicaoEnsino {
  constructor(
    public id?: number,
    public nome?: string,
    public logotipoContentType?: string,
    public logotipo?: any,
    public fundacao?: Moment,
    public fundador?: string,
    public numero?: string,
    public dimensao?: string,
    public sede?: boolean,
    public tipoVinculo?: string,
    public unidadePagadora?: string,
    public tipoInstalacao?: string,
    public provincia?: string,
    public municipio?: string,
    public bairro?: string,
    public rua?: string,
    public quarteirao?: string,
    public numeroPorta?: string,
    public instituicaoEnsinos?: IInstituicaoEnsino[],
    public contactoInstituicaos?: IContactoInstituicao[],
    public licencaSoftwares?: ILicencaSoftware[],
    public assinaturaDigitals?: IAssinaturaDigital[],
    public hierarquiaNome?: string,
    public hierarquiaId?: number
  ) {
    this.sede = this.sede || false;
  }
}
