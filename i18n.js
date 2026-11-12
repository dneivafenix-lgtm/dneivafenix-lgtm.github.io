// Textos da interface. Para um novo idioma, copie um bloco e traduza.
window.DiaryI18n = {
  pt: {
    langName: 'Português', tagline: 'Diário de introdução alimentar',
    tabToday: 'Hoje', tabFoods: 'Alimentos', tabProgress: 'Progresso', tabSettings: 'Definições',
    today: 'Hoje', prevDay: 'Dia anterior', nextDay: 'Dia seguinte',
    addFood: '+ Registar alimento', emptyDay: 'Ainda sem registos neste dia.',
    ageMonths: n => n === 1 ? '1 mês' : `${n} meses`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: 'Indica o nome e a data de nascimento nas Definições para ver a idade aqui.',
    search: 'Procurar alimento…', all: 'Todos', noResults: 'Nenhum alimento encontrado.',
    cat: { veg: 'Legumes', fruit: 'Fruta', grain: 'Cereais', protein: 'Proteínas', dairy: 'Laticínios', herb: 'Ervas e especiarias', other: 'Outros' },
    allergenName: { egg: 'Ovo', milk: 'Leite', peanut: 'Amendoim', nuts: 'Frutos secos', gluten: 'Glúten', fish: 'Peixe', shellfish: 'Marisco', soy: 'Soja', sesame: 'Sésamo' },
    allergenBadge: 'Alergénio', triedTimes: n => n === 1 ? 'Provou 1 vez' : `Provou ${n} vezes`, notTried: 'Ainda não provou',
    infoAllergen: a => `Alergénio comum (${a}). Oferece em pequena quantidade, um alergénio novo de cada vez, e observa nas horas seguintes.`,
    infoMin12: 'Não oferecer antes dos 12 meses.',
    infoChoke: 'Risco de engasgamento: oferece esmagado, moído ou cortado em pedaços pequenos, nunca inteiro.',
    history: 'Histórico', logThis: 'Registar este alimento',
    howWasIt: 'Como correu?', liked: 'Gostou', neutral: 'Assim-assim', disliked: 'Não gostou',
    suspectReaction: 'Suspeita de reação (pele, vómitos, outro)', note: 'Nota (opcional)',
    save: 'Guardar', cancel: 'Cancelar', remove: 'Apagar', close: 'Fechar', reactionFlag: 'Suspeita de reação',
    foodsTried: 'alimentos provados', byCategory: 'Por categoria', allergensTitle: 'Alergénios introduzidos',
    introduced: 'Introduzido', pending: 'Por introduzir', reactionsTitle: 'Suspeitas de reação', noReactions: 'Nenhuma suspeita registada.',
    reactionAdvice: 'Fala com o pediatra antes de voltares a oferecer estes alimentos.',
    language: 'Idioma', babyName: 'Nome do bebé', birthDate: 'Data de nascimento',
    data: 'Os teus dados', dataNote: 'Tudo fica guardado apenas neste dispositivo. Faz uma cópia para não perderes os registos.',
    exportData: 'Exportar cópia', importData: 'Importar cópia', clearData: 'Apagar tudo',
    confirmClear: 'Apagar todos os registos? Não é possível desfazer.', importOk: 'Cópia importada.', importFail: 'Ficheiro inválido.',
    disclaimer: 'Esta app é um diário e não substitui o aconselhamento médico. As recomendações variam de país para país: segue as indicações do pediatra do teu bebé. Em caso de dificuldade em respirar ou inchaço da cara, liga para o 112 (número de emergência em Portugal e na União Europeia).',
    tips: ['Um alimento novo de cada vez ajuda a perceber o que o bebé gosta e tolera.', 'Recusar à primeira é normal. Volta a oferecer noutro dia, sem insistir.', 'Sem sal e sem açúcar adicionados nas primeiras refeições.', 'O bebé deve comer sentado e sempre acompanhado por um adulto.', 'Oferece alergénios novos de manhã, para poderes observar durante o dia.']
  },
  en: {
    langName: 'English', tagline: 'Starting solids diary',
    tabToday: 'Today', tabFoods: 'Foods', tabProgress: 'Progress', tabSettings: 'Settings',
    today: 'Today', prevDay: 'Previous day', nextDay: 'Next day',
    addFood: '+ Log a food', emptyDay: 'Nothing logged for this day yet.',
    ageMonths: n => n === 1 ? '1 month' : `${n} months`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: "Add your baby's name and date of birth in Settings to see their age here.",
    search: 'Search foods…', all: 'All', noResults: 'No foods found.',
    cat: { veg: 'Vegetables', fruit: 'Fruit', grain: 'Grains', protein: 'Proteins', dairy: 'Dairy', herb: 'Herbs & spices', other: 'Other' },
    allergenName: { egg: 'Egg', milk: 'Milk', peanut: 'Peanut', nuts: 'Tree nuts', gluten: 'Gluten', fish: 'Fish', shellfish: 'Shellfish', soy: 'Soy', sesame: 'Sesame' },
    allergenBadge: 'Allergen', triedTimes: n => n === 1 ? 'Tried once' : `Tried ${n} times`, notTried: 'Not tried yet',
    infoAllergen: a => `Common allergen (${a}). Offer a small amount, one new allergen at a time, and watch over the following hours.`,
    infoMin12: 'Do not offer before 12 months.',
    infoChoke: 'Choking risk: offer mashed, ground or cut into small pieces, never whole.',
    history: 'History', logThis: 'Log this food',
    howWasIt: 'How did it go?', liked: 'Liked it', neutral: 'So-so', disliked: 'Disliked it',
    suspectReaction: 'Suspected reaction (skin, vomiting, other)', note: 'Note (optional)',
    save: 'Save', cancel: 'Cancel', remove: 'Delete', close: 'Close', reactionFlag: 'Suspected reaction',
    foodsTried: 'foods tried', byCategory: 'By category', allergensTitle: 'Allergens introduced',
    introduced: 'Introduced', pending: 'Not yet', reactionsTitle: 'Suspected reactions', noReactions: 'No suspected reactions logged.',
    reactionAdvice: 'Talk to your paediatrician before offering these foods again.',
    language: 'Language', babyName: "Baby's name", birthDate: 'Date of birth',
    data: 'Your data', dataNote: 'Everything is stored only on this device. Export a backup so you do not lose your records.',
    exportData: 'Export backup', importData: 'Import backup', clearData: 'Delete everything',
    confirmClear: 'Delete all records? This cannot be undone.', importOk: 'Backup imported.', importFail: 'Invalid file.',
    disclaimer: "This app is a diary and does not replace medical advice. Guidance varies between countries: follow your baby's paediatrician. If your baby has trouble breathing or facial swelling, call your emergency number (112 in the EU, 999 in the UK, 911 in the US).",
    tips: ['One new food at a time helps you see what your baby likes and tolerates.', 'Refusing at first is normal. Offer it again another day, without pressure.', 'No added salt or sugar in first foods.', 'Your baby should eat sitting up, always with an adult present.', 'Offer new allergens in the morning so you can watch during the day.']
  },
  es: {
    langName: 'Español', tagline: 'Diario de alimentación complementaria',
    tabToday: 'Hoy', tabFoods: 'Alimentos', tabProgress: 'Progreso', tabSettings: 'Ajustes',
    today: 'Hoy', prevDay: 'Día anterior', nextDay: 'Día siguiente',
    addFood: '+ Registrar alimento', emptyDay: 'Aún no hay registros este día.',
    ageMonths: n => n === 1 ? '1 mes' : `${n} meses`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: 'Indica el nombre y la fecha de nacimiento en Ajustes para ver aquí la edad.',
    search: 'Buscar alimento…', all: 'Todos', noResults: 'No se encontró ningún alimento.',
    cat: { veg: 'Verduras', fruit: 'Fruta', grain: 'Cereales', protein: 'Proteínas', dairy: 'Lácteos', herb: 'Hierbas y especias', other: 'Otros' },
    allergenName: { egg: 'Huevo', milk: 'Leche', peanut: 'Cacahuete', nuts: 'Frutos secos', gluten: 'Gluten', fish: 'Pescado', shellfish: 'Marisco', soy: 'Soja', sesame: 'Sésamo' },
    allergenBadge: 'Alérgeno', triedTimes: n => n === 1 ? 'Lo probó 1 vez' : `Lo probó ${n} veces`, notTried: 'Aún no lo ha probado',
    infoAllergen: a => `Alérgeno frecuente (${a}). Ofrece una cantidad pequeña, un alérgeno nuevo cada vez, y observa en las horas siguientes.`,
    infoMin12: 'No ofrecer antes de los 12 meses.',
    infoChoke: 'Riesgo de atragantamiento: ofrécelo aplastado, molido o en trozos pequeños, nunca entero.',
    history: 'Historial', logThis: 'Registrar este alimento',
    howWasIt: '¿Cómo fue?', liked: 'Le gustó', neutral: 'Regular', disliked: 'No le gustó',
    suspectReaction: 'Sospecha de reacción (piel, vómitos, otro)', note: 'Nota (opcional)',
    save: 'Guardar', cancel: 'Cancelar', remove: 'Borrar', close: 'Cerrar', reactionFlag: 'Sospecha de reacción',
    foodsTried: 'alimentos probados', byCategory: 'Por categoría', allergensTitle: 'Alérgenos introducidos',
    introduced: 'Introducido', pending: 'Pendiente', reactionsTitle: 'Sospechas de reacción', noReactions: 'Ninguna sospecha registrada.',
    reactionAdvice: 'Habla con el pediatra antes de volver a ofrecer estos alimentos.',
    language: 'Idioma', babyName: 'Nombre del bebé', birthDate: 'Fecha de nacimiento',
    data: 'Tus datos', dataNote: 'Todo se guarda solo en este dispositivo. Exporta una copia para no perder los registros.',
    exportData: 'Exportar copia', importData: 'Importar copia', clearData: 'Borrar todo',
    confirmClear: '¿Borrar todos los registros? No se puede deshacer.', importOk: 'Copia importada.', importFail: 'Archivo no válido.',
    disclaimer: 'Esta app es un diario y no sustituye el consejo médico. Las recomendaciones varían según el país: sigue las indicaciones del pediatra de tu bebé. Si tiene dificultad para respirar o hinchazón en la cara, llama al 112 (número de emergencias en España y en la Unión Europea).',
    tips: ['Un alimento nuevo cada vez ayuda a ver qué le gusta y qué tolera.', 'Rechazarlo al principio es normal. Vuelve a ofrecerlo otro día, sin insistir.', 'Sin sal ni azúcar añadidos en las primeras comidas.', 'El bebé debe comer sentado y siempre acompañado por un adulto.', 'Ofrece los alérgenos nuevos por la mañana para poder observar durante el día.']
  },
  fr: {
    langName: 'Français', tagline: 'Journal de diversification alimentaire',
    tabToday: "Aujourd'hui", tabFoods: 'Aliments', tabProgress: 'Progrès', tabSettings: 'Réglages',
    today: "Aujourd'hui", prevDay: 'Jour précédent', nextDay: 'Jour suivant',
    addFood: '+ Noter un aliment', emptyDay: 'Rien de noté pour ce jour.',
    ageMonths: n => `${n} mois`, ageLine: (name, age) => `${name} · ${age}`,
    setupHint: "Indiquez le prénom et la date de naissance dans Réglages pour voir l'âge ici.",
    search: 'Chercher un aliment…', all: 'Tous', noResults: 'Aucun aliment trouvé.',
    cat: { veg: 'Légumes', fruit: 'Fruits', grain: 'Céréales', protein: 'Protéines', dairy: 'Laitages', herb: 'Herbes et épices', other: 'Autres' },
    allergenName: { egg: 'Œuf', milk: 'Lait', peanut: 'Arachide', nuts: 'Fruits à coque', gluten: 'Gluten', fish: 'Poisson', shellfish: 'Crustacés', soy: 'Soja', sesame: 'Sésame' },
    allergenBadge: 'Allergène', triedTimes: n => n === 1 ? 'Goûté 1 fois' : `Goûté ${n} fois`, notTried: 'Pas encore goûté',
    infoAllergen: a => `Allergène courant (${a}). Proposez une petite quantité, un seul nouvel allergène à la fois, et observez dans les heures qui suivent.`,
    infoMin12: 'Ne pas proposer avant 12 mois.',
    infoChoke: "Risque d'étouffement : proposez écrasé, moulu ou coupé en petits morceaux, jamais entier.",
    history: 'Historique', logThis: 'Noter cet aliment',
    howWasIt: "Comment ça s'est passé ?", liked: 'A aimé', neutral: 'Bof', disliked: "N'a pas aimé",
    suspectReaction: 'Réaction suspectée (peau, vomissements, autre)', note: 'Note (facultatif)',
    save: 'Enregistrer', cancel: 'Annuler', remove: 'Supprimer', close: 'Fermer', reactionFlag: 'Réaction suspectée',
    foodsTried: 'aliments goûtés', byCategory: 'Par catégorie', allergensTitle: 'Allergènes introduits',
    introduced: 'Introduit', pending: 'À introduire', reactionsTitle: 'Réactions suspectées', noReactions: 'Aucune réaction suspectée notée.',
    reactionAdvice: 'Parlez-en au pédiatre avant de proposer à nouveau ces aliments.',
    language: 'Langue', babyName: 'Prénom du bébé', birthDate: 'Date de naissance',
    data: 'Vos données', dataNote: 'Tout est enregistré uniquement sur cet appareil. Exportez une copie pour ne rien perdre.',
    exportData: 'Exporter une copie', importData: 'Importer une copie', clearData: 'Tout supprimer',
    confirmClear: 'Supprimer toutes les notes ? Cette action est définitive.', importOk: 'Copie importée.', importFail: 'Fichier invalide.',
    disclaimer: "Cette app est un journal et ne remplace pas un avis médical. Les recommandations varient selon les pays : suivez les conseils du pédiatre de votre bébé. En cas de difficulté à respirer ou de gonflement du visage, appelez le 112 (numéro d’urgence en France et dans l’Union européenne).",
    tips: ["Un seul nouvel aliment à la fois aide à voir ce que bébé aime et tolère.", "Refuser au début est normal. Proposez à nouveau un autre jour, sans insister.", 'Ni sel ni sucre ajoutés dans les premiers repas.', "Bébé doit manger assis, toujours en présence d'un adulte.", 'Proposez les nouveaux allergènes le matin pour pouvoir observer dans la journée.']
  }
};

