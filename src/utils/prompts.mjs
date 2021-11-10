
import { StringPrompt, Select } from 'enquirer';

/**
 * 
 * @returns 
 */
export async function promptSelect({ name, message, choices }) {

    const prompt = new Select({
        name,
        message,
        choices
    });

    const answer = await prompt.run();

    return answer
}

/**
 * 
 * @returns 
 */
export async function promptText({ message }) {

    const prompt = new StringPrompt({
        message,
    });

    const answer = await prompt.run();

    return answer
}
