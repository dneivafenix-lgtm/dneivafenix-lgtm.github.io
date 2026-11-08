import {Caption, createTikTokStyleCaptions} from '@remotion/captions';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AbsoluteFill,
  Sequence,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Quantos milissegundos de legenda aparecem de cada vez no ecrã.
const MS_POR_PAGINA = 1400;

// Lê um ficheiro JSON de legendas (formato Caption do @remotion/captions)
// da pasta public/ e mostra-as palavra a palavra, estilo TikTok/Shorts.
export const Legendas: React.FC<{ficheiro: string}> = ({ficheiro}) => {
  const [legendas, setLegendas] = useState<Caption[] | null>(null);
  const [handle] = useState(() => delayRender('A carregar legendas'));
  const {fps} = useVideoConfig();

  const carregar = useCallback(async () => {
    try {
      const resposta = await fetch(staticFile(ficheiro));
      setLegendas((await resposta.json()) as Caption[]);
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [ficheiro, handle]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const {pages} = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions: legendas ?? [],
        combineTokensWithinMilliseconds: MS_POR_PAGINA,
        breakOnSilenceAfterMilliseconds: 250,
      }),
    [legendas],
  );

  return (
    <AbsoluteFill>
      {pages.map((pagina, i) => {
        const seguinte = pages[i + 1] ?? null;
        const inicio = (pagina.startMs / 1000) * fps;
        // A página fica no ecrã até à seguinte começar (máx. 1 s depois da última palavra).
        const fimMs = Math.min(
          seguinte ? seguinte.startMs : Infinity,
          pagina.startMs + pagina.durationMs + 1000,
        );
        const fim = (fimMs / 1000) * fps;
        const duracao = Math.max(1, Math.round(fim - inicio));
        return (
          <Sequence key={i} from={Math.round(inicio)} durationInFrames={duracao} layout="none">
            <Pagina pagina={pagina} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const Pagina: React.FC<{pagina: ReturnType<typeof createTikTokStyleCaptions>['pages'][number]}> = ({
  pagina,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const tempoMs = pagina.startMs + (frame / fps) * 1000;
  const vertical = height > width;

  return (
    <AbsoluteFill
      style={{
        justifyContent: vertical ? 'center' : 'flex-end',
        alignItems: 'center',
        paddingBottom: vertical ? 0 : 110,
        paddingTop: vertical ? 700 : 0,
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 900,
          fontSize: vertical ? 84 : 72,
          textAlign: 'center',
          maxWidth: '85%',
          whiteSpace: 'pre-wrap',
          color: 'white',
          textShadow: '0 6px 24px rgba(0,0,0,0.9)',
          WebkitTextStroke: '3px black',
          paintOrder: 'stroke',
        }}
      >
        {pagina.tokens.map((t) => {
          const ativa = t.fromMs <= tempoMs && t.toMs > tempoMs;
          return (
            <span key={t.fromMs} style={{color: ativa ? '#ffd23f' : 'white'}}>
              {t.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
