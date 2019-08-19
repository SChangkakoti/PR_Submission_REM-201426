export class RequestBuilder {
    uri: string;
    port?: number;
    headers: any;
    method?: string;
    contentType?: string;
    formData?: any;
    body?: any;
    qs?: any;
    jar?: any;
    resolveWithFullResponse?: boolean;
    simple?: boolean;
    transform?: Function;
    cert?: Buffer;
    key?: Buffer;
    ca?: Buffer;
}
