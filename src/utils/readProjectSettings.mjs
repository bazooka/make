import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import path from 'path';
import { DEFAULT_PROJECT_SETTINGS } from '../index.mjs';

async function readProjectSettings(rootDir='') {
    let content = null;

    try {
        const fullPath = path.resolve(rootDir, 'bazooka.make.json');
        
        const result = await fs.readJSON(fullPath);

        content = {
            ...DEFAULT_PROJECT_SETTINGS,
            ...result
        };

    } catch(e) {
        console.log('No settings file, use defaults');
    }

    if(!content) {
        content = DEFAULT_PROJECT_SETTINGS;
    }

    return {
        ...content,
        templates_dir: path.resolve(rootDir, content.templates_dir),
        target_dir: path.resolve(rootDir, content.target_dir)
    };
}

export default readProjectSettings;
