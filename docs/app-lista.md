# App Petit Nuvem: lista de pontos

Atualizada a 12 de novembro de 2026. App: https://app.petitnuvem.com/

## Feito

- Diário com calendário mensal, resumo do dia, notas e reações
- 100 alimentos com foto, como servir por idade, nutrição e risco de engasgamento
- 56 receitas em 4 idiomas, com calorias, plano da semana e lista de compras
- Programa de alergénios e relatório para o pediatra
- 5 guias, páginas legais (rascunho) e secção "Sobre o conteúdo"
- Diário pessoal dos pais, com texto, voz e foto
- Vários bebés
- Subscrição em modo de teste (ver «Preços»)
- Boas-vindas por passos e cartão "Para começar"
- Plano guiado por semanas, com um alergénio novo de cada vez
- Perfil do bebé: método, alergias confirmadas, alimentação da família, eczema, prematuro
- Pesquisa de receitas no ecrã Alimentos
- Registo por refeição (pequeno-almoço, almoço, lanche, jantar), com vários alimentos de uma vez e edição de cada registo
- Registar receitas numa refeição: cada ingrediente fica como alimento individual
- Receitas sugeridas conforme a refeição (pequeno-almoço e lanche, almoço e jantar)
- Diário em forma de caderno, com uma página por dia: escreve-se na própria página e vira-se com o dedo
- Fechar as caixas arrastando para baixo
- Ecrã de subscrição com "Experimenta 7 dias grátis" e lista do que é grátis e Premium
- Notas do calendário e do diário no relatório para o pediatra (opcional)
- Cópia de segurança completa em .zip (registos, fotos e gravações de voz)
- Cartão do Clube das mães e sugestões de artigos da loja em alguns guias e no «como servir» (só em português)
- Registo de origem e licença das imagens em `docs/fotos-origem.md`
- Conta: início de sessão com a conta de cliente da loja Shopify e reconhecimento da compra do Premium (por testar com a loja real)
- Dois diários (do bebé e dos pais) e livro do diário para imprimir ou guardar em PDF
- Favoritos em alimentos e receitas
- Lista de alimentos com fotos ao adicionar a uma refeição
- 9 guias (mais 4: recusa, água, rotina das refeições, cortar alimentos)
- Guias com ilustração e tempo de leitura, e cartão de guias mais visível no ecrã Hoje
- Auditoria de 12/11: 112 nos avisos de emergência, aviso quando um registo não fica guardado, pedido de armazenamento persistente, cartão «Instalar no telemóvel», ícones PNG (iPhone e Android), imagem de partilha, contacto e entidade nas páginas legais

## Grátis e Premium (fechado pelo Diogo a 12 de novembro, muda-se em `config.js`)

| Grátis | Premium |
|---|---|
| Registo das refeições e calendário | Todas as receitas (7, 9 e 12+ meses) |
| Os 100 alimentos e como servir | Plano guiado completo (da semana 3 em diante) |
| Programa de alergénios | Plano da semana e lista de compras |
| Os 9 guias | Diário dos pais e livro do diário em PDF |
| Relatório para o pediatra | Vários bebés |
| Diário do bebé, com fotos e voz | |
| Receitas dos 6 meses | |
| 2 primeiras semanas do plano guiado | |
| Exportar e importar a cópia de segurança (sempre grátis) | |

O bloqueio (`subscription.enforce`) não se liga até haver pagamentos a funcionar.

## Preços (decididos pelo Diogo a 12 de novembro, em `config.js > subscription`)

| Plano | Preço |
|---|---|
| Anual, preço normal | 39,99 € |
| Anual, preço de lançamento (primeiro ano) | 29,99 €, com o 39,99 € riscado ao lado |
| Mensal | 6,99 € |

- A poupança do anual face ao mensal é calculada a partir destes valores (64% no lançamento, 52% ao preço normal).
- Data de fim do lançamento: por indicar (`launch.until`, vazio).
- Pagamentos por decidir. Hipótese mais provável: Premium anual vendido na loja da Shopify, sem renovação automática. Não montar Stripe sem o Diogo confirmar.
- O ecrã de subscrição diz sempre, junto ao botão, se há ou não renovação automática (`autoRenew`, agora desligado).
- Por decidir: o teste grátis de 7 dias (`trialDays`) só faz sentido se a forma de pagamento o permitir; numa compra única na Shopify não há teste.

## A seguir

1. Notificações com dicas por idade: precisam de servidor (Supabase), ficam para depois das contas

## À tua espera

- [ ] Ativar "Enforce HTTPS" no GitHub (Settings > Pages) quando o certificado de app.petitnuvem.com estiver pronto
- [ ] Decidir a forma de pagamento (Shopify ou outra) e criar a conta Supabase, para contas e cópia na nuvem
- [ ] Ficheiro do logótipo, para ficar guardado dentro da app
- [ ] 17 fotos das receitas 40 a 56, e refazer 2 (bolachinhas, massa com bolonhesa)
- [ ] Foto do coelho, e 5 fotos de alimentos a trocar (amêndoa, noz, iogurte, farinha de milho, alho-francês)
- [ ] Fotos reais para os guias, se quiseres trocar as ilustrações (9 fotos)
- [ ] Ligação para um curso oficial de primeiros socorros, por idioma
- [ ] Dados da entidade e contacto para as páginas legais
- [ ] Revisão por um profissional de saúde (textos, ordem do plano guiado, notas do perfil)
- [ ] Revisão das páginas legais por um advogado
- [ ] Revisão das traduções por falantes nativos
- [ ] Avaliações reais de mães, para mostrar nas boas-vindas

## Para mais tarde

- Vídeos em Blender
- Partilha entre mães (precisa de contas e moderação)
- Publicar nas lojas de apps (App Store e Google Play)
