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
  // Preços decididos a 12/11. yearly: preço normal do plano anual. monthly: plano mensal (0 esconde o plano mensal).
  // launch: preço de lançamento do primeiro ano. yearly: 0 desliga o lançamento. until: último dia do lançamento
  // (AAAA-MM-DD); vazio = sem data de fim, até o Diogo indicar uma.
  // autoRenew: true se a subscrição renovar sozinha; o ecrã de subscrição diz sempre, junto ao botão, se renova ou não.
  // trialDays: dias de teste grátis (0 = sem teste). Só faz sentido se a forma de pagamento escolhida o permitir.
  // checkout: ligação de compra de cada plano. Pagamentos ainda por decidir (hipótese mais provável: Premium anual
  // vendido na loja da Shopify, sem renovação automática). Não montar Stripe sem o Diogo confirmar.
  subscription: {
    // Decisão de 12/11: só plano anual, compra única, sem teste grátis (trialDays: 0) e sem plano mensal (monthly: 0).
    enabled: true, enforce: false, currency: 'EUR', trialDays: 0,
    monthly: 0, yearly: 39.99,
    launch: { yearly: 29.99, until: '' },
    autoRenew: false,
    // Quando o artigo for publicado na loja: yearly: 'https://petitnuvem.com/products/petit-nuvem-premium-anual'
    checkout: { monthly: '', yearly: '' },
    freeStage: 6, // receitas até esta fase (meses) são gratuitas
    // Decidido a 12/11: os guias são todos gratuitos, tal como o relatório para o pediatra e a cópia de segurança
    // (exportar e importar ficam sempre gratuitos). Para voltar a ter guias pagos, pôr aqui a lista dos gratuitos,
    // por exemplo freeGuides: ['ready', 'gagging']; sem lista, todos os guias são gratuitos.
    // O que só existe com subscrição (true = premium, false = gratuito).
    premium: { parentsJournal: true, journalBook: true, report: false, extraBabies: true, weekPlan: true }
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
  // Sugestões de artigos da loja, só onde vêm a propósito (fim de alguns guias e do «como servir»).
  // languages: idiomas em que aparecem (a loja só existe em português). enabled: false desliga tudo.
  // guides: artigos por guia (id do guia -> identificadores dos produtos na loja). serve: um artigo por fase.
  shop: {
    enabled: true, languages: ['pt'], base: 'https://petitnuvem.com/products/',
    guides: {
      water: ['copo-de-treino-com-palhinha', 'copinho-de-aprendizagem'],
      routine: ['prato-de-silicone-com-ventosa', 'tigela-com-ventosa-mushie', 'babete-com-bolsinho'],
      textures: ['pack-de-2-colheres-de-silicone', 'garfo-e-colher-mushie'],
      storage: ['molde-para-congelar-comida']
    },
    serve: { 6: 'tigela-com-ventosa-mushie', 9: 'prato-de-silicone-com-ventosa', 12: 'garfo-e-colher-mushie' },
    names: {
      'copo-de-treino-com-palhinha': 'Copo de treino com palhinha', 'copinho-de-aprendizagem': 'Copinho de aprendizagem',
      'prato-de-silicone-com-ventosa': 'Prato de silicone com ventosa', 'tigela-com-ventosa-mushie': 'Tigela com ventosa',
      'babete-com-bolsinho': 'Babete com bolsinho', 'pack-de-2-colheres-de-silicone': 'Pack de 2 colheres de silicone',
      'garfo-e-colher-mushie': 'Conjunto de garfo e colher', 'molde-para-congelar-comida': 'Molde para congelar comida'
    }
  },
  // Conta: a conta da app é a conta de cliente da loja Shopify (Customer Account API, cliente público com PKCE).
  // O clientId não é secreto. redirect tem de ser igual ao «Callback URI» configurado na loja.
  // graphql: endereço da API; vazio = descoberto em <shop>/.well-known/customer-account-api.
  // premium: artigo que dá o Premium e durante quantos dias depois da compra.
  // Na loja, a Customer Account API precisa das permissões de leitura de clientes e de encomendas.
  account: {
    enabled: true,
    clientId: '085d7fb3-85f2-4b8e-905f-c656e07f615e',
    authorize: 'https://account.petitnuvem.com/authentication/oauth/authorize',
    token: 'https://account.petitnuvem.com/authentication/oauth/token',
    logout: 'https://account.petitnuvem.com/authentication/logout',
    redirect: 'https://app.petitnuvem.com/',
    shop: 'https://petitnuvem.com',
    graphql: '',
    scope: 'openid email customer-account-api:full',
    premium: { productId: 'gid://shopify/Product/16308872708428', handle: 'petit-nuvem-premium-anual', title: 'Petit Nuvem Premium: 1 ano', days: 365 }
  },
  // Cartão opcional de um parceiro (por exemplo uma loja), desligado por omissão.
  // text: uma frase por idioma; só aparece nos idiomas que tiverem frase.
  // 12/11: ligado ao Clube das mães do site (só em português, porque o Clube só existe em português).
  partner: {
    enabled: true, name: 'Abrir o Clube das mães', url: 'https://petitnuvem.com/?view=clube',
    text: { pt: 'No Clube das mães da Petit Nuvem tens o calendário do Advento, um presente de boas-vindas e os artigos Mushie para as refeições do bebé.' }
  }
};
