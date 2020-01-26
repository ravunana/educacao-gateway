export interface ILookup {
  id?: number;
  nome?: string;
  sigla?: string;
  descricao?: any;
  usuario?: boolean;
  entidadeNome?: string;
  entidadeId?: number;
}

export class Lookup implements ILookup {
  constructor(
    public id?: number,
    public nome?: string,
    public sigla?: string,
    public descricao?: any,
    public usuario?: boolean,
    public entidadeNome?: string,
    public entidadeId?: number
  ) {
    this.usuario = this.usuario || false;
  }
}
