export interface IRespostaQuestao {
  id?: number;
  resposta?: string;
  questaoQuestao?: string;
  questaoId?: number;
}

export class RespostaQuestao implements IRespostaQuestao {
  constructor(public id?: number, public resposta?: string, public questaoQuestao?: string, public questaoId?: number) {}
}
