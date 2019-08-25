import {inject, injectable, named} from "inversify";
import {TYPES} from "../di/types";
import {Request, Logger, RequestPromise} from "../di/ThirdPartyTypes"

export interface RequestOptions {
    url: string;
    method: string;
    headers?: any;
    body?: any;
    resolveWithFullResponse: boolean
}

export interface RequesterResponse {
    code: number;
    message?: string;
    body?: any;
}

@injectable()
export class GatewayFactory {
    readonly requestEngine: Request;
    readonly requestLogger: Logger;

    constructor(
        @inject(TYPES.Logger) @named("gatewayLogger")requestLogger: Logger,
        @inject(TYPES.Request) requestEngine: Request) {
        this.requestEngine = requestEngine;
        this.requestLogger = requestLogger;
    }

    build<T extends RequestOptions>(options: T): Gateway<T> {
        return new Gateway(this.requestLogger, this.requestEngine, options);
    }
}

export class Gateway<T extends RequestOptions> {

    readonly requestEngine: Request;
    readonly gatewayLogger: Logger;
    readonly options: T;

    constructor(
        @inject(TYPES.Logger) @named("gatewayLogger")gatewayLogger: Logger,
        @inject(TYPES.Request)requestEngine: Request,
        options: T) {
        this.requestEngine = requestEngine;
        this.gatewayLogger = gatewayLogger;
        this.options = options;
    }

    request(): Promise<RequesterResponse> {
        this.options.body = JSON.stringify(this.options.body);
        return new Promise<RequesterResponse>(async (resolve, reject) => {
            this.doRequest().then((response) => {
                let requesterResponse = {
                    code: response.code,
                    message: response.message,
                    body: response.body
                };
                this.gatewayLogger.info(requesterResponse);
                resolve(requesterResponse)
            }).catch((error) => {
                reject(error)
            })
        });
    }

    private doRequest(): RequestPromise {
        return this.requestEngine(this.options);
    }

}