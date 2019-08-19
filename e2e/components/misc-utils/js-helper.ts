export class JsHelper {
    static trimArray(arr: string[]) {
        for (let index = 0; index < arr.length; index++) {
            arr[index] =
                arr[index]
                    .replace(/^\s\s*/, '')
                    .replace(/\s\s*$/, '');
        }
        return arr;
    }

    static cleanArray (arr: string[]) {
        const newArray = new Array();
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]) {
            newArray.push(arr[i]);
          }
        }
        return newArray;
    }
}
