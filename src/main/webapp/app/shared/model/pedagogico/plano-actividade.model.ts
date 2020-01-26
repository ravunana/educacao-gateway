import { Moment } from 'moment';

export interface IPlanoActividade {
  id?: number;
  numeroActividade?: number;
  atividade?: string;
  objectivos?: any;
  de?: Moment;
  ate?: Moment;
  responsavel?: string;
  local?: string;
  observacao?: any;
  participantes?: string;
  coResponsavel?: string;
  anoLectivo?: number;
  statusActividade?: string;
  periodoLectivo?: string;
  turno?: string;
  classe?: number;
  cursoNome?: string;
  cursoId?: number;
  turmaDescricao?: string;
  turmaId?: number;
}

export class PlanoActividade implements IPlanoActividade {
  constructor(
    public id?: number,
    public numeroActividade?: number,
    public atividade?: string,
    public objectivos?: any,
    public de?: Moment,
    public ate?: Moment,
    public responsavel?: string,
    public local?: string,
    public observacao?: any,
    public participantes?: string,
    public coResponsavel?: string,
    public anoLectivo?: number,
    public statusActividade?: string,
    public periodoLectivo?: string,
    public turno?: string,
    public classe?: number,
    public cursoNome?: string,
    public cursoId?: number,
    public turmaDescricao?: string,
    public turmaId?: number
  ) {}
}
