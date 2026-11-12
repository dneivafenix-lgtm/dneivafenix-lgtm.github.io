# Google Play: o que falta para publicar a app

Preparado a 12 de novembro de 2026. Nada disto foi publicado e nenhuma conta foi criada.

A app continua a ser a mesma app web de `app.petitnuvem.com`. Para a Google Play, embrulha-se numa Trusted Web Activity (TWA): uma app Android muito pequena que abre o site em ecrã inteiro, sem barra de endereço. Quando a app web é atualizada, a da loja fica atualizada sozinha.

As regras da Google mudam com frequência. O que está aqui é o que se sabia à data; cada ponto marcado «confirmar» tem de ser verificado na Play Console quando se avançar.

## 1. Ponto que decide tudo: pagamentos

A política de pagamentos da Google Play exige, em regra, que conteúdo digital usado dentro de uma app (como o Premium) seja vendido pelo sistema de faturação da Google, que cobra comissão. Vender o Premium na loja da Shopify e desbloqueá-lo na app da Play pode violar essa política e levar à rejeição ou à remoção da app.

Há três caminhos, a confirmar na altura:

1. **App «de consumo»**: a app da Play não vende nem menciona a compra. Quem já comprou na loja entra com a conta e tem o Premium. Na versão Android esconde-se o botão «Comprar o Premium» e qualquer ligação para a loja a propósito do Premium. É o caminho mais simples, mas a Google restringe o tipo de apps e de mensagens permitidas: confirmar se se aplica.
2. **Programas de faturação alternativa ou de ligações externas** que a Google tem para o Espaço Económico Europeu: permitem vender fora, com inscrição prévia e comissão reduzida. Confirmar condições e custos.
3. **Faturação da Google Play** na versão Android (Digital Goods API numa TWA): cumpre a política, mas obriga a manter dois sistemas de venda e a pagar a comissão da Google.

Recomendação: começar pelo caminho 1 e só avançar depois de confirmar na documentação atual da Play Console que é aceite. Esta decisão deve ser tomada antes de gastar tempo no resto.

## 2. O que a app já cumpre

| Requisito técnico da TWA | Estado |
|---|---|
| Servida em HTTPS, em domínio próprio | Feito (`app.petitnuvem.com`) |
| Manifesto com nome, nome curto, `start_url`, `scope`, `display: standalone`, cores | Feito (`manifest.webmanifest`) |
| Ícones PNG de 192 e 512 px, e ícone «maskable» de 512 px | Feito |
| Service worker, a app abre sem ligação | Feito (`sw.js`) |
| Páginas de privacidade e termos | Feitas na app, como rascunho por rever |

## 3. O que falta fazer na app (código)

1. **Ligação entre o site e a app Android** (`assetlinks.json`): um ficheiro em `https://app.petitnuvem.com/.well-known/assetlinks.json` com o nome do pacote Android e a impressão digital (SHA-256) da chave de assinatura. Sem ele, a app abre com barra de endereço. Só se pode escrever depois de existir a chave (ponto 4).
2. **Ficheiro `.nojekyll`** na raiz do repositório: o GitHub Pages ignora pastas começadas por ponto, como `.well-known`, a menos que este ficheiro exista.
3. **Política de privacidade com endereço próprio**: a Google pede um endereço público. Hoje as páginas legais abrem dentro da app. Falta uma página simples, por exemplo `https://app.petitnuvem.com/privacidade.html`, com o mesmo texto.
4. **Versão Android sem venda** (se for o caminho 1 do ponto 1): esconder o botão de compra e as referências à loja a propósito do Premium quando a app corre dentro da TWA.
5. **Início de sessão dentro da TWA**: confirmar num telemóvel Android que o ida e volta a `account.petitnuvem.com` regressa à app e não fica preso no browser.
6. **Manifesto**: acrescentar `id`, e capturas de ecrã (`screenshots`) para melhorar o ecrã de instalação. Opcional.

## 4. O que falta fazer fora da app

1. **Gerar o pacote Android** com a ferramenta Bubblewrap da Google (linha de comandos; precisa de Java e do Android SDK num computador). Produz um ficheiro `.aab` para enviar para a Play Console.
   - Nome do pacote sugerido: `com.petitnuvem.app`. Não se pode mudar depois de publicar.
2. **Chave de assinatura**: criada ao gerar o pacote. Guardar o ficheiro da chave e as palavras-passe em local seguro, fora do repositório. Com a «Assinatura de apps do Google Play», a Google guarda a chave final e mostra a impressão digital a pôr no `assetlinks.json`.

## 5. O que a Google exige (lista para o Diogo)

A confirmar na Play Console, porque os requisitos mudam.

**Conta**
- Conta de programador Google Play: pagamento único de 25 dólares.
- Verificação de identidade (documento) e de contacto. Para conta de empresa pode ser pedido um número D-U-N-S.
- Contas pessoais novas: antes de publicar em produção, a Google tem exigido um teste fechado com um número mínimo de testadores durante cerca de duas semanas. Confirmar o número e a duração atuais.

**Ficha da loja**
- Nome da app (até 30 caracteres), descrição curta (até 80) e descrição completa (até 4000), por idioma.
- Ícone de 512 × 512 px.
- Imagem de destaque de 1024 × 500 px.
- Pelo menos 2 capturas de ecrã de telemóvel; recomendam-se também de tablet.
- Categoria (por exemplo, «Parentalidade») e contactos de apoio (email obrigatório).

**Declarações obrigatórias**
- Endereço público da política de privacidade.
- Formulário «Segurança dos dados»: que dados a app recolhe e partilha. Com a conta da loja, passa a haver email e histórico de compras; os registos do diário ficam no dispositivo.
- Classificação etária, por questionário.
- Público-alvo: a app destina-se a pais e cuidadores, adultos. Não escolher faixas etárias de crianças, para não ficar sujeita ao programa de apps para famílias.
- Declaração de apps de saúde: a app dá informação sobre alimentação infantil e alergénios. A Google pede uma declaração própria para apps com funcionalidades de saúde e exige aviso de que não substitui aconselhamento médico. Convém ter o conteúdo revisto por um profissional antes de submeter.
- Declaração sobre anúncios (não tem) e sobre acesso de teste: se houver funcionalidades atrás de início de sessão, a Google pede uma conta de teste para a revisão.

**Requisitos técnicos**
- Pacote no formato `.aab`, com o nível de API Android exigido no ano em curso (o Bubblewrap trata disto se estiver atualizado).
- Assinatura de apps do Google Play ativa.

## 6. Ordem sugerida

1. Decidir o caminho dos pagamentos (ponto 1) e confirmá-lo na documentação atual.
2. Fechar o que já está pendente e que a Google também vai olhar: revisão de saúde, revisão legal, política de privacidade com endereço próprio.
3. Diogo cria a conta de programador e faz a verificação de identidade.
4. Gerar o pacote com o Bubblewrap e a chave; publicar o `assetlinks.json` e o `.nojekyll`.
5. Teste interno na Play Console, incluindo o início de sessão; depois o teste fechado, se for exigido.
6. Ficha da loja, declarações e envio para revisão.

## 7. O que este documento não cobre

A App Store da Apple. Tem regras de pagamento mais apertadas do que a Google e não aceita uma TWA: seria preciso outro tipo de embrulho e uma análise própria.