// Boas-vindas, marcos e relatório.
Object.assign(window.DiaryI18n.pt, {
  obTitle: 'Os primeiros alimentos do teu bebé, bem registados.',
  obLead: 'Um diário simples para a introdução alimentar, dos primeiros purés aos 100 alimentos.',
  obPoints: ['Regista o que o bebé provou, se gostou e como reagiu.', 'Acompanha os alergénios já introduzidos.', 'Leva um relatório claro à consulta do pediatra.'],
  obAccept: 'Compreendo que esta app é um diário e não substitui o aconselhamento do pediatra.',
  obPrivacy: 'Sem conta e sem publicidade. Os dados ficam apenas neste dispositivo.',
  obStart: 'Começar',
  nextMilestone: n => `Próximo marco: ${n} alimentos`, allDone: 'Completaste os 100 alimentos.',
  reportOpen: 'Relatório para o pediatra', reportTitle: 'Relatório de introdução alimentar', reportBack: 'Voltar ao progresso', reportPrint: 'Imprimir ou guardar em PDF',
  reportDate: d => `Emitido a ${d}`, reportAge: a => `Idade: ${a}`,
  reportFood: 'Alimento', reportFirst: 'Primeira vez', reportTimes: 'Vezes', reportDateCol: 'Data', reportNoteCol: 'Nota', reportAllergen: 'Alergénio',
  reportFoods: 'Alimentos provados', reportNone: 'Ainda sem registos.'
});
Object.assign(window.DiaryI18n.en, {
  obTitle: "Your baby's first foods, properly recorded.",
  obLead: 'A simple diary for starting solids, from the first purées to 100 foods.',
  obPoints: ['Log what your baby tried, whether they liked it and how they reacted.', 'Keep track of the allergens already introduced.', "Bring a clear report to your paediatrician's appointment."],
  obAccept: "I understand this app is a diary and does not replace my paediatrician's advice.",
  obPrivacy: 'No account and no ads. Your data stays on this device only.',
  obStart: 'Get started',
  nextMilestone: n => `Next milestone: ${n} foods`, allDone: 'All 100 foods completed.',
  reportOpen: 'Report for the paediatrician', reportTitle: 'Starting solids report', reportBack: 'Back to progress', reportPrint: 'Print or save as PDF',
  reportDate: d => `Issued on ${d}`, reportAge: a => `Age: ${a}`,
  reportFood: 'Food', reportFirst: 'First time', reportTimes: 'Times', reportDateCol: 'Date', reportNoteCol: 'Note', reportAllergen: 'Allergen',
  reportFoods: 'Foods tried', reportNone: 'Nothing logged yet.'
});
Object.assign(window.DiaryI18n.es, {
  obTitle: 'Los primeros alimentos de tu bebé, bien registrados.',
  obLead: 'Un diario sencillo para la alimentación complementaria, de los primeros purés a los 100 alimentos.',
  obPoints: ['Registra lo que probó tu bebé, si le gustó y cómo reaccionó.', 'Lleva el control de los alérgenos ya introducidos.', 'Lleva un informe claro a la consulta del pediatra.'],
  obAccept: 'Entiendo que esta app es un diario y no sustituye el consejo del pediatra.',
  obPrivacy: 'Sin cuenta y sin publicidad. Los datos se quedan solo en este dispositivo.',
  obStart: 'Empezar',
  nextMilestone: n => `Próximo hito: ${n} alimentos`, allDone: 'Has completado los 100 alimentos.',
  reportOpen: 'Informe para el pediatra', reportTitle: 'Informe de alimentación complementaria', reportBack: 'Volver al progreso', reportPrint: 'Imprimir o guardar en PDF',
  reportDate: d => `Emitido el ${d}`, reportAge: a => `Edad: ${a}`,
  reportFood: 'Alimento', reportFirst: 'Primera vez', reportTimes: 'Veces', reportDateCol: 'Fecha', reportNoteCol: 'Nota', reportAllergen: 'Alérgeno',
  reportFoods: 'Alimentos probados', reportNone: 'Aún no hay registros.'
});
Object.assign(window.DiaryI18n.fr, {
  obTitle: 'Les premiers aliments de votre bébé, bien notés.',
  obLead: 'Un journal simple pour la diversification alimentaire, des premières purées aux 100 aliments.',
  obPoints: ["Notez ce que bébé a goûté, s'il a aimé et comment il a réagi.", 'Suivez les allergènes déjà introduits.', 'Apportez un compte rendu clair chez le pédiatre.'],
  obAccept: "Je comprends que cette app est un journal et ne remplace pas l'avis du pédiatre.",
  obPrivacy: 'Sans compte et sans publicité. Vos données restent uniquement sur cet appareil.',
  obStart: 'Commencer',
  nextMilestone: n => `Prochaine étape : ${n} aliments`, allDone: 'Les 100 aliments sont complétés.',
  reportOpen: 'Compte rendu pour le pédiatre', reportTitle: 'Compte rendu de diversification', reportBack: 'Retour aux progrès', reportPrint: 'Imprimer ou enregistrer en PDF',
  reportDate: d => `Établi le ${d}`, reportAge: a => `Âge : ${a}`,
  reportFood: 'Aliment', reportFirst: 'Première fois', reportTimes: 'Fois', reportDateCol: 'Date', reportNoteCol: 'Note', reportAllergen: 'Allergène',
  reportFoods: 'Aliments goûtés', reportNone: 'Rien de noté pour le moment.'
});

// Semana, observação de alergénios, sugestão do dia e estatísticas.
Object.assign(window.DiaryI18n.pt, {
  prevWeek: 'Semana anterior', nextWeek: 'Semana seguinte',
  checkEyebrow: 'Alergénio em observação', checkTitle: f => `${f}: houve alguma reação?`, checkNone: 'Sem reação', checkYes: 'Houve reação',
  suggestTitle: 'Sugestão de hoje', logShort: 'Registar',
  statLogs: n => n === 1 ? 'registo' : 'registos', statStreak: n => n === 1 ? 'dia seguido' : 'dias seguidos', statDays: n => n === 1 ? 'dia com registo' : 'dias com registo',
  lastOffered: d => `Última vez: ${d}`,
  allergenKeep: 'Depois de introduzido sem reação, é habitual manter o alergénio na alimentação regular. Confirma a frequência com o pediatra.',
  retryTitle: 'Para voltar a oferecer', retryNote: 'Recusar à primeira é normal: muitos bebés precisam de provar várias vezes.'
});
Object.assign(window.DiaryI18n.en, {
  prevWeek: 'Previous week', nextWeek: 'Next week',
  checkEyebrow: 'Allergen under watch', checkTitle: f => `${f}: any reaction?`, checkNone: 'No reaction', checkYes: 'There was a reaction',
  suggestTitle: "Today's suggestion", logShort: 'Log',
  statLogs: n => n === 1 ? 'entry' : 'entries', statStreak: n => 'day streak', statDays: n => n === 1 ? 'day logged' : 'days logged',
  lastOffered: d => `Last time: ${d}`,
  allergenKeep: 'Once introduced without a reaction, allergens are usually kept in the regular diet. Check how often with your paediatrician.',
  retryTitle: 'Worth offering again', retryNote: 'Refusing at first is normal: many babies need several tries.'
});
Object.assign(window.DiaryI18n.es, {
  prevWeek: 'Semana anterior', nextWeek: 'Semana siguiente',
  checkEyebrow: 'Alérgeno en observación', checkTitle: f => `${f}: ¿hubo alguna reacción?`, checkNone: 'Sin reacción', checkYes: 'Hubo reacción',
  suggestTitle: 'Sugerencia de hoy', logShort: 'Registrar',
  statLogs: n => n === 1 ? 'registro' : 'registros', statStreak: n => n === 1 ? 'día seguido' : 'días seguidos', statDays: n => n === 1 ? 'día con registro' : 'días con registro',
  lastOffered: d => `Última vez: ${d}`,
  allergenKeep: 'Una vez introducido sin reacción, lo habitual es mantener el alérgeno en la alimentación. Consulta la frecuencia con el pediatra.',
  retryTitle: 'Para volver a ofrecer', retryNote: 'Rechazarlo al principio es normal: muchos bebés necesitan probarlo varias veces.'
});
Object.assign(window.DiaryI18n.fr, {
  prevWeek: 'Semaine précédente', nextWeek: 'Semaine suivante',
  checkEyebrow: 'Allergène à surveiller', checkTitle: f => `${f} : une réaction ?`, checkNone: 'Aucune réaction', checkYes: 'Il y a eu une réaction',
  suggestTitle: 'Suggestion du jour', logShort: 'Noter',
  statLogs: n => n === 1 ? 'note' : 'notes', statStreak: n => n === 1 ? 'jour de suite' : 'jours de suite', statDays: n => n === 1 ? 'jour noté' : 'jours notés',
  lastOffered: d => `Dernière fois : ${d}`,
  allergenKeep: "Une fois introduit sans réaction, l'allergène est généralement maintenu dans l'alimentation. Vérifiez la fréquence avec le pédiatre.",
  retryTitle: 'À proposer de nouveau', retryNote: "Refuser au début est normal : beaucoup de bébés ont besoin de plusieurs essais."
});

// Receitas.
Object.assign(window.DiaryI18n.pt, {
  tabRecipes: 'Receitas', recipeOfDay: 'Receita do dia', recipesAll: 'Todas', stage: n => `${n}+ meses`, searchRecipes: 'Procurar receita…',
  ingredients: 'Ingredientes', howTo: 'Como fazer', recipeFoods: 'Alimentos desta receita', recipeFoodsHint: 'Toca num alimento para o registares no dia de hoje.',
  recipesWith: 'Receitas com este alimento', recipesEmpty: 'Nenhuma receita encontrada.',
  recipeNote: 'Adapta a textura à fase do bebé e segue as orientações do pediatra sobre a introdução de novos alimentos.',
  bookTitle: 'Mais receitas no livro «A Primeira Colher»', bookText: 'Livro digital com receitas dos 6 aos 12 meses, organizadas por fase.', bookCta: 'Ver o livro'
});
Object.assign(window.DiaryI18n.en, {
  tabRecipes: 'Recipes', recipeOfDay: 'Recipe of the day', recipesAll: 'All', stage: n => `${n}+ months`, searchRecipes: 'Search recipes…',
  ingredients: 'Ingredients', howTo: 'Method', recipeFoods: 'Foods in this recipe', recipeFoodsHint: 'Tap a food to log it for today.',
  recipesWith: 'Recipes with this food', recipesEmpty: 'No recipes found.',
  recipeNote: "Adapt the texture to your baby's stage and follow your paediatrician's guidance on new foods.",
  bookTitle: 'More recipes in the book “The First Spoon”', bookText: 'A digital book with recipes from 6 to 12 months, organised by stage.', bookCta: 'See the book'
});
Object.assign(window.DiaryI18n.es, {
  tabRecipes: 'Recetas', recipeOfDay: 'Receta del día', recipesAll: 'Todas', stage: n => `${n}+ meses`, searchRecipes: 'Buscar receta…',
  ingredients: 'Ingredientes', howTo: 'Preparación', recipeFoods: 'Alimentos de esta receta', recipeFoodsHint: 'Toca un alimento para registrarlo hoy.',
  recipesWith: 'Recetas con este alimento', recipesEmpty: 'No se encontró ninguna receta.',
  recipeNote: 'Adapta la textura a la etapa del bebé y sigue las indicaciones del pediatra sobre los alimentos nuevos.',
  bookTitle: 'Más recetas en el libro', bookText: 'Libro digital con recetas de los 6 a los 12 meses, organizadas por etapa.', bookCta: 'Ver el libro'
});
Object.assign(window.DiaryI18n.fr, {
  tabRecipes: 'Recettes', recipeOfDay: 'Recette du jour', recipesAll: 'Toutes', stage: n => `${n}+ mois`, searchRecipes: 'Chercher une recette…',
  ingredients: 'Ingrédients', howTo: 'Préparation', recipeFoods: 'Aliments de cette recette', recipeFoodsHint: "Touchez un aliment pour le noter aujourd'hui.",
  recipesWith: 'Recettes avec cet aliment', recipesEmpty: 'Aucune recette trouvée.',
  recipeNote: "Adaptez la texture à l'étape de bébé et suivez les conseils du pédiatre sur les nouveaux aliments.",
  bookTitle: 'Plus de recettes dans le livre', bookText: 'Livre numérique avec des recettes de 6 à 12 mois, classées par étape.', bookCta: 'Voir le livre'
});

