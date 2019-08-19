import { ConstantsFactory } from '@aurea/protractor-automation-helper';

export class Constants extends ConstantsFactory {
    static readonly MAX_RETRY_ATTEMPTS = 3;
    static readonly EMPTY_STRING = '';
    static readonly MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    static get separators() {
        return {
            comma: ',',
            semiColon: ';',
            apostrophe: '\'',
            pipe: '|',
            hyphen: '-',
        };
    }

    static get number() {
        return {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            twenty: 20,
            twentyTwo: 22,
            thirty: 30,
            thirtyTwo: 32,
            thirtyFour: 34,
            eighty: 80,
            hundred: 100,
            oneFifty: 150,
            sevenHundred: 700,
            eightHundred: 800,
        };
    }

    static get colorCode() {
        return {
            red: 'rgba(189, 32, 46, 1)',
            blue: 'rgba(30, 144, 255, 1)',
        };
    }

    static get boolean() {
        return {
            true: true,
            false: false,
        };
    }

    static get stringNumber() {
        return {
            zero: '0',
            one: '1',
            two: '2',
            zeroZero: '00',
            zeroOne: '01',
            zeroTwo: '02',
        };
    }

    static get specialCharacters() {
        return {
            at: '@',
        };
    }

    static readonly letters = Object.freeze({
        c: 'c',
        v: 'v',
    });
}
