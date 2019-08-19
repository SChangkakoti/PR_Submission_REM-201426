import { ContentType } from '../../components/misc-utils/content-type-helper';

import { AureaRestWrapper } from './aurea-rest-wrapper';

export class ApiInvoker {

    /**
     * Post call to API
     * @param {string} uri application uri
     * @param {any} body content to be sent in body
     * @param {any} header optional parameter, default value: {'Content-Type': 'application/json'}
     * @returns {Promise<Response>}
     */
    async makePostToAPI(uri: string, body: any,
                        header = ContentType.JSON,
                        jsonTypeRequest = true) {
        return new AureaRestWrapper()
            .post(uri)
            .headers(header)
            .send(body, jsonTypeRequest)
            .end();
    }
}