// Calorias das receitas.
Object.assign(window.DiaryI18n.pt, {
  kcal: { portion: n => `≈ ${n} kcal por porção`, unit: n => `≈ ${n} kcal por unidade`, family: n => `≈ ${n} kcal por porção de adulto` },
  kcalNote: 'Calorias estimadas a partir dos ingredientes. Servem de referência, não de meta: o apetite do bebé varia de dia para dia.'
});
Object.assign(window.DiaryI18n.en, {
  kcal: { portion: n => `≈ ${n} kcal per serving`, unit: n => `≈ ${n} kcal each`, family: n => `≈ ${n} kcal per adult serving` },
  kcalNote: "Calories are estimated from the ingredients. They are a reference, not a target: a baby's appetite varies from day to day."
});
Object.assign(window.DiaryI18n.es, {
  kcal: { portion: n => `≈ ${n} kcal por ración`, unit: n => `≈ ${n} kcal por unidad`, family: n => `≈ ${n} kcal por ración de adulto` },
  kcalNote: 'Calorías estimadas a partir de los ingredientes. Sirven de referencia, no de objetivo: el apetito del bebé varía de un día a otro.'
});
Object.assign(window.DiaryI18n.fr, {
  kcal: { portion: n => `≈ ${n} kcal par portion`, unit: n => `≈ ${n} kcal pièce`, family: n => `≈ ${n} kcal par portion adulte` },
  kcalNote: "Calories estimées à partir des ingrédients. Elles servent de repère, pas d'objectif : l'appétit de bébé varie d'un jour à l'autre."
});

// Vários bebés, plano da semana e lista de compras.
Object.assign(window.DiaryI18n.pt, {
  babies: 'Bebés', babyDefault: 'Bebé', addBaby: '+ Adicionar bebé', removeBaby: 'Remover este bebé',
  confirmRemoveBaby: n => `Remover ${n} e todos os seus registos? Não é possível desfazer.`,
  segPlan: 'Plano da semana', segShop: 'Lista de compras', planAdd: '+ Adicionar receita', planSuggest: 'Sugerir a semana', planClear: 'Limpar a semana',
  planEmpty: 'Sem receitas neste dia.', planDay: 'Plano do dia', addToPlan: 'Adicionar ao plano', chooseDay: 'Escolhe o dia', removeFromPlan: 'Remover do plano',
  planAdded: 'Adicionada ao plano.', shopEmpty: 'Adiciona receitas ao plano desta semana para veres aqui a lista de compras.',
  shopNote: 'Ingredientes das receitas do plano desta semana. Marca o que já tens.'
});
Object.assign(window.DiaryI18n.en, {
  babies: 'Babies', babyDefault: 'Baby', addBaby: '+ Add a baby', removeBaby: 'Remove this baby',
  confirmRemoveBaby: n => `Remove ${n} and all their records? This cannot be undone.`,
  segPlan: 'Weekly plan', segShop: 'Shopping list', planAdd: '+ Add a recipe', planSuggest: 'Suggest a week', planClear: 'Clear the week',
  planEmpty: 'No recipes for this day.', planDay: 'Plan for the day', addToPlan: 'Add to plan', chooseDay: 'Choose the day', removeFromPlan: 'Remove from plan',
  planAdded: 'Added to the plan.', shopEmpty: "Add recipes to this week's plan to see the shopping list here.",
  shopNote: "Ingredients for the recipes in this week's plan. Tick what you already have."
});
Object.assign(window.DiaryI18n.es, {
  babies: 'Bebés', babyDefault: 'Bebé', addBaby: '+ Añadir bebé', removeBaby: 'Quitar este bebé',
  confirmRemoveBaby: n => `¿Quitar a ${n} y todos sus registros? No se puede deshacer.`,
  segPlan: 'Plan semanal', segShop: 'Lista de la compra', planAdd: '+ Añadir receta', planSuggest: 'Sugerir la semana', planClear: 'Vaciar la semana',
  planEmpty: 'Sin recetas este día.', planDay: 'Plan del día', addToPlan: 'Añadir al plan', chooseDay: 'Elige el día', removeFromPlan: 'Quitar del plan',
  planAdded: 'Añadida al plan.', shopEmpty: 'Añade recetas al plan de esta semana para ver aquí la lista de la compra.',
  shopNote: 'Ingredientes de las recetas del plan de esta semana. Marca lo que ya tienes.'
});
Object.assign(window.DiaryI18n.fr, {
  babies: 'Bébés', babyDefault: 'Bébé', addBaby: '+ Ajouter un bébé', removeBaby: 'Retirer ce bébé',
  confirmRemoveBaby: n => `Retirer ${n} et toutes ses notes ? Cette action est définitive.`,
  segPlan: 'Menu de la semaine', segShop: 'Liste de courses', planAdd: '+ Ajouter une recette', planSuggest: 'Proposer une semaine', planClear: 'Vider la semaine',
  planEmpty: 'Aucune recette ce jour-là.', planDay: 'Menu du jour', addToPlan: 'Ajouter au menu', chooseDay: 'Choisissez le jour', removeFromPlan: 'Retirer du menu',
  planAdded: 'Ajoutée au menu.', shopEmpty: 'Ajoutez des recettes au menu de cette semaine pour voir ici la liste de courses.',
  shopNote: 'Ingrédients des recettes du menu de cette semaine. Cochez ce que vous avez déjà.'
});

// Subscrição.
Object.assign(window.DiaryI18n.pt, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: 'Tudo o que precisas para acompanhar a alimentação do teu bebé.',
  planYearly: 'Anual', planMonthly: 'Mensal', perYear: p => `${p} por ano`, perMonth: p => `${p} por mês`, subSave: n => `Poupa ${n}%`,
  trialNote: n => `Começa com ${n} dias grátis. Cancela quando quiseres.`, subStart: 'Começar o teste grátis',
  subSoon: 'Os pagamentos ainda não estão ativos.', subTest: 'Modo de teste: está tudo desbloqueado.', subActive: 'Subscrição ativa.', subFree: 'Estás no plano gratuito.',
  subSee: 'Ver planos', subscription: 'Subscrição'
});
Object.assign(window.DiaryI18n.en, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: "Everything you need to follow your baby's first foods.",
  planYearly: 'Yearly', planMonthly: 'Monthly', perYear: p => `${p} per year`, perMonth: p => `${p} per month`, subSave: n => `Save ${n}%`,
  trialNote: n => `Start with ${n} days free. Cancel any time.`, subStart: 'Start the free trial',
  subSoon: 'Payments are not active yet.', subTest: 'Test mode: everything is unlocked.', subActive: 'Subscription active.', subFree: 'You are on the free plan.',
  subSee: 'See plans', subscription: 'Subscription'
});
Object.assign(window.DiaryI18n.es, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: 'Todo lo que necesitas para seguir la alimentación de tu bebé.',
  planYearly: 'Anual', planMonthly: 'Mensual', perYear: p => `${p} al año`, perMonth: p => `${p} al mes`, subSave: n => `Ahorra un ${n} %`,
  trialNote: n => `Empieza con ${n} días gratis. Cancela cuando quieras.`, subStart: 'Empezar la prueba gratis',
  subSoon: 'Los pagos aún no están activos.', subTest: 'Modo de prueba: todo está desbloqueado.', subActive: 'Suscripción activa.', subFree: 'Estás en el plan gratuito.',
  subSee: 'Ver planes', subscription: 'Suscripción'
});
Object.assign(window.DiaryI18n.fr, {
  premium: 'Premium', subTitle: 'Petit Nuvem Premium', subLead: "Tout ce qu'il faut pour suivre l'alimentation de votre bébé.",
  planYearly: 'Annuel', planMonthly: 'Mensuel', perYear: p => `${p} par an`, perMonth: p => `${p} par mois`, subSave: n => `Économisez ${n} %`,
  trialNote: n => `Commencez par ${n} jours gratuits. Résiliez quand vous voulez.`, subStart: "Commencer l'essai gratuit",
  subSoon: 'Les paiements ne sont pas encore actifs.', subTest: 'Mode test : tout est débloqué.', subActive: 'Abonnement actif.', subFree: 'Vous utilisez la formule gratuite.',
  subSee: 'Voir les formules', subscription: 'Abonnement'
});

// Ficha do alimento: como servir por idade.
Object.assign(window.DiaryI18n.pt, {
  serveTitle: 'Como servir', serveNow: 'Agora', badgeAllergen: a => `Alergénio: ${a}`, badgeChoke: 'Risco de engasgamento', badgeMin12: 'Só depois dos 12 meses',
  serveNote: 'Orientações gerais. Cada bebé tem o seu ritmo: adapta e confirma com o pediatra. O bebé come sempre sentado e vigiado.'
});
Object.assign(window.DiaryI18n.en, {
  serveTitle: 'How to serve', serveNow: 'Now', badgeAllergen: a => `Allergen: ${a}`, badgeChoke: 'Choking risk', badgeMin12: 'Only after 12 months',
  serveNote: 'General guidance. Every baby is different: adapt it and check with your paediatrician. Your baby should always eat sitting up and supervised.'
});
Object.assign(window.DiaryI18n.es, {
  serveTitle: 'Cómo servir', serveNow: 'Ahora', badgeAllergen: a => `Alérgeno: ${a}`, badgeChoke: 'Riesgo de atragantamiento', badgeMin12: 'Solo después de los 12 meses',
  serveNote: 'Orientaciones generales. Cada bebé tiene su ritmo: adáptalas y confírmalas con el pediatra. El bebé come siempre sentado y vigilado.'
});
Object.assign(window.DiaryI18n.fr, {
  serveTitle: 'Comment servir', serveNow: 'Maintenant', badgeAllergen: a => `Allergène : ${a}`, badgeChoke: "Risque d'étouffement", badgeMin12: 'Seulement après 12 mois',
  serveNote: 'Repères généraux. Chaque bébé avance à son rythme : adaptez et vérifiez avec le pédiatre. Bébé mange toujours assis et sous surveillance.'
});

// Calendário do mês e resumo do dia.
Object.assign(window.DiaryI18n.pt, {
  prevMonth: 'Mês anterior', nextMonth: 'Mês seguinte', daySummary: 'Resumo do dia', calDay: (d, n) => n ? `${d}, ${n} registos` : d,
  sumFoods: n => n === 1 ? '1 alimento' : `${n} alimentos`, sumNew: n => n === 1 ? '1 novo' : `${n} novos`,
  sumReactions: n => n === 1 ? '1 suspeita de reação' : `${n} suspeitas de reação`, sumPlanned: n => n === 1 ? '1 receita no plano' : `${n} receitas no plano`
});
Object.assign(window.DiaryI18n.en, {
  prevMonth: 'Previous month', nextMonth: 'Next month', daySummary: 'Day summary', calDay: (d, n) => n ? `${d}, ${n} entries` : d,
  sumFoods: n => n === 1 ? '1 food' : `${n} foods`, sumNew: n => `${n} new`,
  sumReactions: n => n === 1 ? '1 suspected reaction' : `${n} suspected reactions`, sumPlanned: n => n === 1 ? '1 planned recipe' : `${n} planned recipes`
});
Object.assign(window.DiaryI18n.es, {
  prevMonth: 'Mes anterior', nextMonth: 'Mes siguiente', daySummary: 'Resumen del día', calDay: (d, n) => n ? `${d}, ${n} registros` : d,
  sumFoods: n => n === 1 ? '1 alimento' : `${n} alimentos`, sumNew: n => n === 1 ? '1 nuevo' : `${n} nuevos`,
  sumReactions: n => n === 1 ? '1 sospecha de reacción' : `${n} sospechas de reacción`, sumPlanned: n => n === 1 ? '1 receta en el plan' : `${n} recetas en el plan`
});
Object.assign(window.DiaryI18n.fr, {
  prevMonth: 'Mois précédent', nextMonth: 'Mois suivant', daySummary: 'Résumé du jour', calDay: (d, n) => n ? `${d}, ${n} notes` : d,
  sumFoods: n => n === 1 ? '1 aliment' : `${n} aliments`, sumNew: n => n === 1 ? '1 nouveau' : `${n} nouveaux`,
  sumReactions: n => n === 1 ? '1 réaction suspectée' : `${n} réactions suspectées`, sumPlanned: n => n === 1 ? '1 recette au menu' : `${n} recettes au menu`
});

