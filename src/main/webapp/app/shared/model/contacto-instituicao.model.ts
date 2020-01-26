export interface IContactoInstituicao {
  id?: number;
  tipoContacto?: string;
  descricao?: string;
  contacto?: string;
  mostrarDocumento?: boolean;
  instituicaoEnsinoNome?: string;
  instituicaoEnsinoId?: number;
}

export class ContactoInstituicao implements IContactoInstituicao {
  constructor(
    public id?: number,
    public tipoContacto?: string,
    public descricao?: string,
    public contacto?: string,
    public mostrarDocumento?: boolean,
    public instituicaoEnsinoNome?: string,
    public instituicaoEnsinoId?: number
  ) {
    this.mostrarDocumento = this.mostrarDocumento || false;
  }
}
