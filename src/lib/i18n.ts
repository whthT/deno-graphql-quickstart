import Language from "../consts/Language.ts";
import {join} from "https://deno.land/std/path/mod.ts";
import {existsSync} from "https://deno.land/std/fs/mod.ts";
import {IKeyValueParameter} from "../contracts/IParameter.ts";
import logger, {LoggerTypes} from "./logger.ts";

export interface II18NAttributes extends IKeyValueParameter {}

export type II18NData = {
    [key in Language]?: IKeyValueParameter;
};
class I18N {
    locale: Language
    initialLocale: Language
    data: II18NData = {}
    isLocaleFileLoaded: boolean = false

    constructor(locale: Language) {
        this.locale = locale
        this.initialLocale = locale
    }

    getLocaleFile(locale: Language|null = null): string {
        return join(Deno.cwd(), 'src/locales', (locale || this.locale) + '.json')
    }
    setLocale(locale: Language) {
        this.data = {}
        this.locale = locale
        this.isLocaleFileLoaded = false
    }
    reset() {
        this.setLocale(this.initialLocale)
    }
    replacer(text: string, attributes?: II18NAttributes) {
        let mirror = text
        if (attributes) {
            for(const attr in attributes) {
                const key = `:${attr}`
                if (mirror.indexOf(key) >= 0) {
                    mirror = mirror.replace(new RegExp(key, 'gm'), attributes[attr])
                }
            }
        }

        return mirror
    }

    format(text: string, attributes?: II18NAttributes, locale: Language|null = null): string {
        const __locale = locale || this.locale
        if (! this.isLocaleFileLoaded) {
            const localeFilePath = this.getLocaleFile(__locale)
            if (!existsSync(localeFilePath)) {
                logger.warn(LoggerTypes.I18N, `"${localeFilePath}" file not found in ${__locale} locale.`)
                return this.replacer(text, attributes);
            }

            this.data[__locale] = JSON.parse(Deno.readTextFileSync(localeFilePath))
        }

        // @ts-ignore
        if (this.data[__locale].hasOwnProperty(text)) {
            // @ts-ignore
            return this.replacer(this.data[__locale][text], attributes)
        }
        logger.warn(LoggerTypes.I18N, `"${text}" key not found in ${__locale} locale.`)
        return this.replacer(text, attributes);
    }

    __(text: string, attributes?: II18NAttributes, locale: Language|null = null): string {
       return this.format(text, attributes, locale)
    }
}

const i18n = new I18N(Language.TR)
export function __(text: string, attributes?: II18NAttributes, locale?: Language|null) {
    return i18n.__(text, attributes, locale)
}
export default i18n