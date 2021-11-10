import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import path from 'path';
import { DEFAULT_TEMPLATE_SETTINGS } from '../index.mjs';
import pluralize from './pluralize.mjs';

async function readTemplateSettingsFile(type, defaultSettings, projectSettings) {
    try {
        const filePath = path.resolve(projectSettings.templates_dir, type, '.settings');
        const exists = await fs.pathExists(filePath);

        if(!exists) {
            return defaultSettings;
        }

        const settings = await fs.readJSON(filePath);

        if(settings.destination) {
            settings.destination = path.resolve(settings.destination);
        }

        return {
            ...defaultSettings,
            ...settings
        };

    } catch(e) {
        return defaultSettings;
    }
}

async function getTemplateSettings(type, projectSettings) {

    const defaultSettings = {
        ...DEFAULT_TEMPLATE_SETTINGS,
        destination: path.resolve(projectSettings.target_dir, pluralize(type)),
    };

    return readTemplateSettingsFile(type, defaultSettings, projectSettings);
}

export default getTemplateSettings;