// Calendário com pontos por tipo, filtros, botão de adicionar e notas do dia.
Object.assign(window.DiaryI18n.pt, {
  legendFoods: 'Alimentos', legendPlan: 'Receitas', legendNotes: 'Notas', legendReactions: 'Reações', filterNew: 'Novos',
  add: 'Adicionar', addWhat: 'O que queres registar?', optFood: 'Alimento', optFoodHint: 'O que o bebé provou',
  optRecipe: 'Receita', optRecipeHint: 'Juntar ao plano deste dia', optNote: 'Nota', optNoteHint: 'Sono, apetite, humor, o que quiseres lembrar',
  noteTitle: 'Nota do dia', notePlaceholder: 'Escreve aqui…', editNote: 'Editar nota'
});
Object.assign(window.DiaryI18n.en, {
  legendFoods: 'Foods', legendPlan: 'Recipes', legendNotes: 'Notes', legendReactions: 'Reactions', filterNew: 'New',
  add: 'Add', addWhat: 'What would you like to log?', optFood: 'Food', optFoodHint: 'Something your baby tried',
  optRecipe: 'Recipe', optRecipeHint: "Add to this day's plan", optNote: 'Note', optNoteHint: 'Sleep, appetite, mood, anything worth remembering',
  noteTitle: 'Note for the day', notePlaceholder: 'Write here…', editNote: 'Edit note'
});
Object.assign(window.DiaryI18n.es, {
  legendFoods: 'Alimentos', legendPlan: 'Recetas', legendNotes: 'Notas', legendReactions: 'Reacciones', filterNew: 'Nuevos',
  add: 'Añadir', addWhat: '¿Qué quieres registrar?', optFood: 'Alimento', optFoodHint: 'Lo que probó el bebé',
  optRecipe: 'Receta', optRecipeHint: 'Añadir al plan de este día', optNote: 'Nota', optNoteHint: 'Sueño, apetito, humor, lo que quieras recordar',
  noteTitle: 'Nota del día', notePlaceholder: 'Escribe aquí…', editNote: 'Editar nota'
});
Object.assign(window.DiaryI18n.fr, {
  legendFoods: 'Aliments', legendPlan: 'Recettes', legendNotes: 'Notes', legendReactions: 'Réactions', filterNew: 'Nouveaux',
  add: 'Ajouter', addWhat: 'Que voulez-vous noter ?', optFood: 'Aliment', optFoodHint: 'Ce que bébé a goûté',
  optRecipe: 'Recette', optRecipeHint: 'Ajouter au menu de ce jour', optNote: 'Note', optNoteHint: "Sommeil, appétit, humeur, ce que vous voulez retenir",
  noteTitle: 'Note du jour', notePlaceholder: 'Écrivez ici…', editNote: 'Modifier la note'
});

// Ficha completa, programa de alergénios, próximos alimentos, guias, páginas legais e sobre o conteúdo.
// A REVER POR PROFISSIONAL DE SAÚDE: os textos de alergénios (alg*) abaixo.
Object.assign(window.DiaryI18n.pt, {
  fromAge: n => `A partir dos ${n} meses`, chokeLevel: { low: 'Engasgamento: risco baixo', medium: 'Engasgamento: risco médio', high: 'Engasgamento: risco alto' },
  nutriTitle: 'Destaques nutricionais', tipTitle: 'Dica',
  nextFoods: 'Próximos alimentos a provar', nextFoodsHint: 'Ainda não provados e adequados à idade.',
  algTitle: 'Programa de alergénios', algOpen: 'Abrir o programa de alergénios',
  algIntro: 'Os nove alergénios mais comuns, um de cada vez. Regista cada vez que os ofereces e a app mostra em que ponto estás.',
  algBefore: 'Antes de começares, fala com o pediatra se o bebé tem eczema grave, uma alergia alimentar já conhecida ou se já houve alguma suspeita de reação.',
  algState: { todo: 'Por introduzir', doing: 'Em curso', done: 'Introduzido', reaction: 'Suspeita de reação' },
  algCount: (n, m) => `${n} de ${m} vezes sem reação`, algNext: 'Próximo passo',
  algStep: { todo: 'Primeira vez: oferece uma pequena quantidade, de manhã, num dia em que o bebé esteja bem. Não introduzas outro alergénio novo no mesmo dia e observa nas horas seguintes.',
    doing: 'Repete nos próximos dias e vai aumentando a quantidade aos poucos, se não houver reação.',
    done: 'Mantém este alergénio na alimentação habitual do bebé.',
    reaction: 'Não voltes a oferecer antes de falares com o pediatra.' },
  algDue: n => `Não é oferecido há ${n} dias. Volta a oferecer para o manter na rotina.`, algDueCard: n => n === 1 ? '1 alergénio para voltar a oferecer' : `${n} alergénios para voltar a oferecer`,
  algFoods: 'Alimentos com este alergénio', algEmergency: 'Em caso de dificuldade em respirar ou inchaço da cara, liga para o 112 (número de emergência em Portugal e na União Europeia).',
  guidesTitle: 'Guias', guidesHint: 'O essencial para começar com segurança.', guideSources: s => `Base: orientações gerais de ${s}.`, firstAidLink: 'Formação em primeiros socorros pediátricos',
  aboutTitle: 'Sobre o conteúdo', aboutText: 'Os textos desta app são informação geral sobre introdução alimentar.',
  aboutReviewed: (who, when) => `Revisto por ${who}${when ? ' em ' + when : ''}.`, aboutNotReviewed: 'Ainda não foi revisto por um profissional de saúde.',
  aboutSources: s => `Fontes de referência: ${s}.`,
  legalTitle: 'Informação legal', legalPrivacy: 'Política de privacidade', legalTerms: 'Termos de utilização', legalMedical: 'Aviso médico',
  legalDraft: 'Rascunho, ainda sem revisão jurídica.', legalNoContact: '(contacto a indicar)'
});
Object.assign(window.DiaryI18n.en, {
  fromAge: n => `From ${n} months`, chokeLevel: { low: 'Choking: low risk', medium: 'Choking: medium risk', high: 'Choking: high risk' },
  nutriTitle: 'Nutrition highlights', tipTitle: 'Tip',
  nextFoods: 'Next foods to try', nextFoodsHint: "Not tried yet and right for your baby's age.",
  algTitle: 'Allergen programme', algOpen: 'Open the allergen programme',
  algIntro: 'The nine most common allergens, one at a time. Log each time you offer them and the app shows where you are.',
  algBefore: 'Before you start, talk to your paediatrician if your baby has severe eczema, a known food allergy, or has already had a suspected reaction.',
  algState: { todo: 'Not introduced', doing: 'In progress', done: 'Introduced', reaction: 'Suspected reaction' },
  algCount: (n, m) => `${n} of ${m} times without a reaction`, algNext: 'Next step',
  algStep: { todo: 'First time: offer a small amount, in the morning, on a day your baby is well. Do not introduce another new allergen on the same day, and watch over the following hours.',
    doing: 'Repeat over the next few days and increase the amount little by little, if there is no reaction.',
    done: "Keep this allergen in your baby's regular diet.",
    reaction: 'Do not offer it again before talking to your paediatrician.' },
  algDue: n => `Not offered for ${n} days. Offer it again to keep it in the routine.`, algDueCard: n => n === 1 ? '1 allergen to offer again' : `${n} allergens to offer again`,
  algFoods: 'Foods with this allergen', algEmergency: 'If your baby has trouble breathing or facial swelling, call your emergency number (112 in the EU, 999 in the UK, 911 in the US).',
  guidesTitle: 'Guides', guidesHint: 'The essentials for a safe start.', guideSources: s => `Based on general guidance from ${s}.`, firstAidLink: 'Paediatric first-aid training',
  aboutTitle: 'About the content', aboutText: 'The texts in this app are general information about starting solids.',
  aboutReviewed: (who, when) => `Reviewed by ${who}${when ? ' on ' + when : ''}.`, aboutNotReviewed: 'Not yet reviewed by a health professional.',
  aboutSources: s => `Reference sources: ${s}.`,
  legalTitle: 'Legal information', legalPrivacy: 'Privacy policy', legalTerms: 'Terms of use', legalMedical: 'Medical notice',
  legalDraft: 'Draft, not yet reviewed by a lawyer.', legalNoContact: '(contact to be added)'
});
Object.assign(window.DiaryI18n.es, {
  fromAge: n => `A partir de los ${n} meses`, chokeLevel: { low: 'Atragantamiento: riesgo bajo', medium: 'Atragantamiento: riesgo medio', high: 'Atragantamiento: riesgo alto' },
  nutriTitle: 'Aspectos nutricionales', tipTitle: 'Consejo',
  nextFoods: 'Próximos alimentos para probar', nextFoodsHint: 'Aún sin probar y adecuados a su edad.',
  algTitle: 'Programa de alérgenos', algOpen: 'Abrir el programa de alérgenos',
  algIntro: 'Los nueve alérgenos más comunes, de uno en uno. Registra cada vez que los ofreces y la app te muestra en qué punto estás.',
  algBefore: 'Antes de empezar, habla con el pediatra si el bebé tiene eccema grave, una alergia alimentaria ya conocida o si ya hubo alguna sospecha de reacción.',
  algState: { todo: 'Por introducir', doing: 'En curso', done: 'Introducido', reaction: 'Sospecha de reacción' },
  algCount: (n, m) => `${n} de ${m} veces sin reacción`, algNext: 'Siguiente paso',
  algStep: { todo: 'Primera vez: ofrece una cantidad pequeña, por la mañana, un día en que el bebé esté bien. No introduzcas otro alérgeno nuevo el mismo día y observa en las horas siguientes.',
    doing: 'Repite en los próximos días y aumenta la cantidad poco a poco, si no hay reacción.',
    done: 'Mantén este alérgeno en la alimentación habitual del bebé.',
    reaction: 'No vuelvas a ofrecerlo antes de hablar con el pediatra.' },
  algDue: n => `No se ofrece desde hace ${n} días. Vuelve a ofrecerlo para mantenerlo en la rutina.`, algDueCard: n => n === 1 ? '1 alérgeno para volver a ofrecer' : `${n} alérgenos para volver a ofrecer`,
  algFoods: 'Alimentos con este alérgeno', algEmergency: 'Si tiene dificultad para respirar o hinchazón en la cara, llama al 112 (número de emergencias en España y en la Unión Europea).',
  guidesTitle: 'Guías', guidesHint: 'Lo esencial para empezar con seguridad.', guideSources: s => `Base: orientaciones generales de ${s}.`, firstAidLink: 'Formación en primeros auxilios pediátricos',
  aboutTitle: 'Sobre el contenido', aboutText: 'Los textos de esta app son información general sobre alimentación complementaria.',
  aboutReviewed: (who, when) => `Revisado por ${who}${when ? ' el ' + when : ''}.`, aboutNotReviewed: 'Aún no ha sido revisado por un profesional sanitario.',
  aboutSources: s => `Fuentes de referencia: ${s}.`,
  legalTitle: 'Información legal', legalPrivacy: 'Política de privacidad', legalTerms: 'Términos de uso', legalMedical: 'Aviso médico',
  legalDraft: 'Borrador, aún sin revisión jurídica.', legalNoContact: '(contacto por indicar)'
});
Object.assign(window.DiaryI18n.fr, {
  fromAge: n => `À partir de ${n} mois`, chokeLevel: { low: "Étouffement : risque faible", medium: "Étouffement : risque moyen", high: "Étouffement : risque élevé" },
  nutriTitle: 'Atouts nutritionnels', tipTitle: 'Astuce',
  nextFoods: 'Prochains aliments à goûter', nextFoodsHint: "Pas encore goûtés et adaptés à l'âge de bébé.",
  algTitle: 'Programme allergènes', algOpen: 'Ouvrir le programme allergènes',
  algIntro: "Les neuf allergènes les plus courants, un à la fois. Notez chaque fois que vous les proposez et l'app montre où vous en êtes.",
  algBefore: "Avant de commencer, parlez au pédiatre si bébé a un eczéma sévère, une allergie alimentaire déjà connue ou s'il y a déjà eu une réaction suspectée.",
  algState: { todo: 'À introduire', doing: 'En cours', done: 'Introduit', reaction: 'Réaction suspectée' },
  algCount: (n, m) => `${n} fois sur ${m} sans réaction`, algNext: 'Prochaine étape',
  algStep: { todo: "Première fois : proposez une petite quantité, le matin, un jour où bébé va bien. N'introduisez pas d'autre nouvel allergène le même jour et observez dans les heures qui suivent.",
    doing: "Recommencez dans les jours suivants et augmentez la quantité petit à petit, s'il n'y a pas de réaction.",
    done: "Gardez cet allergène dans l'alimentation habituelle de bébé.",
    reaction: "Ne le proposez plus avant d'en avoir parlé au pédiatre." },
  algDue: n => `Pas proposé depuis ${n} jours. Proposez-le à nouveau pour le garder dans la routine.`, algDueCard: n => n === 1 ? '1 allergène à proposer de nouveau' : `${n} allergènes à proposer de nouveau`,
  algFoods: 'Aliments contenant cet allergène', algEmergency: 'En cas de difficulté à respirer ou de gonflement du visage, appelez le 112 (numéro d’urgence en France et dans l’Union européenne).',
  guidesTitle: 'Guides', guidesHint: "L'essentiel pour commencer en sécurité.", guideSources: s => `Base : repères généraux de ${s}.`, firstAidLink: 'Formation aux premiers secours pédiatriques',
  aboutTitle: 'À propos du contenu', aboutText: "Les textes de cette app sont des informations générales sur la diversification alimentaire.",
  aboutReviewed: (who, when) => `Relu par ${who}${when ? ' le ' + when : ''}.`, aboutNotReviewed: "Pas encore relu par un professionnel de santé.",
  aboutSources: s => `Sources de référence : ${s}.`,
  legalTitle: 'Informations légales', legalPrivacy: 'Politique de confidentialité', legalTerms: "Conditions d'utilisation", legalMedical: 'Avertissement médical',
  legalDraft: 'Brouillon, pas encore relu par un juriste.', legalNoContact: '(contact à préciser)'
});

