// Configuração da app. Altere aqui sem mexer no resto do código.
window.DiaryConfig = {
  // Marca: nome, logótipo (imagem; se não carregar aparece a nuvem com o nome) e ligação ao tocar.
  brand: {
    name: 'Petit Nuvem',
    logo: 'https://cdn.shopify.com/s/files/1/1092/3832/1484/files/pn-logo-horizontal-texto.png?v=1792060811&width=685',
    url: 'https://petitnuvem.com/'
  },
  // Idiomas disponíveis (a ordem define o menu). Para adicionar um país,
  // acrescente o idioma em i18n.js e os nomes dos alimentos em foods.js.
  languages: ['pt', 'en', 'es', 'fr'],
  fallbackLanguage: 'en',
  // Marcos do desafio (número de alimentos provados).
  milestones: [10, 25, 50, 75, 100],
  // Subscrição.
  // enforce: false = modo de teste, tudo desbloqueado. Só passar a true quando os pagamentos e as contas estiverem a funcionar,
  // porque sem servidor a app não tem como saber quem pagou.
  // checkout: ligações de pagamento (Stripe Payment Links) de cada plano.
  subscription: {
    enabled: true, enforce: false, currency: 'EUR', trialDays: 7,
    monthly: 3.99, yearly: 29.99,
    checkout: { monthly: '', yearly: '' },
    freeStage: 6, // receitas até esta fase (meses) são gratuitas
    // Guias gratuitos (por id). Regra: a informação de segurança nunca fica atrás da subscrição.
    freeGuides: ['ready', 'gagging', 'cutting', 'avoid'],
    // O que só existe com subscrição (true = premium, false = gratuito).
    premium: { parentsJournal: true, journalBook: true, report: true, extraBabies: true, weekPlan: true }
    // As semanas gratuitas do plano guiado estão em plan.freeWeeks.
  },
  // Sobre o conteúdo: quem reviu (vazio até haver um profissional), quando, e as fontes usadas como base.
  content: { reviewedBy: '', reviewedOn: '', sources: ['SPP', 'OMS', 'NHS', 'HSE'] },
  // Páginas legais: entidade responsável, contacto e data da última atualização (AAAA-MM-DD).
  legal: { controller: 'Bárbara Simão Lopes (Petit Nuvem), NIF 262889609, Rua Padre Cabanita 9A, Fonte de Boliqueime, 8100-069 Boliqueime', contact: 'ola.petitnuvem@gmail.com', updated: '2026-11-12' },
  // Programa de alergénios. A REVER POR PROFISSIONAL DE SAÚDE
  // introducedAfter: número de vezes sem reação para a app dar o alergénio como introduzido.
  // remindAfterDays: dias sem oferecer um alergénio já introduzido até a app lembrar.
  allergens: { introducedAfter: 3, remindAfterDays: 7 },
  // Plano guiado. A REVER POR PROFISSIONAL DE SAÚDE
  // perWeek: alimentos novos sugeridos por semana. allergensFromWeek: semana a partir da qual o plano inclui alergénios
  // (nunca mais do que um grupo novo por semana). freeWeeks: semanas abertas a quem não tem subscrição.
  // early: alimentos puxados para o início da sua categoria, para não ficarem para o fim do plano.
  plan: { perWeek: 5, allergensFromWeek: 2, freeWeeks: 2, early: ['egg', 'whitefish'] },
  // Ligação, por idioma, para formação oficial de primeiros socorros pediátricos (aparece no guia sobre engasgamento).
  links: { firstAid: { pt: '', en: '', es: '', fr: '' } },
  // Diário dos pais: duração máxima de cada gravação de voz, em segundos.
  journal: { maxSeconds: 180 },
  // Cartão opcional de um parceiro (por exemplo uma loja), desligado por omissão.
  // text: uma frase por idioma; só aparece nos idiomas que tiverem frase.
  // 12/11: ligado ao Clube das mães do site (só em português, porque o Clube só existe em português).
  partner: {
    enabled: true, name: 'Abrir o Clube das mães', url: 'https://petitnuvem.com/?view=clube',
    text: { pt: 'No Clube das mães da Petit Nuvem tens o calendário do Advento, um presente de boas-vindas e os artigos Mushie para as refeições do bebé.' }
  }
};
