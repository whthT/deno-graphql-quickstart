export enum LoggerTypes {
    I18N = 'i18n'
}
class Logger {
    _formatter(type: LoggerTypes, texts: string[]) {
        return `[${type}] ${texts.join(' ')}`
    }

    info(type: LoggerTypes, ...text: string[]) {
        console.log(this._formatter(type, text))
    }

    warn(type: LoggerTypes, ...text: string[]) {
        console.warn(this._formatter(type, text))
    }

    error(type: LoggerTypes, ...text: string[]) {
        console.error(this._formatter(type, text))
    }

    fatal(type: LoggerTypes, ...text: string[]) {
        throw new Error(this._formatter(type, text))
    }
}

const logger = new Logger()

export default logger