// Diário dos pais: texto e gravações de voz.
Object.assign(window.DiaryI18n.pt, {
  journalTitle: 'Diário', journalHint: 'Escreve ou grava como correu. Fica só neste dispositivo.', journalNew: '+ Nova entrada',
  journalEmpty: 'Ainda não escreveste nada. Como correu hoje?', journalTitleField: 'Título (opcional)', journalText: 'O que queres guardar?',
  journalPlaceholder: 'A primeira colherada, uma careta, um dia difícil…', date: 'Data',
  recStart: 'Gravar voz', recStop: 'Parar', recDelete: 'Apagar gravação', recording: 'A gravar', voiceNote: 'Gravação de voz', listen: 'Ouvir', edit: 'Editar',
  recHint: n => `Até ${n} minutos. A gravação fica só neste dispositivo.`, recUnsupported: 'Este browser não permite gravar voz.',
  micDenied: 'Não foi possível usar o microfone. Verifica a permissão.', journalNeed: 'Escreve algo ou grava a tua voz.', audioFail: 'Não foi possível guardar a gravação.',
  journalDelete: 'Apagar esta entrada do diário? Não é possível desfazer.', optJournal: 'Diário', optJournalHint: 'Escreve ou fala sobre o dia',
  backupNoAudio: 'A cópia inclui os registos e também as fotos e as gravações de voz do diário.', dictateTip: 'Para ditar em vez de escrever, usa o microfone do teclado do telemóvel.'
});
Object.assign(window.DiaryI18n.en, {
  journalTitle: 'Journal', journalHint: 'Write or record how it went. It stays on this device only.', journalNew: '+ New entry',
  journalEmpty: 'Nothing written yet. How did today go?', journalTitleField: 'Title (optional)', journalText: 'What would you like to keep?',
  journalPlaceholder: 'The first spoonful, a funny face, a hard day…', date: 'Date',
  recStart: 'Record voice', recStop: 'Stop', recDelete: 'Delete recording', recording: 'Recording', voiceNote: 'Voice recording', listen: 'Listen', edit: 'Edit',
  recHint: n => `Up to ${n} minutes. The recording stays on this device only.`, recUnsupported: 'This browser cannot record voice.',
  micDenied: 'Could not use the microphone. Check the permission.', journalNeed: 'Write something or record your voice.', audioFail: 'The recording could not be saved.',
  journalDelete: 'Delete this journal entry? This cannot be undone.', optJournal: 'Journal', optJournalHint: 'Write or talk about the day',
  backupNoAudio: 'The backup includes your records as well as the journal photos and voice recordings.', dictateTip: "To dictate instead of typing, use the microphone on your phone's keyboard."
});
Object.assign(window.DiaryI18n.es, {
  journalTitle: 'Diario', journalHint: 'Escribe o graba cómo fue. Se queda solo en este dispositivo.', journalNew: '+ Nueva entrada',
  journalEmpty: 'Aún no has escrito nada. ¿Cómo fue hoy?', journalTitleField: 'Título (opcional)', journalText: '¿Qué quieres guardar?',
  journalPlaceholder: 'La primera cucharada, una mueca, un día difícil…', date: 'Fecha',
  recStart: 'Grabar voz', recStop: 'Parar', recDelete: 'Borrar grabación', recording: 'Grabando', voiceNote: 'Grabación de voz', listen: 'Escuchar', edit: 'Editar',
  recHint: n => `Hasta ${n} minutos. La grabación se queda solo en este dispositivo.`, recUnsupported: 'Este navegador no permite grabar voz.',
  micDenied: 'No se pudo usar el micrófono. Comprueba el permiso.', journalNeed: 'Escribe algo o graba tu voz.', audioFail: 'No se pudo guardar la grabación.',
  journalDelete: '¿Borrar esta entrada del diario? No se puede deshacer.', optJournal: 'Diario', optJournalHint: 'Escribe o habla sobre el día',
  backupNoAudio: 'La copia incluye los registros y también las fotos y las grabaciones de voz del diario.', dictateTip: 'Para dictar en vez de escribir, usa el micrófono del teclado del móvil.'
});
Object.assign(window.DiaryI18n.fr, {
  journalTitle: 'Journal', journalHint: "Écrivez ou enregistrez comment ça s'est passé. Tout reste sur cet appareil.", journalNew: '+ Nouvelle entrée',
  journalEmpty: "Rien d'écrit pour le moment. Comment s'est passée la journée ?", journalTitleField: 'Titre (facultatif)', journalText: 'Que voulez-vous garder ?',
  journalPlaceholder: 'La première cuillère, une grimace, une journée difficile…', date: 'Date',
  recStart: 'Enregistrer la voix', recStop: 'Arrêter', recDelete: "Supprimer l'enregistrement", recording: 'Enregistrement', voiceNote: 'Enregistrement vocal', listen: 'Écouter', edit: 'Modifier',
  recHint: n => `Jusqu'à ${n} minutes. L'enregistrement reste sur cet appareil.`, recUnsupported: "Ce navigateur ne permet pas d'enregistrer la voix.",
  micDenied: "Impossible d'utiliser le micro. Vérifiez l'autorisation.", journalNeed: 'Écrivez quelque chose ou enregistrez votre voix.', audioFail: "L'enregistrement n'a pas pu être sauvegardé.",
  journalDelete: 'Supprimer cette entrée du journal ? Cette action est définitive.', optJournal: 'Journal', optJournalHint: 'Écrivez ou parlez de la journée',
  backupNoAudio: "La copie contient vos notes ainsi que les photos et les enregistrements vocaux du journal.", dictateTip: 'Pour dicter au lieu de taper, utilisez le micro du clavier de votre téléphone.'
});

// Diário com toque pessoal: capa, idade em cada memória, sentimentos, ideias para escrever e foto.
Object.assign(window.DiaryI18n.pt, {
  journalOf: n => `Diário de ${n}`, journalYours: 'O teu diário', memories: n => n === 1 ? '1 memória' : `${n} memórias`, since: d => `desde ${d}`,
  ageLong: (m, d) => [m ? (m === 1 ? '1 mês' : `${m} meses`) : '', d ? (d === 1 ? '1 dia' : `${d} dias`) : ''].filter(Boolean).join(' e ') || 'recém-nascido',
  ageThen: (n, a) => n ? `${n} tinha ${a}` : a,
  moodTitle: 'Como te sentiste?', moods: { joy: 'Alegria', proud: 'Orgulho', tender: 'Ternura', laugh: 'Riso', tired: 'Cansaço', worry: 'Preocupação' },
  promptsTitle: 'Sem ideias? Experimenta uma destas:',
  prompts: ['A careta de hoje', 'O que mais me surpreendeu', 'Um momento que quero guardar', 'O que correu mal e me fez rir', 'O que aprendi hoje', 'Uma coisa que lhe quero contar um dia'],
  thatDay: 'Nesse dia provou', addPhoto: 'Juntar uma foto', removePhoto: 'Tirar a foto', photoFail: 'Não foi possível usar essa foto.', photoHint: 'A foto fica só neste dispositivo.',
  journalFirst: 'A primeira página está em branco. Escreve, grava ou junta uma foto do momento.'
});
Object.assign(window.DiaryI18n.en, {
  journalOf: n => `${n}'s journal`, journalYours: 'Your journal', memories: n => n === 1 ? '1 memory' : `${n} memories`, since: d => `since ${d}`,
  ageLong: (m, d) => [m ? (m === 1 ? '1 month' : `${m} months`) : '', d ? (d === 1 ? '1 day' : `${d} days`) : ''].filter(Boolean).join(' and ') || 'newborn',
  ageThen: (n, a) => n ? `${n} was ${a} old` : a,
  moodTitle: 'How did you feel?', moods: { joy: 'Joy', proud: 'Pride', tender: 'Tenderness', laugh: 'Laughter', tired: 'Tiredness', worry: 'Worry' },
  promptsTitle: 'Stuck? Try one of these:',
  prompts: ["Today's funny face", 'What surprised me most', 'A moment I want to keep', 'What went wrong and made me laugh', 'What I learned today', 'Something I want to tell them one day'],
  thatDay: 'That day they tried', addPhoto: 'Add a photo', removePhoto: 'Remove the photo', photoFail: 'That photo could not be used.', photoHint: 'The photo stays on this device only.',
  journalFirst: 'The first page is blank. Write, record or add a photo of the moment.'
});
Object.assign(window.DiaryI18n.es, {
  journalOf: n => `Diario de ${n}`, journalYours: 'Tu diario', memories: n => n === 1 ? '1 recuerdo' : `${n} recuerdos`, since: d => `desde el ${d}`,
  ageLong: (m, d) => [m ? (m === 1 ? '1 mes' : `${m} meses`) : '', d ? (d === 1 ? '1 día' : `${d} días`) : ''].filter(Boolean).join(' y ') || 'recién nacido',
  ageThen: (n, a) => n ? `${n} tenía ${a}` : a,
  moodTitle: '¿Cómo te sentiste?', moods: { joy: 'Alegría', proud: 'Orgullo', tender: 'Ternura', laugh: 'Risa', tired: 'Cansancio', worry: 'Preocupación' },
  promptsTitle: '¿Sin ideas? Prueba una de estas:',
  prompts: ['La mueca de hoy', 'Lo que más me sorprendió', 'Un momento que quiero guardar', 'Lo que salió mal y me hizo reír', 'Lo que aprendí hoy', 'Algo que quiero contarle algún día'],
  thatDay: 'Ese día probó', addPhoto: 'Añadir una foto', removePhoto: 'Quitar la foto', photoFail: 'No se pudo usar esa foto.', photoHint: 'La foto se queda solo en este dispositivo.',
  journalFirst: 'La primera página está en blanco. Escribe, graba o añade una foto del momento.'
});
Object.assign(window.DiaryI18n.fr, {
  journalOf: n => `Journal de ${n}`, journalYours: 'Votre journal', memories: n => n === 1 ? '1 souvenir' : `${n} souvenirs`, since: d => `depuis le ${d}`,
  ageLong: (m, d) => [m ? `${m} mois` : '', d ? (d === 1 ? '1 jour' : `${d} jours`) : ''].filter(Boolean).join(' et ') || 'nouveau-né',
  ageThen: (n, a) => n ? `${n} avait ${a}` : a,
  moodTitle: 'Comment vous sentiez-vous ?', moods: { joy: 'Joie', proud: 'Fierté', tender: 'Tendresse', laugh: 'Rire', tired: 'Fatigue', worry: 'Inquiétude' },
  promptsTitle: "En panne d'idées ? Essayez l'une de celles-ci :",
  prompts: ["La grimace du jour", 'Ce qui m\'a le plus surprise', 'Un moment que je veux garder', "Ce qui a raté et m'a fait rire", "Ce que j'ai appris aujourd'hui", 'Une chose que je veux lui raconter un jour'],
  thatDay: 'Ce jour-là, bébé a goûté', addPhoto: 'Ajouter une photo', removePhoto: 'Retirer la photo', photoFail: "Cette photo n'a pas pu être utilisée.", photoHint: 'La photo reste sur cet appareil.',
  journalFirst: 'La première page est blanche. Écrivez, enregistrez ou ajoutez une photo du moment.'
});

