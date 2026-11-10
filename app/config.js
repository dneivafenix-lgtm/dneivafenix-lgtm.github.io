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
    freeStage: 6 // receitas até esta fase (meses) são gratuitas
  },
  // Sobre o conteúdo: quem reviu (vazio até haver um profissional), quando, e as fontes usadas como base.
  content: { reviewedBy: '', reviewedOn: '', sources: ['SPP', 'OMS', 'NHS', 'HSE'] },
  // Páginas legais: entidade responsável, contacto e data da última atualização (AAAA-MM-DD).
  legal: { controller: 'Petit Nuvem', contact: '', updated: '2026-11-10' },
  // Programa de alergénios. A REVER POR PROFISSIONAL DE SAÚDE
  // introducedAfter: número de vezes sem reação para a app dar o alergénio como introduzido.
  // remindAfterDays: dias sem oferecer um alergénio já introduzido até a app lembrar.
  allergens: { introducedAfter: 3, remindAfterDays: 7 },
  // Ligação, por idioma, para formação oficial de primeiros socorros pediátricos (aparece no guia sobre engasgamento).
  links: { firstAid: { pt: '', en: '', es: '', fr: '' } },
  // Cartão opcional de um parceiro (por exemplo uma loja), desligado por omissão.
  // text: uma frase por idioma; só aparece nos idiomas que tiverem frase.
  partner: { enabled: false, name: '', url: '', text: {} }
};
