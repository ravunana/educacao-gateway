import { ILookup } from 'app/shared/model/lookup.model';

export interface IEntidadeSistema {
  id?: number;
  nome?: string;
  lookups?: ILookup[];
}

export class EntidadeSistema implements IEntidadeSistema {
  constructor(public id?: number, public nome?: string, public lookups?: ILookup[]) {}
}
