import * as path from 'path';
import { browser, ElementFinder } from 'protractor';

const remote = require('selenium-webdriver/remote');

export class UploadHelper {
    static readonly UPLOAD_FOLDER_PATH = 'e2e/resources';

    static getFilUploadPath(file: string) {
        return path.join(path.resolve('.'), UploadHelper.UPLOAD_FOLDER_PATH, file);
    }

    static async uploadFile(item: ElementFinder, filePath: string) {
        await browser.setFileDetector(new remote.FileDetector());
        await item.sendKeys(filePath);
    }
}
