export * from './clear-caches';
export * from './create-program/getScriptKind';
export { getCanonicalFileName } from './create-program/shared';
export { createProgramFromConfigFile as createProgram } from './create-program/useProvidedPrograms';
export * from './getModifiers';
export { TSError } from './node-utils';
export { type AST, parse, parseAndGenerateServices, type ParseAndGenerateServicesResult, } from './parser';
export type { ParserServices, ParserServicesWithoutTypeInformation, ParserServicesWithTypeInformation, TSESTreeOptions, } from './parser-options';
export { simpleTraverse } from './simple-traverse';
export * from './ts-estree';
export { typescriptVersionIsAtLeast } from './version-check';
export { withoutProjectParserOptions } from './withoutProjectParserOptions';
export declare const version: string;
//# sourceMappingURL=index.d.ts.map