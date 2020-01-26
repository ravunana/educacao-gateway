import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'software',
        loadChildren: () => import('./software/software.module').then(m => m.EducacaoSoftwareModule)
      },
      {
        path: 'licenca-software',
        loadChildren: () => import('./licenca-software/licenca-software.module').then(m => m.EducacaoLicencaSoftwareModule)
      },
      {
        path: 'entidade-sistema',
        loadChildren: () => import('./entidade-sistema/entidade-sistema.module').then(m => m.EducacaoEntidadeSistemaModule)
      },
      {
        path: 'lookup',
        loadChildren: () => import('./lookup/lookup.module').then(m => m.EducacaoLookupModule)
      },
      {
        path: 'instituicao-ensino',
        loadChildren: () => import('./instituicao-ensino/instituicao-ensino.module').then(m => m.EducacaoInstituicaoEnsinoModule)
      },
      {
        path: 'assinatura-digital',
        loadChildren: () => import('./assinatura-digital/assinatura-digital.module').then(m => m.EducacaoAssinaturaDigitalModule)
      },
      {
        path: 'contacto-instituicao',
        loadChildren: () => import('./contacto-instituicao/contacto-instituicao.module').then(m => m.EducacaoContactoInstituicaoModule)
      },
      {
        path: 'professor',
        loadChildren: () => import('./pedagogico/professor/professor.module').then(m => m.PedagogicoProfessorModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('./pedagogico/curso/curso.module').then(m => m.PedagogicoCursoModule)
      },
      {
        path: 'plano-curricular',
        loadChildren: () => import('./pedagogico/plano-curricular/plano-curricular.module').then(m => m.PedagogicoPlanoCurricularModule)
      },
      {
        path: 'criterio-avaliacao',
        loadChildren: () =>
          import('./pedagogico/criterio-avaliacao/criterio-avaliacao.module').then(m => m.PedagogicoCriterioAvaliacaoModule)
      },
      {
        path: 'turma',
        loadChildren: () => import('./pedagogico/turma/turma.module').then(m => m.PedagogicoTurmaModule)
      },
      {
        path: 'horario',
        loadChildren: () => import('./pedagogico/horario/horario.module').then(m => m.PedagogicoHorarioModule)
      },
      {
        path: 'plano-actividade',
        loadChildren: () => import('./pedagogico/plano-actividade/plano-actividade.module').then(m => m.PedagogicoPlanoActividadeModule)
      },
      {
        path: 'aula',
        loadChildren: () => import('./pedagogico/aula/aula.module').then(m => m.PedagogicoAulaModule)
      },
      {
        path: 'chamada',
        loadChildren: () => import('./pedagogico/chamada/chamada.module').then(m => m.PedagogicoChamadaModule)
      },
      {
        path: 'dosificacao',
        loadChildren: () => import('./pedagogico/dosificacao/dosificacao.module').then(m => m.PedagogicoDosificacaoModule)
      },
      {
        path: 'plano-aula',
        loadChildren: () => import('./pedagogico/plano-aula/plano-aula.module').then(m => m.PedagogicoPlanoAulaModule)
      },
      {
        path: 'nota',
        loadChildren: () => import('./pedagogico/nota/nota.module').then(m => m.PedagogicoNotaModule)
      },
      {
        path: 'prova-aptidao-profissional',
        loadChildren: () =>
          import('./pedagogico/prova-aptidao-profissional/prova-aptidao-profissional.module').then(
            m => m.PedagogicoProvaAptidaoProfissionalModule
          )
      },
      {
        path: 'teste-conhecimento',
        loadChildren: () =>
          import('./pedagogico/teste-conhecimento/teste-conhecimento.module').then(m => m.PedagogicoTesteConhecimentoModule)
      },
      {
        path: 'questao-teste',
        loadChildren: () => import('./pedagogico/questao-teste/questao-teste.module').then(m => m.PedagogicoQuestaoTesteModule)
      },
      {
        path: 'resposta-questao',
        loadChildren: () => import('./pedagogico/resposta-questao/resposta-questao.module').then(m => m.PedagogicoRespostaQuestaoModule)
      },
      {
        path: 'categoria-aluno',
        loadChildren: () => import('./secretaria/categoria-aluno/categoria-aluno.module').then(m => m.SecretariaCategoriaAlunoModule)
      },
      {
        path: 'ocorrencia',
        loadChildren: () => import('./secretaria/ocorrencia/ocorrencia.module').then(m => m.SecretariaOcorrenciaModule)
      },
      {
        path: 'aluno',
        loadChildren: () => import('./secretaria/aluno/aluno.module').then(m => m.SecretariaAlunoModule)
      },
      {
        path: 'encarregado-educao',
        loadChildren: () =>
          import('./secretaria/encarregado-educao/encarregado-educao.module').then(m => m.SecretariaEncarregadoEducaoModule)
      },
      {
        path: 'matricula',
        loadChildren: () => import('./secretaria/matricula/matricula.module').then(m => m.SecretariaMatriculaModule)
      },
      {
        path: 'forma-liquidacao',
        loadChildren: () => import('./pagamento/forma-liquidacao/forma-liquidacao.module').then(m => m.PagamentoFormaLiquidacaoModule)
      },
      {
        path: 'caixa',
        loadChildren: () => import('./pagamento/caixa/caixa.module').then(m => m.PagamentoCaixaModule)
      },
      {
        path: 'emolumento',
        loadChildren: () => import('./pagamento/emolumento/emolumento.module').then(m => m.PagamentoEmolumentoModule)
      },
      {
        path: 'deposito',
        loadChildren: () => import('./pagamento/deposito/deposito.module').then(m => m.PagamentoDepositoModule)
      },
      {
        path: 'pagamento-emolumento',
        loadChildren: () =>
          import('./pagamento/pagamento-emolumento/pagamento-emolumento.module').then(m => m.PagamentoPagamentoEmolumentoModule)
      },
      {
        path: 'efeito-pagamento',
        loadChildren: () => import('./pagamento/efeito-pagamento/efeito-pagamento.module').then(m => m.PagamentoEfeitoPagamentoModule)
      },
      {
        path: 'conta-aluno',
        loadChildren: () => import('./pagamento/conta-aluno/conta-aluno.module').then(m => m.PagamentoContaAlunoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EducacaoEntityModule {}
