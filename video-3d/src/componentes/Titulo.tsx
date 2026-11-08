import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Titulo: React.FC<{titulo: string; ano: string}> = ({titulo, ano}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrada = spring({frame, fps, config: {damping: 200}});
  const saida = interpolate(frame, [fps * 3, fps * 3.6], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 120,
        opacity: entrada * saida,
        transform: `translateY(${(1 - entrada) * -40}px)`,
        fontFamily: 'Georgia, serif',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 40, letterSpacing: 18, color: '#ffd23f'}}>{ano}</div>
      <div style={{fontSize: 96, fontWeight: 700, textShadow: '0 8px 30px rgba(0,0,0,0.8)'}}>
        {titulo}
      </div>
    </AbsoluteFill>
  );
};