// Boas-vindas por passos e cartão "Para começar".
Object.assign(window.DiaryI18n.pt, {
  next: 'Seguinte', back: 'Voltar', yes: 'Sim', notYet: 'Ainda não', stepOf: (a, b) => `Passo ${a} de ${b}`,
  obQ1: 'Em que precisas de mais ajuda?', obQ1Hint: 'Podes escolher mais do que uma.',
  goals: { safe: ['Começar com segurança', 'Texturas, cortes e a diferença entre reflexo de vómito e engasgamento.'],
    allergens: ['Introduzir alergénios', 'Um de cada vez, com um registo claro do que já foi oferecido.'],
    meals: ['Ideias para as refeições', 'Receitas por fase, plano da semana e lista de compras.'],
    what: ['Saber o que oferecer', 'Como servir cada alimento em cada idade.'],
    browse: ['Só estou a ver', 'Sem pressa. Fica tudo aqui para quando precisares.'] },
  obQ2: 'O bebé já começou a comer?', obQ2Hint: 'Purés, pedaços ou alergénios: tudo conta.',
  obQ3: 'Como se chama o bebé?', obQ3Hint: 'Fica só neste dispositivo e serve para personalizar a app. Podes deixar em branco.',
  obQ4: 'Só mais uma coisa',
  startTitle: 'Para começar', startHide: 'Ocultar', startFoods: 'Ver os alimentos e como os servir', startLog: 'Regista o primeiro alimento'
});
Object.assign(window.DiaryI18n.en, {
  next: 'Next', back: 'Back', yes: 'Yes', notYet: 'Not yet', stepOf: (a, b) => `Step ${a} of ${b}`,
  obQ1: 'Where do you need the most help?', obQ1Hint: 'You can choose more than one.',
  goals: { safe: ['Starting safely', 'Textures, shapes and the difference between gagging and choking.'],
    allergens: ['Introducing allergens', 'One at a time, with a clear record of what has been offered.'],
    meals: ['Meal ideas', 'Recipes by stage, a weekly plan and a shopping list.'],
    what: ['Knowing what to offer', 'How to serve each food at each age.'],
    browse: ['Just looking', 'No rush. It will all be here when you need it.'] },
  obQ2: 'Has your baby started eating yet?', obQ2Hint: 'Purées, finger foods or allergens: it all counts.',
  obQ3: "What is your baby's name?", obQ3Hint: 'It stays on this device only and is used to personalise the app. You can leave it blank.',
  obQ4: 'One last thing',
  startTitle: 'Getting started', startHide: 'Hide', startFoods: 'See the foods and how to serve them', startLog: 'Log the first food'
});
Object.assign(window.DiaryI18n.es, {
  next: 'Siguiente', back: 'Volver', yes: 'Sí', notYet: 'Todavía no', stepOf: (a, b) => `Paso ${a} de ${b}`,
  obQ1: '¿En qué necesitas más ayuda?', obQ1Hint: 'Puedes elegir más de una.',
  goals: { safe: ['Empezar con seguridad', 'Texturas, cortes y la diferencia entre arcadas y atragantamiento.'],
    allergens: ['Introducir alérgenos', 'De uno en uno, con un registro claro de lo que ya se ha ofrecido.'],
    meals: ['Ideas para las comidas', 'Recetas por etapa, plan semanal y lista de la compra.'],
    what: ['Saber qué ofrecer', 'Cómo servir cada alimento a cada edad.'],
    browse: ['Solo estoy mirando', 'Sin prisa. Todo estará aquí cuando lo necesites.'] },
  obQ2: '¿El bebé ya ha empezado a comer?', obQ2Hint: 'Purés, trozos o alérgenos: todo cuenta.',
  obQ3: '¿Cómo se llama el bebé?', obQ3Hint: 'Se queda solo en este dispositivo y sirve para personalizar la app. Puedes dejarlo en blanco.',
  obQ4: 'Solo una cosa más',
  startTitle: 'Para empezar', startHide: 'Ocultar', startFoods: 'Ver los alimentos y cómo servirlos', startLog: 'Registra el primer alimento'
});
Object.assign(window.DiaryI18n.fr, {
  next: 'Suivant', back: 'Retour', yes: 'Oui', notYet: 'Pas encore', stepOf: (a, b) => `Étape ${a} sur ${b}`,
  obQ1: "Où avez-vous le plus besoin d'aide ?", obQ1Hint: 'Vous pouvez en choisir plusieurs.',
  goals: { safe: ['Commencer en sécurité', "Textures, découpes et la différence entre haut-le-cœur et étouffement."],
    allergens: ['Introduire les allergènes', "Un à la fois, avec une trace claire de ce qui a déjà été proposé."],
    meals: ['Des idées de repas', 'Recettes par étape, menu de la semaine et liste de courses.'],
    what: ['Savoir quoi proposer', 'Comment servir chaque aliment à chaque âge.'],
    browse: ['Je regarde seulement', "Rien ne presse. Tout sera là quand vous en aurez besoin."] },
  obQ2: 'Bébé a-t-il déjà commencé à manger ?', obQ2Hint: 'Purées, morceaux ou allergènes : tout compte.',
  obQ3: "Comment s'appelle bébé ?", obQ3Hint: "Le prénom reste sur cet appareil et sert à personnaliser l'app. Vous pouvez laisser vide.",
  obQ4: 'Une dernière chose',
  startTitle: 'Pour commencer', startHide: 'Masquer', startFoods: 'Voir les aliments et comment les servir', startLog: 'Notez le premier aliment'
});

// Plano guiado, perfil do bebé e pesquisa de receitas no ecrã Alimentos.
// A REVER POR PROFISSIONAL DE SAÚDE: notas sobre eczema, prematuridade e alergias.
Object.assign(window.DiaryI18n.pt, {
  pathTitle: 'Plano guiado', pathIntro: n => `Uma ordem sugerida para o bebé ir provando os alimentos: cerca de ${n} novos por semana e, no máximo, um alergénio novo de cada vez.`,
  pathNote: 'É só uma sugestão. Vai ao ritmo do bebé e segue as indicações do pediatra.',
  pathWeekN: n => `Semana ${n}`, pathNow: 'Atual', pathOpen: 'Ver o plano', pathToday: n => `Plano guiado · semana ${n}`, pathTodayHint: 'Os próximos alimentos a provar.',
  pathLate: 'Depois dos 12 meses', pathDone: 'Plano completo. Parabéns!', pathCount: (a, b) => `${a} de ${b} alimentos provados`,
  pathExcluded: n => n === 1 ? '1 alimento fica fora do plano por causa do perfil do bebé.' : `${n} alimentos ficam fora do plano por causa do perfil do bebé.`,
  profTitle: 'Perfil do bebé', profOpen: 'Perfil do bebé', profHint: 'Opcional. Serve para adaptar o plano e avisar nos alimentos certos. Fica só neste dispositivo.',
  obQm: 'Como preferes oferecer os alimentos?', obQmHint: 'Não há resposta certa, e podes mudar quando quiseres.',
  methods: { blw: ['Pedaços (BLW)', 'O bebé pega nos alimentos e come sozinho.'], spoon: ['Colher', 'Purés e papas dados à colher.'], both: ['As duas', 'Umas vezes pedaços, outras vezes colher.'], unsure: ['Ainda não sei', 'Podes decidir mais tarde.'] },
  profAvoid: 'Alergias já confirmadas', profAvoidHint: 'Os alimentos destes grupos saem do plano e ficam assinalados.',
  profDiet: 'Alimentação da família', diets: { none: 'Sem restrições', veg: 'Vegetariana', vegan: 'Vegana' },
  profPremature: 'Nasceu antes das 37 semanas', profPrematureNote: 'Nos bebés prematuros, o momento certo para começar pode ser diferente. Fala com o pediatra.',
  profEczema: 'Tem eczema', profEczemaNote: 'Bebés com eczema, sobretudo se for grave, podem ter maior risco de alergia alimentar. Fala com o pediatra antes de introduzir os alergénios.',
  profVeganNote: 'Uma alimentação vegana no primeiro ano deve ser acompanhada por um profissional de saúde.',
  avoidWarn: name => `Marcaste alergia a ${name} no perfil do bebé. Segue as indicações do médico antes de oferecer este alimento.`,
  dietNote: 'Este alimento não faz parte da alimentação que escolheste no perfil do bebé.',
  recipeAvoid: names => `Atenção: esta receita leva ${names}, que marcaste como alergia no perfil do bebé.`,
  avoidMark: 'alergia assinalada', startProfile: 'Completa o perfil do bebé'
});
Object.assign(window.DiaryI18n.en, {
  pathTitle: 'Guided plan', pathIntro: n => `A suggested order for your baby to try foods: about ${n} new ones a week and no more than one new allergen at a time.`,
  pathNote: "It is only a suggestion. Go at your baby's pace and follow your paediatrician's advice.",
  pathWeekN: n => `Week ${n}`, pathNow: 'Current', pathOpen: 'See the plan', pathToday: n => `Guided plan · week ${n}`, pathTodayHint: 'The next foods to try.',
  pathLate: 'After 12 months', pathDone: 'Plan complete. Well done!', pathCount: (a, b) => `${a} of ${b} foods tried`,
  pathExcluded: n => n === 1 ? "1 food is left out of the plan because of your baby's profile." : `${n} foods are left out of the plan because of your baby's profile.`,
  profTitle: "Baby's profile", profOpen: "Baby's profile", profHint: 'Optional. It adapts the plan and flags the right foods. It stays on this device only.',
  obQm: 'How would you like to offer food?', obQmHint: 'There is no right answer, and you can change it any time.',
  methods: { blw: ['Finger foods (BLW)', 'Your baby picks food up and feeds themselves.'], spoon: ['Spoon', 'Purées and porridge offered on a spoon.'], both: ['Both', 'Sometimes finger foods, sometimes the spoon.'], unsure: ["I'm not sure yet", 'You can decide later.'] },
  profAvoid: 'Confirmed allergies', profAvoidHint: 'Foods in these groups are left out of the plan and flagged.',
  profDiet: 'Family diet', diets: { none: 'No restrictions', veg: 'Vegetarian', vegan: 'Vegan' },
  profPremature: 'Born before 37 weeks', profPrematureNote: 'For babies born early, the right time to start may be different. Talk to your paediatrician.',
  profEczema: 'Has eczema', profEczemaNote: 'Babies with eczema, especially severe eczema, may be at higher risk of food allergy. Talk to your paediatrician before introducing allergens.',
  profVeganNote: 'A vegan diet in the first year should be supervised by a health professional.',
  avoidWarn: name => `You marked an allergy to ${name} in your baby's profile. Follow your doctor's advice before offering this food.`,
  dietNote: "This food is not part of the diet you chose in your baby's profile.",
  recipeAvoid: names => `Note: this recipe contains ${names}, which you marked as an allergy in your baby's profile.`,
  avoidMark: 'allergy flagged', startProfile: "Complete your baby's profile"
});
Object.assign(window.DiaryI18n.es, {
  pathTitle: 'Plan guiado', pathIntro: n => `Un orden sugerido para que el bebé vaya probando alimentos: unos ${n} nuevos por semana y, como máximo, un alérgeno nuevo cada vez.`,
  pathNote: 'Es solo una sugerencia. Ve al ritmo del bebé y sigue las indicaciones del pediatra.',
  pathWeekN: n => `Semana ${n}`, pathNow: 'Actual', pathOpen: 'Ver el plan', pathToday: n => `Plan guiado · semana ${n}`, pathTodayHint: 'Los próximos alimentos por probar.',
  pathLate: 'Después de los 12 meses', pathDone: 'Plan completo. ¡Enhorabuena!', pathCount: (a, b) => `${a} de ${b} alimentos probados`,
  pathExcluded: n => n === 1 ? '1 alimento queda fuera del plan por el perfil del bebé.' : `${n} alimentos quedan fuera del plan por el perfil del bebé.`,
  profTitle: 'Perfil del bebé', profOpen: 'Perfil del bebé', profHint: 'Opcional. Sirve para adaptar el plan y avisar en los alimentos adecuados. Se queda solo en este dispositivo.',
  obQm: '¿Cómo prefieres ofrecer los alimentos?', obQmHint: 'No hay respuesta correcta, y puedes cambiarla cuando quieras.',
  methods: { blw: ['Trozos (BLW)', 'El bebé coge los alimentos y come solo.'], spoon: ['Cuchara', 'Purés y papillas con cuchara.'], both: ['Las dos', 'Unas veces trozos, otras veces cuchara.'], unsure: ['Todavía no lo sé', 'Puedes decidirlo más adelante.'] },
  profAvoid: 'Alergias ya confirmadas', profAvoidHint: 'Los alimentos de estos grupos salen del plan y quedan señalados.',
  profDiet: 'Alimentación de la familia', diets: { none: 'Sin restricciones', veg: 'Vegetariana', vegan: 'Vegana' },
  profPremature: 'Nació antes de las 37 semanas', profPrematureNote: 'En los bebés prematuros, el momento adecuado para empezar puede ser distinto. Habla con el pediatra.',
  profEczema: 'Tiene eccema', profEczemaNote: 'Los bebés con eccema, sobre todo si es grave, pueden tener más riesgo de alergia alimentaria. Habla con el pediatra antes de introducir los alérgenos.',
  profVeganNote: 'Una alimentación vegana en el primer año debe estar supervisada por un profesional de la salud.',
  avoidWarn: name => `Has marcado alergia a ${name} en el perfil del bebé. Sigue las indicaciones del médico antes de ofrecer este alimento.`,
  dietNote: 'Este alimento no forma parte de la alimentación que elegiste en el perfil del bebé.',
  recipeAvoid: names => `Atención: esta receta lleva ${names}, que marcaste como alergia en el perfil del bebé.`,
  avoidMark: 'alergia señalada', startProfile: 'Completa el perfil del bebé'
});
Object.assign(window.DiaryI18n.fr, {
  pathTitle: 'Plan guidé', pathIntro: n => `Un ordre suggéré pour faire découvrir les aliments à bébé : environ ${n} nouveaux par semaine et, au plus, un nouvel allergène à la fois.`,
  pathNote: "Ce n'est qu'une suggestion. Allez au rythme de bébé et suivez les conseils du pédiatre.",
  pathWeekN: n => `Semaine ${n}`, pathNow: 'En cours', pathOpen: 'Voir le plan', pathToday: n => `Plan guidé · semaine ${n}`, pathTodayHint: 'Les prochains aliments à découvrir.',
  pathLate: 'Après 12 mois', pathDone: 'Plan terminé. Bravo !', pathCount: (a, b) => `${a} aliments goûtés sur ${b}`,
  pathExcluded: n => n === 1 ? '1 aliment est exclu du plan à cause du profil de bébé.' : `${n} aliments sont exclus du plan à cause du profil de bébé.`,
  profTitle: 'Profil de bébé', profOpen: 'Profil de bébé', profHint: "Facultatif. Il sert à adapter le plan et à signaler les bons aliments. Il reste sur cet appareil.",
  obQm: 'Comment préférez-vous proposer les aliments ?', obQmHint: "Il n'y a pas de bonne réponse, et vous pouvez changer à tout moment.",
  methods: { blw: ['Morceaux (DME)', 'Bébé attrape les aliments et mange seul.'], spoon: ['Cuillère', 'Purées et bouillies données à la cuillère.'], both: ['Les deux', 'Parfois des morceaux, parfois la cuillère.'], unsure: ['Je ne sais pas encore', 'Vous pourrez décider plus tard.'] },
  profAvoid: 'Allergies déjà confirmées', profAvoidHint: 'Les aliments de ces groupes sortent du plan et sont signalés.',
  profDiet: 'Alimentation de la famille', diets: { none: 'Sans restriction', veg: 'Végétarienne', vegan: 'Végane' },
  profPremature: 'Né avant 37 semaines', profPrematureNote: 'Chez les bébés prématurés, le bon moment pour commencer peut être différent. Parlez-en au pédiatre.',
  profEczema: "A de l'eczéma", profEczemaNote: "Les bébés qui ont de l'eczéma, surtout sévère, peuvent avoir un risque plus élevé d'allergie alimentaire. Parlez-en au pédiatre avant d'introduire les allergènes.",
  profVeganNote: 'Une alimentation végane la première année doit être suivie par un professionnel de santé.',
  avoidWarn: name => `Vous avez indiqué une allergie (${name}) dans le profil de bébé. Suivez les conseils du médecin avant de proposer cet aliment.`,
  dietNote: "Cet aliment ne fait pas partie de l'alimentation choisie dans le profil de bébé.",
  recipeAvoid: names => `Attention : cette recette contient ${names}, indiqué comme allergie dans le profil de bébé.`,
  avoidMark: 'allergie signalée', startProfile: 'Complétez le profil de bébé'
});

