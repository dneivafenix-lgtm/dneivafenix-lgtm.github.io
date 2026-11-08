import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// O WebGL (Three.js) precisa de um backend de GPU no Chrome headless.
// "angle" funciona na maioria das máquinas; em servidores sem GPU usa "swangle".
Config.setChromiumOpenGlRenderer('angle');
// Three.js não é seguro para renderizar vários frames em paralelo no mesmo separador.
Config.setConcurrency(1);
