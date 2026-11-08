// Gera legendas automaticamente a partir da tua narração, com o Whisper.
// Uso: npm run legendas -- public/narracao.mp3 [modelo]
// Resultado: public/<nome>.json no formato Caption, pronto para <Legendas ficheiro="...">.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from '@remotion/install-whisper-cpp';

const entrada = process.argv[2];
const modelo = process.argv[3] ?? 'medium';
if (!entrada) {
  console.error('Uso: npm run legendas -- public/narracao.mp3 [tiny|base|small|medium|large-v3]');
  process.exit(1);
}

const pastaWhisper = path.resolve('whisper.cpp');
const versao = '1.7.6';

await installWhisperCpp({to: pastaWhisper, version: versao, printOutput: true});
await downloadWhisperModel({model: modelo, folder: pastaWhisper});

// O Whisper precisa de WAV mono 16 kHz.
const wav = path.join(pastaWhisper, 'entrada-16khz.wav');
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', entrada, '-ar', '16000', '-ac', '1', wav]);

const resultado = await transcribe({
  inputPath: wav,
  whisperPath: pastaWhisper,
  whisperCppVersion: versao,
  model: modelo,
  language: 'pt',
  tokenLevelTimestamps: true,
  printOutput: false,
});

const {captions} = toCaptions({whisperCppOutput: resultado});
const saida = path.join('public', path.basename(entrada, path.extname(entrada)) + '.json');
fs.writeFileSync(saida, JSON.stringify(captions, null, 2));
console.log(`Legendas guardadas em ${saida} (${captions.length} palavras)`);
