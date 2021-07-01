import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { main } from './main';
import * as fs from 'fs';
import * as path from 'path';

const driver = async () => {
  const argv = yargs(hideBin(process.argv))
    .options({
      o: {
        demandOption: true,
        description: 'output dir',
        type: 'string',
      },
      p: {
        demandOption: true,
        description: 'tsconfig location',
        type: 'string',
      },
    })
    .help('h')
    .parseSync();

  const outputDir = argv['o'];
  const projectFile = argv['p'];

  const outputDirStat = fs.statSync(outputDir);
  if (!outputDirStat.isDirectory()) {
    throw new Error(`${outputDir} not a valid directory`);
  }

  const tsconfigState = fs.statSync(projectFile);
  if (!tsconfigState.isFile()) {
    throw new Error(`${projectFile} not a valid file`);
  }

  const generatedFiles = await main(projectFile);
  generatedFiles.forEach((file) => {
    const fullPath = path.resolve(outputDir, file.name);
    fs.writeFileSync(fullPath, file.text, 'utf8');
  });
};

driver().catch(console.error);
