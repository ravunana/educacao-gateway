import { IDeposito } from 'app/shared/model/pagamento/deposito.model';

export interface ICaixa {
  id?: number;
  descricao?: string;
  proprietario?: string;
  numeroConta?: string;
  iban?: string;
  ativo?: boolean;
  depositos?: IDeposito[];
}

export class Caixa implements ICaixa {
  constructor(
    public id?: number,
    public descricao?: string,
    public proprietario?: string,
    public numeroConta?: string,
    public iban?: string,
    public ativo?: boolean,
    public depositos?: IDeposito[]
  ) {
    this.ativo = this.ativo || false;
  }
}
