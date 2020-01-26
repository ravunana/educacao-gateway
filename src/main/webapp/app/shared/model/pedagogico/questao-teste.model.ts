export interface IQuestaoTeste {
  id?: number;
  grupo?: string;
  numero?: number;
  argumento?: string;
  questao?: string;
  testeId?: number;
}

export class QuestaoTeste implements IQuestaoTeste {
  constructor(
    public id?: number,
    public grupo?: string,
    public numero?: number,
    public argumento?: string,
    public questao?: string,
    public testeId?: number
  ) {}
}
