import { NAMING_RULE_UPPER_CAMEL_CASE } from './nameIsValid.mjs';

export default function getNamingConvention(templateSettings) {

    if(typeof templateSettings.naming_convention !== 'undefined') {
        if(typeof templateSettings.naming_convention === 'string') {
            return [templateSettings.naming_convention]
        }

        if(typeof templateSettings.naming_convention === 'object' &&
                  templateSettings.naming_convention &&
                  templateSettings.naming_convention.length
        ) {
            return templateSettings.naming_convention
        }

        return false;
    }

    return NAMING_RULE_UPPER_CAMEL_CASE;
}
