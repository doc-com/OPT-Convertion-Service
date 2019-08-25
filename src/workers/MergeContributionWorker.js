"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const Worker_1 = require("./Worker");
const WorkerExceptions_1 = require("./exceptions/WorkerExceptions");
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const OPTService_1 = require("../opt/OPTService");
let MergeContributionWorker = class MergeContributionWorker extends Worker_1.Worker {
    constructor(optService, workerLogger) {
        super(workerLogger);
        this.topic = "mergeContribution";
        this.variableNames = ["answers", "taggedContribution"];
        this.optService = optService;
    }
    validateInput() {
        return [];
    }
    work(params) {
        return new Promise((resolve, reject) => {
            try {
                this.optService.mergeContribution(params.answers, params.taggedContribution).then((mergedContribution) => {
                    const processVariables = new camunda_external_task_client_js_1.Variables();
                    processVariables.setTyped("mergedContribution", {
                        value: mergedContribution,
                        type: "xml",
                        valueInfo: {
                            transient: true
                        }
                    });
                    resolve(new Worker_1.WorkResults(processVariables));
                });
            }
            catch (error) {
                this.workerLogger.error(error);
                reject(new WorkerExceptions_1.ExternalResourceFailureException({
                    body: error.response.body,
                    error: error.error,
                    message: error.message,
                    uri: error.options.uri,
                    statusCode: error.statusCode
                }));
            }
        });
    }
};
MergeContributionWorker = __decorate([
    __param(0, inversify_1.inject(types_1.TYPES.OPTService)),
    __param(1, inversify_1.inject(types_1.TYPES.Logger)), __param(1, inversify_1.named("workerLogger")),
    __metadata("design:paramtypes", [OPTService_1.OPTService, Object])
], MergeContributionWorker);
exports.MergeContributionWorker = MergeContributionWorker;
//# sourceMappingURL=MergeContributionWorker.js.map