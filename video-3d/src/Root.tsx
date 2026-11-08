import {Composition} from 'remotion';
import {HistoriaDemo, historiaDemoSchema} from './HistoriaDemo';

export const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vídeo normal do YouTube (16:9) */}
      <Composition
        id="HistoriaDemo"
        component={HistoriaDemo}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1920}
        height={1080}
        schema={historiaDemoSchema}
        defaultProps={{
          titulo: 'O Terramoto de Lisboa',
          ano: '1755',
          legendas: 'legendas-demo.json',
          musica: 'musica-demo.mp3',
        }}
      />
      {/* YouTube Shorts (9:16) */}
      <Composition
        id="HistoriaShort"
        component={HistoriaDemo}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1080}
        height={1920}
        schema={historiaDemoSchema}
        defaultProps={{
          titulo: 'O Terramoto de Lisboa',
          ano: '1755',
          legendas: 'legendas-demo.json',
          musica: 'musica-demo.mp3',
        }}
      />
    </>
  );
};