// Guias com ilustração e tempo de leitura.
Object.assign(window.DiaryI18n.pt, { readMin: n => `${n} min de leitura`, guidesAll: n => `Ver os ${n} guias` });
Object.assign(window.DiaryI18n.en, { readMin: n => `${n} min read`, guidesAll: n => `See all ${n} guides` });
Object.assign(window.DiaryI18n.es, { readMin: n => `${n} min de lectura`, guidesAll: n => `Ver las ${n} guías` });
Object.assign(window.DiaryI18n.fr, { readMin: n => `${n} min de lecture`, guidesAll: n => `Voir les ${n} guides` });

// Registo por refeição.
Object.assign(window.DiaryI18n.pt, {
  meals: { breakfast: 'Pequeno-almoço', lunch: 'Almoço', snack: 'Lanche', dinner: 'Jantar' }, mealOther: 'Sem refeição', mealLabel: 'Refeição',
  mealPick: 'Qual refeição?', mealEmpty: 'Ainda sem alimentos', addToMeal: name => `Adicionar alimentos: ${name}`, addN: n => n ? `Adicionar (${n})` : 'Adicionar',
  pickFoodsHint: 'Toca nos alimentos que o bebé comeu. Depois podes dizer se gostou.', newTag: 'novo',
  mealAdded: (n, meal) => n === 1 ? `1 alimento adicionado: ${meal}` : `${n} alimentos adicionados: ${meal}`,
  optMeal: 'Refeição', optMealHint: 'Os alimentos que o bebé comeu'
});
Object.assign(window.DiaryI18n.en, {
  meals: { breakfast: 'Breakfast', lunch: 'Lunch', snack: 'Snack', dinner: 'Dinner' }, mealOther: 'No meal', mealLabel: 'Meal',
  mealPick: 'Which meal?', mealEmpty: 'No foods yet', addToMeal: name => `Add foods: ${name}`, addN: n => n ? `Add (${n})` : 'Add',
  pickFoodsHint: 'Tap the foods your baby ate. You can say how it went afterwards.', newTag: 'new',
  mealAdded: (n, meal) => n === 1 ? `1 food added: ${meal}` : `${n} foods added: ${meal}`,
  optMeal: 'Meal', optMealHint: 'The foods your baby ate'
});
Object.assign(window.DiaryI18n.es, {
  meals: { breakfast: 'Desayuno', lunch: 'Comida', snack: 'Merienda', dinner: 'Cena' }, mealOther: 'Sin comida asignada', mealLabel: 'Momento del día',
  mealPick: '¿En qué comida?', mealEmpty: 'Aún sin alimentos', addToMeal: name => `Añadir alimentos: ${name}`, addN: n => n ? `Añadir (${n})` : 'Añadir',
  pickFoodsHint: 'Toca los alimentos que comió el bebé. Después puedes indicar si le gustó.', newTag: 'nuevo',
  mealAdded: (n, meal) => n === 1 ? `1 alimento añadido: ${meal}` : `${n} alimentos añadidos: ${meal}`,
  optMeal: 'Comida', optMealHint: 'Los alimentos que comió el bebé'
});
Object.assign(window.DiaryI18n.fr, {
  meals: { breakfast: 'Petit-déjeuner', lunch: 'Déjeuner', snack: 'Goûter', dinner: 'Dîner' }, mealOther: 'Sans repas', mealLabel: 'Repas',
  mealPick: 'Quel repas ?', mealEmpty: "Pas encore d'aliments", addToMeal: name => `Ajouter des aliments : ${name}`, addN: n => n ? `Ajouter (${n})` : 'Ajouter',
  pickFoodsHint: 'Touchez les aliments que bébé a mangés. Vous pourrez ensuite noter comment ça s\'est passé.', newTag: 'nouveau',
  mealAdded: (n, meal) => n === 1 ? `1 aliment ajouté : ${meal}` : `${n} aliments ajoutés : ${meal}`,
  optMeal: 'Repas', optMealHint: 'Les aliments que bébé a mangés'
});

// Registar receitas numa refeição.
Object.assign(window.DiaryI18n.pt, { pickRecipesHint: 'Escolhe a receita: cada ingrediente fica registado como um alimento.', fromRecipe: name => `Receita: ${name}`, logRecipe: 'Registar numa refeição' });
Object.assign(window.DiaryI18n.en, { pickRecipesHint: 'Choose a recipe: each ingredient is logged as a food.', fromRecipe: name => `Recipe: ${name}`, logRecipe: 'Log as a meal' });
Object.assign(window.DiaryI18n.es, { pickRecipesHint: 'Elige la receta: cada ingrediente queda registrado como un alimento.', fromRecipe: name => `Receta: ${name}`, logRecipe: 'Registrar en una comida' });
Object.assign(window.DiaryI18n.fr, { pickRecipesHint: 'Choisissez la recette : chaque ingrédient est noté comme un aliment.', fromRecipe: name => `Recette : ${name}`, logRecipe: 'Noter dans un repas' });

// Favoritos e lista de alimentos com fotos.
Object.assign(window.DiaryI18n.pt, { favs: 'Favoritos', favAdd: 'Guardar nos favoritos', favOn: 'Nos favoritos', allergenShort: 'Alergénio' });
Object.assign(window.DiaryI18n.en, { favs: 'Favourites', favAdd: 'Save to favourites', favOn: 'In favourites', allergenShort: 'Allergen' });
Object.assign(window.DiaryI18n.es, { favs: 'Favoritos', favAdd: 'Guardar en favoritos', favOn: 'En favoritos', allergenShort: 'Alérgeno' });
Object.assign(window.DiaryI18n.fr, { favs: 'Favoris', favAdd: 'Ajouter aux favoris', favOn: 'Dans les favoris', allergenShort: 'Allergène' });

// Receitas por refeição.
Object.assign(window.DiaryI18n.pt, { recipesShowAll: 'Ver todas as receitas' });
Object.assign(window.DiaryI18n.en, { recipesShowAll: 'See all recipes' });
Object.assign(window.DiaryI18n.es, { recipesShowAll: 'Ver todas las recetas' });
Object.assign(window.DiaryI18n.fr, { recipesShowAll: 'Voir toutes les recettes' });

// Diário em forma de caderno: perguntas para responder.
Object.assign(window.DiaryI18n.pt, { otherQuestion: 'outra pergunta', questions: ['O que é que o bebé provou hoje e como reagiu?', 'Qual foi a careta mais engraçada de hoje?', 'O que mais te surpreendeu hoje?', 'Que momento de hoje queres guardar para sempre?', 'O que correu mal e acabou por te fazer rir?', 'O que gostavas de lhe contar um dia sobre hoje?', 'Como te sentiste hoje à mesa?'] });
Object.assign(window.DiaryI18n.en, { otherQuestion: 'another question', questions: ['What did your baby try today, and how did it go?', "What was today's funniest face?", 'What surprised you most today?', 'Which moment from today do you want to keep forever?', 'What went wrong and ended up making you laugh?', 'What would you like to tell them one day about today?', 'How did you feel at the table today?'] });
Object.assign(window.DiaryI18n.es, { otherQuestion: 'otra pregunta', questions: ['¿Qué probó hoy el bebé y cómo reaccionó?', '¿Cuál fue la mueca más divertida de hoy?', '¿Qué fue lo que más te sorprendió hoy?', '¿Qué momento de hoy quieres guardar para siempre?', '¿Qué salió mal y acabó haciéndote reír?', '¿Qué te gustaría contarle algún día sobre hoy?', '¿Cómo te sentiste hoy en la mesa?'] });
Object.assign(window.DiaryI18n.fr, { otherQuestion: 'une autre question', questions: ["Qu'est-ce que bébé a goûté aujourd'hui, et comment a-t-il réagi ?", "Quelle a été la grimace la plus drôle aujourd'hui ?", "Qu'est-ce qui vous a le plus surprise aujourd'hui ?", "Quel moment d'aujourd'hui voulez-vous garder pour toujours ?", "Qu'est-ce qui a raté et a fini par vous faire rire ?", "Qu'aimeriez-vous lui raconter un jour sur cette journée ?", "Comment vous êtes-vous sentie à table aujourd'hui ?"] });

// Diário com uma página por dia.
Object.assign(window.DiaryI18n.pt, { jToday: 'Hoje', jPrev: 'Página anterior', jNext: 'Página seguinte', jPageOf: (a, b) => `página ${a} de ${b}`, jContinue: 'Continua a escrever…', jSavePage: 'Guardar na página', jSaved: 'Guardado na página deste dia',
  jMedia: 'Foto ou voz', jNoQuestion: 'sem pergunta', jDayMood: 'Como foi o dia?', jPages: 'Páginas', jGoTo: 'Abrir outro dia', jPagesCount: n => n === 1 ? '1 página escrita' : `${n} páginas escritas` });
Object.assign(window.DiaryI18n.en, { jToday: 'Today', jPrev: 'Previous page', jNext: 'Next page', jPageOf: (a, b) => `page ${a} of ${b}`, jContinue: 'Keep writing…', jSavePage: 'Save to the page', jSaved: "Saved to this day's page",
  jMedia: 'Photo or voice', jNoQuestion: 'no question', jDayMood: 'How was the day?', jPages: 'Pages', jGoTo: 'Open another day', jPagesCount: n => n === 1 ? '1 page written' : `${n} pages written` });
