import { writeFileSync } from 'fs';
import { resolve } from 'path';

import modules from '../modules.json';
import packageJson from '../package.json';

export const updatePackageJson = () => {
  const types = {};

  Object.keys(modules).forEach((moduleName) => {
    if (moduleName === 'index') return;
    types[moduleName] = [`./dist/${moduleName}.d.ts`];
  });

  packageJson.typesVersions = {
    '*': types
  };

  writeFileSync(
    resolve(__dirname, '../package.json'),
    `${JSON.stringify(packageJson, null, 2)}\n`
  );
};
