export interface IContaAluno {
  id?: number;
  debito?: number;
  credito?: number;
  numeroProcesso?: string;
}

export class ContaAluno implements IContaAluno {
  constructor(public id?: number, public debito?: number, public credito?: number, public numeroProcesso?: string) {}
}
