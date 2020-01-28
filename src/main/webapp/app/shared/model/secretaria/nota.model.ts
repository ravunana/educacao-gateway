export interface INota {
  id?: number;
  numeroProcesso?: string;
  nomeAluno?: string;
  disciplina?: string;
  peridoLectivo?: string;
  anoLectivo?: number;
  faltaJustificada?: number;
  faltaInjustificada?: number;
  avaliacaoContinuca?: number;
  primeiraProva?: number;
  segundaProva?: number;
  exame?: number;
  recurso?: number;
  exameEspecial?: number;
  provaContentType?: string;
  prova?: any;
  situacao?: string;
  turmaDescricao?: string;
  turmaId?: number;
  curriculoDescricao?: string;
  curriculoId?: number;
  professorNome?: string;
  professorId?: number;
}

export class Nota implements INota {
  constructor(
    public id?: number,
    public numeroProcesso?: string,
    public nomeAluno?: string,
    public disciplina?: string,
    public peridoLectivo?: string,
    public anoLectivo?: number,
    public faltaJustificada?: number,
    public faltaInjustificada?: number,
    public avaliacaoContinuca?: number,
    public primeiraProva?: number,
    public segundaProva?: number,
    public exame?: number,
    public recurso?: number,
    public exameEspecial?: number,
    public provaContentType?: string,
    public prova?: any,
    public situacao?: string,
    public turmaDescricao?: string,
    public turmaId?: number,
    public curriculoDescricao?: string,
    public curriculoId?: number,
    public professorNome?: string,
    public professorId?: number
  ) {}
}
