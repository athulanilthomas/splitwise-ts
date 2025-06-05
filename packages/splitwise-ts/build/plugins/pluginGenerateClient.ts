import { resolve } from 'pathe';
import { cwd } from 'node:process';
import { existsSync } from 'node:fs';
import { consola } from "consola";
import { run as runGenerator } from '../../src/generator';

import type { RsbuildPlugin } from '@rsbuild/core';

const PLUGIN_NAME = 'splitwise-ts:plugin-generate-client'
type PluginGenerateClientOptions = {
  file: string;
};

function validatePath(path: string = '') {
  path = resolve(cwd(), path);
  return !!existsSync(path);
}

export const pluginClientGenerator = ({ file }: PluginGenerateClientOptions): RsbuildPlugin => ({
  name: PLUGIN_NAME,
  setup(api) {
    const valid = validatePath(file);

    if (!valid) {
      consola.error(new Error("Invalid Spec File! Please use a valid one"));
      return
    };

    async function generateClient() {
      try {
        consola.start("Generating client");
        await runGenerator(file)
        consola.success("Client generated successfully!!\n");
      } catch (error) {
        consola.error(error);
      }
    }

    api.onBeforeStartDevServer(generateClient);
    api.onBeforeBuild(generateClient);
  },
});