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
  // Prémios dos marcos: certificado para partilhar e, quando os códigos existirem na loja, um código de desconto.
  // Códigos ativos no Shopify desde 21/11 (excluem kits e packs, por margem).
  // Por regra da loja, estes códigos não acumulam com as campanhas.
  // O código só aparece a quem tem sessão iniciada na conta da loja e cumpre as regras abaixo (o certificado é livre).
  rewards: {
    codesLive: true,
    shop: 'https://petitnuvem.com',
    codes: { 10: 'MARCO10', 25: 'MARCO25', 50: 'MARCO50', 100: 'MARCO100' },
    percent: { 10: 5, 25: 10, 50: 10, 100: 15 },
    minOrder: 25,
    // Para o prémio contam só alimentos registados numa refeição, no próprio dia ou até lateDays dias depois
    // (nada no futuro), no máximo newPerDay alimentos novos por dia, e depois de minDays dias desde o primeiro registo que conta.
    rules: { newPerDay: 3, lateDays: 2, minDays: { 10: 10, 25: 21, 50: 35, 100: 60 } }
  },
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
      textures: ['pack-de-2-colheres-de-silicone', 'prato-de-silicone-com-ventosa'],
      storage: ['molde-para-congelar-comida']
    },
    serve: { 6: 'tigela-com-ventosa-mushie', 9: 'prato-de-silicone-com-ventosa', 12: 'potinho-para-snacks' },
    // Cartão «Para esta fase» no Hoje: artigos por fase do bebé (6 = início dos sólidos, 7 = 7–8 meses, 9 = 9 meses ou mais).
    // Só artigos Mushie com stock físico (22/11: tirados os que vendem por encomenda). Sem preços na app, porque mudam com as campanhas.
    phases: {
      6: ['prato-de-silicone-com-ventosa', 'tigela-com-ventosa-mushie', 'pack-de-2-colheres-de-silicone', 'copinho-de-aprendizagem', 'babete-com-bolsinho'],
      // O kit volta a entrar quando a página dele tiver a foto do kit (hoje mostra só o babete).
      7: ['copinho-de-aprendizagem', 'babete-com-bolsinho', 'pack-de-2-colheres-de-silicone', 'molde-para-congelar-comida', 'prato-de-silicone-com-ventosa'],
      9: ['copo-de-treino-com-palhinha', 'potinho-para-snacks', 'molde-para-congelar-comida', 'babete-com-bolsinho']
    },
    // Fim do plano da semana (cozinhar de uma vez e guardar).
    plan: ['molde-para-congelar-comida', 'potinho-para-snacks', 'planeador-de-refeicoes-do-bebe-pdf'],
    utm: 'utm_source=app&utm_medium=sugestao',
    images: {
      'prato-de-silicone-com-ventosa': 'Ivory_SiliconePlate_Top_333f823c-0fe5-450e-b9aa-2a3b13316ac0.jpg?v=1791842900',
      'tigela-com-ventosa-mushie': 'cambridge_bowl_suction_bowl_side-2.jpg?v=1791842949',
      'pack-de-2-colheres-de-silicone': 'Blush_ShiftingSand_SiliconeSpoon_3a1f5eca-1576-443b-a080-0258bf54f0f4.jpg?v=1791843060',
      'copinho-de-aprendizagem': 'Blush_TrainerSippyCup.jpg?v=1791843708',
      'babete-com-bolsinho': 'FairyMice_SiliconeBib_dc8ade68-9a32-4341-ab5f-7b8045a6aa69.jpg?v=1791842699',
      'kit-primeiras-refeicoes-petit-nuvem': 'blush_silicone_bib_44fef9be-df4e-4e70-9f93-d0f9b17ef0ea.jpg?v=1791882254',
      'garfo-e-colher-mushie': 'Dinnerware_20Fork_20and_20Spoon_20Set_Blush.jpg?v=1792958406',
      'bola-giratoria-com-ventosa': 'Round_20Ball_20Suction_20Spinner.jpg?v=1792958405',
      'copos-de-empilhar-mushie': 'Original_Stacking_20Cups_Nested.jpg?v=1792958293',
      'copo-de-treino-com-palhinha': 'SiliconeTrainingCupandStraw_Whales.jpg?v=1792431027',
      'potinho-para-snacks': 'Whales_SnackCup.jpg?v=1792431038',
      'escova-de-dentes-flor': 'Flower_20Toothbrush_Blush_300968135.jpg?v=1792958407',
      'molde-para-congelar-comida': 'BabyFoodFreezerTray_Blush.jpg?v=1791843167',
      'planeador-de-refeicoes-do-bebe-pdf': 'petit-nuvem-digital-planeador.jpg?v=1793647072'
    },
    imageBase: 'https://cdn.shopify.com/s/files/1/1092/3832/1484/files/',
    names: {
      'copo-de-treino-com-palhinha': 'Copo de treino com palhinha', 'copinho-de-aprendizagem': 'Copinho de aprendizagem',
      'prato-de-silicone-com-ventosa': 'Prato de silicone com ventosa', 'tigela-com-ventosa-mushie': 'Tigela com ventosa',
      'babete-com-bolsinho': 'Babete com bolsinho', 'pack-de-2-colheres-de-silicone': 'Pack de 2 colheres de silicone',
      'garfo-e-colher-mushie': 'Conjunto de garfo e colher', 'molde-para-congelar-comida': 'Molde para congelar comida',
      'kit-primeiras-refeicoes-petit-nuvem': 'Kit primeiras refeições', 'bola-giratoria-com-ventosa': 'Bola giratória com ventosa',
      'copos-de-empilhar-mushie': 'Copos de empilhar', 'potinho-para-snacks': 'Potinho para snacks', 'escova-de-dentes-flor': 'Escova de dentes de treino flor',
      'planeador-de-refeicoes-do-bebe-pdf': 'Planeador de refeições do bebé (PDF)'
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
