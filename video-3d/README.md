# Vídeos 3D — Three.js + Remotion

Projeto para criar vídeos animados em 3D para o YouTube (vídeos normais e Shorts).

- **Three.js** (com [React Three Fiber](https://r3f.docs.pmnd.rs/) e [drei](https://drei.docs.pmnd.rs/)) → cenas e animações 3D
- **Remotion** → linha de tempo, legendas, som e render final para MP4
- **Whisper** (opcional) → gera as legendas automaticamente a partir da tua narração

## Instalar (no teu computador)

Precisas de [Node.js 20+](https://nodejs.org) e do [FFmpeg](https://ffmpeg.org) (só para as legendas automáticas).

```bash
cd video-3d
npm install
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Abre o **Remotion Studio** no browser: vês o vídeo, andas na linha de tempo e editas título/ano ao vivo |
| `npm run render` | Exporta o vídeo 16:9 (1920×1080) para `out/historia-demo.mp4` |
| `npm run render:short` | Exporta a versão Shorts 9:16 (1080×1920) |
| `npm run render:sem-gpu` | Igual ao `render`, para máquinas sem placa gráfica (mais lento) |
| `npm run thumbnail` | Gera uma imagem PNG de um frame (para a miniatura) |
| `npm run legendas -- public/narracao.mp3` | Transcreve a tua narração em português e cria `public/narracao.json` |

## Estrutura

```
video-3d/
├── public/                  ← áudio, música, imagens, legendas (.json)
├── scripts/transcrever.mjs  ← legendas automáticas com Whisper
└── src/
    ├── Root.tsx             ← lista de vídeos (composições), duração, tamanho
    ├── HistoriaDemo.tsx     ← o vídeo de exemplo: junta 3D + título + legendas + som
    ├── cenas/Globo.tsx      ← cena 3D: globo, estrelas, câmara, tremor de terra
    └── componentes/
        ├── Legendas.tsx     ← legendas palavra a palavra (estilo Shorts)
        └── Titulo.tsx       ← título animado
```

## Fazer um vídeo novo

1. Grava a narração e põe-na em `public/` (ex.: `public/narracao.mp3`).
2. `npm run legendas -- public/narracao.mp3` → cria `public/narracao.json`.
3. No `src/Root.tsx`, muda `legendas: 'narracao.json'` e `musica: 'narracao.mp3'`,
   e ajusta `durationInFrames` à duração (segundos × 30).
4. Cria uma cena nova em `src/cenas/` (copia o `Globo.tsx` como ponto de partida).
5. `npm run dev` para ver e afinar; `npm run render` para exportar.

## Regras importantes para o 3D

- **Anima sempre com `useCurrentFrame()`** e `interpolate()`/`spring()` do Remotion.
  Nunca uses `useFrame()` do React Three Fiber nem `Date.now()`/`Math.random()`
  para animação: o vídeo final sairia diferente da pré-visualização.
- Para valores "aleatórios" usa `random('semente')` do Remotion (dá sempre o mesmo resultado).
- Modelos 3D (`.glb`) vão para `public/` e carregam-se com `useGLTF(staticFile('modelo.glb'))` do drei.
  Sites com modelos gratuitos: [Sketchfab](https://sketchfab.com), [Poly Pizza](https://poly.pizza).
- O render usa `concurrency = 1` (definido em `remotion.config.ts`), porque o WebGL não gosta de
  vários frames em paralelo. Se tiveres erro de WebGL, usa `npm run render:sem-gpu`.

## Documentação

- Remotion + Three: https://www.remotion.dev/docs/three
- Legendas: https://www.remotion.dev/docs/captions
- React Three Fiber: https://r3f.docs.pmnd.rs/
