import path from 'node:path';

const runBiomeCommand = filenames =>
  `biome check --fix ${filenames.map(f => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;

const runStylintCommand = filenames =>
  `stylelint --fix ${filenames.map(f => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;

const config = {
  './src/**/*.{js,ts}': [runBiomeCommand],
  './src/**/*.{css}': [runBiomeCommand, runStylintCommand],
};
export default config;
