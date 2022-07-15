import colors from 'colors';

/**
 * Make sure given names is valid.
 * 
 * @param {String} name
 * @param {Array} rules
 */
function nameIsValid(name, rules) {

    if(!rules || !rules.length) {
        // No rules, anything goes.
        return true;
    }

    const testedRules = rules.map(rule => {
        const res = name.match(new RegExp(rule));
        return res === null ? rule : false;
    }).filter(rule => rule);

    const failedTest = testedRules.some(test => test);

    if(failedTest) {
        console.log(`The given name is invalid. Failed the following test(s):
"${ testedRules.map(e => colors.red(e)).join('",\n"') }"`);
    }

    return !failedTest;
}

export default nameIsValid;

export const NAMING_RULE_UPPER_CAMEL_CASE = [
    '^[A-Z].*$',    // Initial upper case
    '^[^-]*$',      // No dashes
    '^[^_]*$',      // No underscores
];
