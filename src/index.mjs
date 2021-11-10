import path from 'path';
import colors from 'colors';
import make from './make.mjs';
import abort from './utils/abort.mjs';
import nameIsValid from './utils/nameIsValid.mjs';
import getSubFolders from './utils/getSubFolders.mjs';
import {
    convertToDashCase,
    convertLowerCamelCase,
    convertToSnakeCase,
    convertToScreamingSnakeCase
} from './utils/convertCase.mjs';
import getTypeName from './utils/getTypeName.mjs';
import getTemplateSettings from './utils/getTemplateSettings.mjs';
import readProjectSettings from './utils/readProjectSettings.mjs';
import { promptSelect } from './utils/prompts.mjs';
import { promptText } from './utils/prompts.mjs';

// --------------------------------------------------------------
// TOOLING CONSTS
// --------------------------------------------------------------

export const DEFAULT_TEMPLATE_SETTINGS = {
    destination: null, // Must be generated or received from settings file
    prompt_subfolder: false,
    new_folder: true,
};

export const DEFAULT_PROJECT_SETTINGS = {
    templates_dir: './templates/',
    target_dir: './src/'
};

// --------------------------------------------------------------
// Functions
// --------------------------------------------------------------

async function run(rootPath) {

    const projectSettings = await readProjectSettings(rootPath);

    // Read templates and have user select one
    const templates = await getSubFolders(projectSettings.templates_dir);

    if(!templates.length) {
        abort(`No templates found.`);
    }

    // Prompt for template
    const template = await promptSelect({
        name: 'template',
        message: 'Choose template',
        choices: templates
    });

    let templateSettings = await getTemplateSettings(template, projectSettings);

    if(templateSettings.prompt_subfolder) {

        const subFolders = await getSubFolders(templateSettings.destination);

        const subFolder = await promptSelect({
            name: 'subFolder',
            message: 'Choose directory',
            choices: subFolders
        });

        templateSettings.destination = path.resolve(templateSettings.destination, subFolder);
    }

    // Get the type name from template
    const type = getTypeName(template);

    // Prompt for a name
    const name = await promptText([{
        message: `Name the ${ type }`,
    }]);

    // Must be valid!
    if (!name || !nameIsValid(name)) {
        abort(`The given name "${ colors.green(name) }" is invalid.`);
    }

    // Create some name versions
    const nameVariants = {
        upperCamelCase: name,
        lowerCamelCase: convertLowerCamelCase(name),
        dashedCase: convertToDashCase(name),
        snakeCase: convertToSnakeCase(name),
        screamingSnakeCase: convertToScreamingSnakeCase(name),
    };

    // Make the component!
    await make(name, template, templateSettings, projectSettings, nameVariants);

    return name;
}

export default run;
