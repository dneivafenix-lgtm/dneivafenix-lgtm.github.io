import {Audio} from '@remotion/media';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {Legendas} from './componentes/Legendas';
import {Titulo} from './componentes/Titulo';
import {Globo} from './cenas/Globo';

// Os props podem ser editados ao vivo no Remotion Studio (painel da direita).
export const historiaDemoSchema = z.object({
  titulo: z.string(),
  ano: z.string(),
  legendas: z.string().describe('Ficheiro JSON de legendas em public/'),
  musica: z.string().describe('Ficheiro de áudio em public/'),
});

export const HistoriaDemo: React.FC<z.infer<typeof historiaDemoSchema>> = ({
  titulo,
  ano,
  legendas,
  musica,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const fadeOut = interpolate(frame, [durationInFrames - fps, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: 'black', opacity: fadeOut}}>
      <ThreeCanvas width={width} height={height} camera={{position: [0, 0, 7.5], fov: height > width ? 60 : 40}}>
        <Globo inicioTremor={fps * 5} fimTremor={fps * 9} />
      </ThreeCanvas>
      <Titulo titulo={titulo} ano={ano} />
      <Legendas ficheiro={legendas} />
      <Audio src={staticFile(musica)} volume={0.8} />
    </AbsoluteFill>
  );
};
