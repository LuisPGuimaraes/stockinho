"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectService = createProjectService;
const debug_1 = __importDefault(require("debug"));
const getParsedConfigFile_1 = require("./getParsedConfigFile");
const validateDefaultProjectForFilesGlob_1 = require("./validateDefaultProjectForFilesGlob");
const DEFAULT_PROJECT_MATCHED_FILES_THRESHOLD = 8;
const log = (0, debug_1.default)('typescript-eslint:typescript-estree:createProjectService');
const logTsserverErr = (0, debug_1.default)('typescript-eslint:typescript-estree:tsserver:err');
const logTsserverInfo = (0, debug_1.default)('typescript-eslint:typescript-estree:tsserver:info');
const logTsserverPerf = (0, debug_1.default)('typescript-eslint:typescript-estree:tsserver:perf');
const logTsserverEvent = (0, debug_1.default)('typescript-eslint:typescript-estree:tsserver:event');
const doNothing = () => { };
const createStubFileWatcher = () => ({
    close: doNothing,
});
function createProjectService(optionsRaw, jsDocParsingMode, tsconfigRootDir) {
    const optionsRawObject = typeof optionsRaw === 'object' ? optionsRaw : {};
    const options = {
        defaultProject: 'tsconfig.json',
        ...optionsRawObject,
    };
    (0, validateDefaultProjectForFilesGlob_1.validateDefaultProjectForFilesGlob)(options.allowDefaultProject);
    // We import this lazily to avoid its cost for users who don't use the service
    // TODO: Once we drop support for TS<5.3 we can import from "typescript" directly
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tsserver = require('typescript/lib/tsserverlibrary');
    // TODO: see getWatchProgramsForProjects
    // We don't watch the disk, we just refer to these when ESLint calls us
    // there's a whole separate update pass in maybeInvalidateProgram at the bottom of getWatchProgramsForProjects
    // (this "goes nuclear on TypeScript")
    const system = {
        ...tsserver.sys,
        clearImmediate,
        clearTimeout,
        setImmediate,
        setTimeout,
        watchDirectory: createStubFileWatcher,
        watchFile: createStubFileWatcher,
        // We stop loading any TypeScript plugins by default, to prevent them from attaching disk watchers
        // See https://github.com/typescript-eslint/typescript-eslint/issues/9905
        ...(!options.loadTypeScriptPlugins && {
            require: () => ({
                error: {
                    message: 'TypeScript plugins are not required when using parserOptions.projectService.',
                },
                module: undefined,
            }),
        }),
    };
    const logger = {
        close: doNothing,
        endGroup: doNothing,
        getLogFileName: () => undefined,
        // The debug library doesn't use levels without creating a namespace for each.
        // Log levels are not passed to the writer so we wouldn't be able to forward
        // to a respective namespace.  Supporting would require an additional flag for
        // granular control.  Defaulting to all levels for now.
        hasLevel: () => true,
        info(s) {
            this.msg(s, tsserver.server.Msg.Info);
        },
        loggingEnabled: () => 
        // if none of the debug namespaces are enabled, then don't enable logging in tsserver
        logTsserverInfo.enabled ||
            logTsserverErr.enabled ||
            logTsserverPerf.enabled,
        msg: (s, type) => {
            switch (type) {
                case tsserver.server.Msg.Err:
                    logTsserverErr(s);
                    break;
                case tsserver.server.Msg.Perf:
                    logTsserverPerf(s);
                    break;
                default:
                    logTsserverInfo(s);
            }
        },
        perftrc(s) {
            this.msg(s, tsserver.server.Msg.Perf);
        },
        startGroup: doNothing,
    };
    log('Creating project service with: %o', options);
    const service = new tsserver.server.ProjectService({
        cancellationToken: { isCancellationRequested: () => false },
        eventHandler: logTsserverEvent.enabled
            ? (e) => {
                logTsserverEvent(e);
            }
            : undefined,
        host: system,
        jsDocParsingMode,
        logger,
        session: undefined,
        useInferredProjectPerProjectRoot: false,
        useSingleInferredProject: false,
    });
    service.setHostConfiguration({
        preferences: {
            includePackageJsonAutoImports: 'off',
        },
    });
    log('Enabling default project: %s', options.defaultProject);
    let configFile;
    try {
        configFile = (0, getParsedConfigFile_1.getParsedConfigFile)(tsserver, options.defaultProject, tsconfigRootDir);
    }
    catch (error) {
        if (optionsRawObject.defaultProject) {
            throw new Error(`Could not read project service default project '${options.defaultProject}': ${error.message}`);
        }
    }
    if (configFile) {
        service.setCompilerOptionsForInferredProjects(
        // NOTE: The inferred projects API is not intended for source files when a tsconfig
        // exists.  There is no API that generates an InferredProjectCompilerOptions suggesting
        // it is meant for hard coded options passed in. Hard asserting as a work around.
        // See https://github.com/microsoft/TypeScript/blob/27bcd4cb5a98bce46c9cdd749752703ead021a4b/src/server/protocol.ts#L1904
        configFile.options);
    }
    return {
        allowDefaultProject: options.allowDefaultProject,
        lastReloadTimestamp: performance.now(),
        maximumDefaultProjectFileMatchCount: options.maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING ??
            DEFAULT_PROJECT_MATCHED_FILES_THRESHOLD,
        service,
    };
}
//# sourceMappingURL=createProjectService.js.map