import * as request from "request-promise";
import * as nodeCache from "node-cache";
import * as bunyan from "bunyan";
import {Client, logger, TaskService, Task, Variables} from "camunda-external-task-client-js";
import * as isUUID from "is-uuid";
import * as UUID from "uuid";
import * as fs from "fs";
import * as child_process from "child_process";
import {DOMParser, XMLSerializer} from "xmldom";
import * as xpath from "xpath";
import * as moment from "moment";
import * as async from "async";

export type Request = typeof request;
export type RequestPromise = request.RequestPromise;
export type NodeCache = nodeCache;
export type Logger = bunyan;
export type CamundaClient = Client;
export type CamundaLogger = typeof logger;
export type TaskService = TaskService;
export type Task = Task;
export type Variables = Variables;
export type IsUUID = typeof isUUID;
export type UUID = typeof UUID;
export type FS = typeof fs;
export type EXEC = typeof child_process.execSync;
export type _DOMParser = DOMParser;
export type _XMLSerializer = XMLSerializer;
export type XPath = typeof xpath;
export type Moment = typeof moment;
export type Async = typeof async;