Object.assign(window.DiaryI18n.es, { jToday: 'Hoy', jPrev: 'Página anterior', jNext: 'Página siguiente', jPageOf: (a, b) => `página ${a} de ${b}`, jContinue: 'Sigue escribiendo…', jSavePage: 'Guardar en la página', jSaved: 'Guardado en la página de este día',
  jMedia: 'Foto o voz', jNoQuestion: 'sin pregunta', jDayMood: '¿Cómo fue el día?', jPages: 'Páginas', jGoTo: 'Abrir otro día', jPagesCount: n => n === 1 ? '1 página escrita' : `${n} páginas escritas` });
Object.assign(window.DiaryI18n.fr, { jToday: "Aujourd'hui", jPrev: 'Page précédente', jNext: 'Page suivante', jPageOf: (a, b) => `page ${a} sur ${b}`, jContinue: 'Continuez à écrire…', jSavePage: 'Enregistrer sur la page', jSaved: 'Enregistré sur la page de ce jour',
  jMedia: 'Photo ou voix', jNoQuestion: 'sans question', jDayMood: 'Comment était la journée ?', jPages: 'Pages', jGoTo: 'Ouvrir un autre jour', jPagesCount: n => n === 1 ? '1 page écrite' : `${n} pages écrites` });

// Dois cadernos (bebé e pais) e livro para imprimir.
Object.assign(window.DiaryI18n.pt, { journalBaby: 'Diário do bebé', journalParents: 'Diário dos pais',
  questionsParents: ['Como te sentes hoje?', 'De que é que te orgulhas hoje?', 'O que foi mais difícil hoje?', 'O que queres lembrar desta fase?', 'O que fizeste hoje só para ti?', 'Que ajuda te soube bem hoje?', 'O que aprendeste hoje sobre ti?'],
  jExportTitle: 'Livro do diário', jExportHint: 'Junta todas as páginas num só livro, para imprimir ou guardar e partilhar com os filhos mais tarde.', jExportOpen: 'Ver o livro',
  jExportPrint: 'Imprimir ou guardar em PDF', jExportNote: 'O livro inclui os textos e as fotos de todas as páginas deste diário. As gravações de voz não cabem num PDF: ficam indicadas, mas só se ouvem na app.' });
Object.assign(window.DiaryI18n.en, { journalBaby: "Baby's journal", journalParents: "Parents' journal",
  questionsParents: ['How are you feeling today?', 'What are you proud of today?', 'What was hardest today?', 'What do you want to remember about this stage?', 'What did you do today just for you?', 'What help felt good today?', 'What did you learn about yourself today?'],
  jExportTitle: 'Journal book', jExportHint: 'Gather every page into one book, to print or save and share with your children later.', jExportOpen: 'See the book',
  jExportPrint: 'Print or save as PDF', jExportNote: 'The book includes the text and photos from every page of this journal. Voice recordings cannot go in a PDF: they are noted, but can only be played in the app.' });
Object.assign(window.DiaryI18n.es, { journalBaby: 'Diario del bebé', journalParents: 'Diario de los padres',
  questionsParents: ['¿Cómo te sientes hoy?', '¿Qué te hizo sentir orgullo hoy?', '¿Qué fue lo más difícil hoy?', '¿Qué quieres recordar de esta etapa?', '¿Qué hiciste hoy solo para ti?', '¿Qué ayuda te vino bien hoy?', '¿Qué aprendiste hoy sobre ti?'],
  jExportTitle: 'Libro del diario', jExportHint: 'Reúne todas las páginas en un solo libro, para imprimir o guardar y compartir con los hijos más adelante.', jExportOpen: 'Ver el libro',
  jExportPrint: 'Imprimir o guardar en PDF', jExportNote: 'El libro incluye los textos y las fotos de todas las páginas de este diario. Las grabaciones de voz no caben en un PDF: quedan indicadas, pero solo se escuchan en la app.' });
Object.assign(window.DiaryI18n.fr, { journalBaby: 'Journal de bébé', journalParents: 'Journal des parents',
  questionsParents: ["Comment vous sentez-vous aujourd'hui ?", "De quoi êtes-vous fière aujourd'hui ?", "Qu'est-ce qui a été le plus difficile aujourd'hui ?", 'Que voulez-vous retenir de cette période ?', "Qu'avez-vous fait aujourd'hui rien que pour vous ?", "Quelle aide vous a fait du bien aujourd'hui ?", "Qu'avez-vous appris sur vous aujourd'hui ?"],
  jExportTitle: 'Livre du journal', jExportHint: 'Réunit toutes les pages en un seul livre, à imprimer ou à garder pour le partager plus tard avec vos enfants.', jExportOpen: 'Voir le livre',
  jExportPrint: 'Imprimer ou enregistrer en PDF', jExportNote: "Le livre contient les textes et les photos de toutes les pages de ce journal. Les enregistrements vocaux ne tiennent pas dans un PDF : ils sont signalés, mais ne s'écoutent que dans l'app." });
// 12/11: aviso quando o registo não fica guardado e cartão «Instalar no telemóvel» (Definições).
Object.assign(window.DiaryI18n.pt, { saveFail: 'Não foi possível guardar: o armazenamento deste dispositivo está cheio ou bloqueado. Exporta uma cópia em Definições.', installTitle: 'Instalar no telemóvel', installText: 'Com a app no ecrã principal abres mais depressa e os teus registos ficam mais protegidos.', installBtn: 'Instalar a app', installIos: 'No iPhone ou iPad: abre no Safari, toca em Partilhar e escolhe «Adicionar ao ecrã principal».', installAndroid: 'No Android: abre o menu do browser (⋮) e escolhe «Adicionar ao ecrã principal» ou «Instalar app».', installDone: 'A app já está instalada neste dispositivo.' });
Object.assign(window.DiaryI18n.en, { saveFail: 'Could not save: this device\u2019s storage is full or blocked. Export a backup in Settings.', installTitle: 'Install on your phone', installText: 'With the app on your home screen it opens faster and your records are better protected.', installBtn: 'Install the app', installIos: 'On iPhone or iPad: open in Safari, tap Share and choose \u201cAdd to Home Screen\u201d.', installAndroid: 'On Android: open the browser menu (⋮) and choose \u201cAdd to Home screen\u201d or \u201cInstall app\u201d.', installDone: 'The app is already installed on this device.' });
Object.assign(window.DiaryI18n.es, { saveFail: 'No se pudo guardar: el almacenamiento de este dispositivo está lleno o bloqueado. Exporta una copia en Ajustes.', installTitle: 'Instalar en el móvil', installText: 'Con la app en la pantalla de inicio se abre más rápido y tus registros quedan mejor protegidos.', installBtn: 'Instalar la app', installIos: 'En iPhone o iPad: abre en Safari, toca Compartir y elige «Añadir a pantalla de inicio».', installAndroid: 'En Android: abre el menú del navegador (⋮) y elige «Añadir a pantalla de inicio» o «Instalar aplicación».', installDone: 'La app ya está instalada en este dispositivo.' });
Object.assign(window.DiaryI18n.fr, { saveFail: 'Enregistrement impossible : le stockage de cet appareil est plein ou bloqué. Exportez une copie dans les Réglages.', installTitle: 'Installer sur le téléphone', installText: 'Avec l\u2019app sur l\u2019écran d\u2019accueil, elle s\u2019ouvre plus vite et vos données sont mieux protégées.', installBtn: 'Installer l\u2019app', installIos: 'Sur iPhone ou iPad : ouvrez dans Safari, touchez Partager puis « Sur l\u2019écran d\u2019accueil ».', installAndroid: 'Sur Android : ouvrez le menu du navigateur (⋮) puis « Ajouter à l\u2019écran d\u2019accueil » ou « Installer l\u2019application ».', installDone: 'L\u2019app est déjà installée sur cet appareil.' });

// Plano gratuito e Premium, e notas no relatório.
Object.assign(window.DiaryI18n.pt, { trialHead: n => `Experimenta ${n} dias grátis`, thenPerMonth: (m, y) => `Depois ${m} por mês, faturado uma vez por ano (${y}).`,
  premiumTitle: 'Com o Premium', freeTitle: 'No plano gratuito',
  subPoints: ['Todas as receitas, dos 6 aos 12+ meses', 'Plano guiado completo dos 100 alimentos', 'Plano da semana com lista de compras', 'Todos os guias', 'Diário dos pais e livro do diário em PDF', 'Relatório para o pediatra', 'Vários bebés'],
  freePoints: ['Registo das refeições e calendário', 'Os 100 alimentos e como servir em cada idade', 'Programa de alergénios', 'Guias de segurança', 'Diário do bebé, com fotos e voz', 'Receitas dos 6 meses e as primeiras semanas do plano guiado'],
  reportNotesToggle: 'Incluir as notas do calendário e do diário do bebé', reportNotes: 'Notas', reportNotesNone: 'Ainda não há notas.' });
Object.assign(window.DiaryI18n.en, { trialHead: n => `Try ${n} days free`, thenPerMonth: (m, y) => `Then ${m} a month, billed once a year (${y}).`,
  premiumTitle: 'With Premium', freeTitle: 'On the free plan',
  subPoints: ['All recipes, from 6 to 12+ months', 'The full guided plan for the 100 foods', 'Weekly plan with shopping list', 'All guides', "Parents' journal and the journal book as a PDF", 'Report for the paediatrician', 'Several babies'],
  freePoints: ['Meal log and calendar', 'The 100 foods and how to serve them at each age', 'Allergen programme', 'Safety guides', "Baby's journal, with photos and voice", 'Recipes from 6 months and the first weeks of the guided plan'],
  reportNotesToggle: "Include notes from the calendar and the baby's journal", reportNotes: 'Notes', reportNotesNone: 'No notes yet.' });
Object.assign(window.DiaryI18n.es, { trialHead: n => `Prueba ${n} días gratis`, thenPerMonth: (m, y) => `Después ${m} al mes, con un solo pago al año (${y}).`,
  premiumTitle: 'Con Premium', freeTitle: 'En el plan gratuito',
  subPoints: ['Todas las recetas, de los 6 a los 12+ meses', 'El plan guiado completo de los 100 alimentos', 'Plan semanal con lista de la compra', 'Todas las guías', 'Diario de los padres y libro del diario en PDF', 'Informe para el pediatra', 'Varios bebés'],
  freePoints: ['Registro de las comidas y calendario', 'Los 100 alimentos y cómo servirlos a cada edad', 'Programa de alérgenos', 'Guías de seguridad', 'Diario del bebé, con fotos y voz', 'Recetas de los 6 meses y las primeras semanas del plan guiado'],
  reportNotesToggle: 'Incluir las notas del calendario y del diario del bebé', reportNotes: 'Notas', reportNotesNone: 'Aún no hay notas.' });
Object.assign(window.DiaryI18n.fr, { trialHead: n => `Essayez ${n} jours gratuits`, thenPerMonth: (m, y) => `Ensuite ${m} par mois, facturé une fois par an (${y}).`,
  premiumTitle: 'Avec Premium', freeTitle: 'Avec la formule gratuite',
  subPoints: ['Toutes les recettes, de 6 à 12+ mois', 'Le plan guidé complet des 100 aliments', 'Menu de la semaine avec liste de courses', 'Tous les guides', 'Journal des parents et livre du journal en PDF', 'Bilan pour le pédiatre', 'Plusieurs bébés'],
  freePoints: ['Suivi des repas et calendrier', 'Les 100 aliments et comment les servir à chaque âge', 'Programme allergènes', 'Guides de sécurité', 'Journal de bébé, avec photos et voix', 'Recettes dès 6 mois et premières semaines du plan guidé'],
  reportNotesToggle: 'Inclure les notes du calendrier et du journal de bébé', reportNotes: 'Notes', reportNotesNone: 'Pas encore de notes.' });

// Cópia de segurança completa.
Object.assign(window.DiaryI18n.pt, { exportBusy: 'A preparar a cópia…', exportFail: 'Não foi possível criar a cópia.', importMedia: n => n === 1 ? 'Cópia importada, com 1 foto ou gravação.' : `Cópia importada, com ${n} fotos e gravações.` });
Object.assign(window.DiaryI18n.en, { exportBusy: 'Preparing the backup…', exportFail: 'The backup could not be created.', importMedia: n => n === 1 ? 'Backup imported, with 1 photo or recording.' : `Backup imported, with ${n} photos and recordings.` });
Object.assign(window.DiaryI18n.es, { exportBusy: 'Preparando la copia…', exportFail: 'No se pudo crear la copia.', importMedia: n => n === 1 ? 'Copia importada, con 1 foto o grabación.' : `Copia importada, con ${n} fotos y grabaciones.` });
Object.assign(window.DiaryI18n.fr, { exportBusy: 'Préparation de la copie…', exportFail: "La copie n'a pas pu être créée.", importMedia: n => n === 1 ? 'Copie importée, avec 1 photo ou enregistrement.' : `Copie importée, avec ${n} photos et enregistrements.` });
