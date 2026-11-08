import {Stars} from '@react-three/drei';
import {useMemo} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';

// Converte latitude/longitude numa posição na superfície da esfera.
const latLonParaVector = (lat: number, lon: number, raio: number) => {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -raio * Math.sin(phi) * Math.cos(theta),
    raio * Math.cos(phi),
    raio * Math.sin(phi) * Math.sin(theta),
  );
};

// Textura procedimental (sem downloads): oceano com "continentes" em ruído.
const criarTextura = () => {
  const largura = 1024;
  const altura = 512;
  const canvas = document.createElement('canvas');
  canvas.width = largura;
  canvas.height = altura;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#123a5c';
  ctx.fillRect(0, 0, largura, altura);
  let semente = 7;
  const aleatorio = () => {
    semente = (semente * 16807) % 2147483647;
    return semente / 2147483647;
  };
  // Alguns "continentes", cada um feito de manchas à volta de um centro.
  for (let c = 0; c < 7; c++) {
    const cx = aleatorio() * largura;
    const cy = altura * 0.2 + aleatorio() * altura * 0.6;
    for (let i = 0; i < 60; i++) {
      const x = cx + (aleatorio() - 0.5) * 160;
      const y = cy + (aleatorio() - 0.5) * 110;
      const r = 6 + aleatorio() * 22;
      ctx.fillStyle = aleatorio() > 0.4 ? '#7d8f4e' : '#b49a62';
      // Desenha também deslocado de ±largura para não haver costura na esfera.
      for (const dx of [-largura, 0, largura]) {
        ctx.beginPath();
        ctx.arc(x + dx, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  const textura = new THREE.CanvasTexture(canvas);
  textura.colorSpace = THREE.SRGBColorSpace;
  return textura;
};

const LISBOA = {lat: 38.72, lon: -9.14};
const RAIO = 2;

// Todas as animações dependem de useCurrentFrame() — NUNCA uses useFrame()
// do React Three Fiber, senão o render final fica dessincronizado.
export const Globo: React.FC<{inicioTremor: number; fimTremor: number}> = ({
  inicioTremor,
  fimTremor,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const textura = useMemo(criarTextura, []);
  const posLisboa = useMemo(() => latLonParaVector(LISBOA.lat, LISBOA.lon, RAIO), []);

  // O globo roda até Lisboa ficar virada para a câmara.
  const anguloFinal = -Math.atan2(posLisboa.x, posLisboa.z);
  const rotacaoY = interpolate(frame, [0, fps * 4], [anguloFinal - Math.PI * 1.2, anguloFinal], {
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Câmara aproxima-se ao longo do vídeo.
  const zoom = interpolate(frame, [0, durationInFrames], [7.5, 4.2]);

  // Tremor de terra: deslocamento pseudo-aleatório determinístico por frame.
  const intensidade = interpolate(
    frame,
    [inicioTremor, inicioTremor + 10, fimTremor - 15, fimTremor],
    [0, 0.08, 0.08, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const tremorX = Math.sin(frame * 12.9898) * intensidade;
  const tremorY = Math.cos(frame * 78.233) * intensidade;

  // Ondas de choque a partir de Lisboa.
  const pulso = ((frame - inicioTremor) % 30) / 30;
  const mostrarPulso = frame >= inicioTremor;

  return (
    <>
      <color attach="background" args={['#05070d']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} />
      <Stars radius={60} depth={30} count={3000} factor={3} fade speed={0} />
      <group position={[tremorX, tremorY, -zoom + 4.2]}>
        <group rotation={[THREE.MathUtils.degToRad(LISBOA.lat) * 0.8, rotacaoY, 0]}>
          <mesh>
            <sphereGeometry args={[RAIO, 96, 96]} />
            <meshStandardMaterial map={textura} roughness={0.9} />
          </mesh>
          {/* Atmosfera */}
          <mesh scale={1.04}>
            <sphereGeometry args={[RAIO, 64, 64]} />
            <meshBasicMaterial color="#4fa3ff" transparent opacity={0.12} side={THREE.BackSide} />
          </mesh>
          {/* Marcador de Lisboa */}
          <mesh position={posLisboa}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#ff3b2f" />
          </mesh>
          {mostrarPulso ? (
            <mesh position={posLisboa} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), posLisboa.clone().normalize())}>
              <ringGeometry args={[0.05 + pulso * 0.6, 0.07 + pulso * 0.6, 48]} />
              <meshBasicMaterial color="#ff3b2f" transparent opacity={1 - pulso} side={THREE.DoubleSide} />
            </mesh>
          ) : null}
        </group>
      </group>
    </>
  );
};
