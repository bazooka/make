import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import path from 'path';

async function getSubFolders(dir) {
    const full_path = path.resolve(dir);
    const exists = await fs.pathExists(full_path);

    if(!exists) {
        return [];
    }

    const items = await fs.readdir(full_path, { withFileTypes: true });

    const folders = items
        .filter(item => item.isDirectory())
        .map(item => item.name);

    return folders;
}

export default getSubFolders;
