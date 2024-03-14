import { TypeFlagOptions, Flags as Flags$1, TypeFlag } from 'type-flag';
import { Options } from 'terminal-columns';

type CommandOptions<Parameters = string[]> = {
    /**
    Name of the command used to invoke it. Also displayed in `--help` output.
    */
    name: string;
    /**
    Aliases for the command used to invoke it. Also displayed in `--help` output.
    */
    alias?: string | string[];
    /**
    Parameters accepted by the command. Parameters must be in the following formats:

    - Required parameter: `<parameter name>`
    - Optional parameter: `[parameter name]`
    - Required spread parameter: `<parameter name...>`
    - Optional spread parameter: `[parameter name...]`
    */
    parameters?: Parameters;
    /**
    Flags accepted by the command
    */
    flags?: Flags;
    /**
    Options to configure the help documentation. Pass in `false` to disable handling `--help, -h`.
    */
    help?: false | HelpOptions;
    /**
     * Which argv elements to ignore from parsing
     */
    ignoreArgv?: TypeFlagOptions['ignore'];
};
declare function command<Options extends CommandOptions<[...Parameters]>, Parameters extends string[]>(options: Readonly<Options> & CommandOptions<[...Parameters]>, callback?: CallbackFunction<ParseArgv<Options, Parameters>>): Command<Options, ParseArgv<Options, Parameters, Options['name']>>;
type Command<Options extends CommandOptions = CommandOptions, ParsedType = any> = {
    readonly options: Options;
    readonly callback?: CallbackFunction<any>;
    [parsedType]: ParsedType;
};

type FlagData = {
    name: string;
    flag: Flags[string];
    flagFormatted: string;
    aliasesEnabled: boolean;
    aliasFormatted: string | undefined;
};

type TypeFunction = (value: any) => any;
type HelpDocumentNodeOrString<Type extends PropertyKey> = string | HelpDocumentNode<Type>;
declare class Renderers {
    text(text: string): string;
    bold(text: string): string;
    indentText({ text, spaces }: {
        text: string;
        spaces: number;
    }): string;
    heading(text: string): string;
    section({ title, body, indentBody, }: {
        title?: string;
        body?: string;
        indentBody?: number;
    }): string;
    table({ tableData, tableOptions, tableBreakpoints, }: {
        tableData: string[][];
        tableOptions?: Options;
        tableBreakpoints?: Record<string, Options>;
    }): string;
    flagParameter(typeFunction: TypeFunction | readonly [TypeFunction]): string;
    flagOperator(_: FlagData): string;
    flagName(flagData: FlagData): string;
    flagDefault(value: any): string;
    flagDescription({ flag }: FlagData): string;
    render(nodes: (HelpDocumentNodeOrString<keyof this> | HelpDocumentNodeOrString<keyof this>[])): string;
}

declare const parsedType: unique symbol;
type Flags = Flags$1<{
    /**
    Description to be used in help output

    @example
    ```
    description: 'Unit of output (metric, imperial)',
    ```
    */
    description?: string;
    /**
    Placeholder label to be used in help output

    @example Required value
    ```
    placeholder: '<locale>'
    ```
    */
    placeholder?: string;
}>;
type CallbackFunction<Parsed> = (parsed: {
    [Key in keyof Parsed]: Parsed[Key];
}) => void;
type HasVersion<Options extends {
    flags?: Flags;
}> = (Options extends {
    version: string;
} ? Options['flags'] & {
    version: BooleanConstructor;
} : Options['flags']);
type HasHelp<Options extends {
    flags?: Flags;
}> = (Options extends {
    help: false;
} ? Options['flags'] : Options['flags'] & {
    help: BooleanConstructor;
});
type HasHelpOrVersion<Options extends {
    flags?: Flags;
}> = (HasVersion<Options> & HasHelp<Options>);
type HelpDocumentNode<Types extends PropertyKey = keyof Renderers> = {
    id?: string;
    type: Types;
    data: any;
};
type HelpOptions = {
    /**
    Version of the script displayed in `--help` output. Use to avoid enabling `--version` flag.
    */
    version?: string;
    /**
    Description of the script or command to display in `--help` output.
    */
    description?: string;
    /**
    Usage code examples to display in `--help` output.
    */
    usage?: false | string | string[];
    /**
    Example code snippets to display in `--help` output.
    */
    examples?: string | string[];
    /**
    Function to customize the help document before it is logged.
    */
    render?: (nodes: HelpDocumentNode<keyof Renderers>[], renderers: Renderers) => string;
};
type CliOptions<Commands = Command[], Parameters extends string[] = string[]> = {
    /**
    Name of the script displayed in `--help` output.
    */
    name?: string;
    /**
    Version of the script displayed in `--version` and `--help` outputs.
    */
    version?: string;
    /**
    Parameters accepted by the script. Parameters must be in the following formats:

    - Required parameter: `<parameter name>`
    - Optional parameter: `[parameter name]`
    - Required spread parameter: `<parameter name...>`
    - Optional spread parameter: `[parameter name...]`
    */
    parameters?: Parameters;
    /**
    Commands to register to the script.
    */
    commands?: Commands;
    /**
    Flags accepted by the script
    */
    flags?: Flags;
    /**
    Options to configure the help documentation. Pass in `false` to disable handling `--help, -h`.
    */
    help?: false | HelpOptions;
    /**
     * Which argv elements to ignore from parsing
     */
    ignoreArgv?: TypeFlagOptions['ignore'];
};
type AlphabetLowercase = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
type Numeric = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type AlphaNumeric = AlphabetLowercase | Uppercase<AlphabetLowercase> | Numeric;
type CamelCase<Word extends string> = (Word extends `${infer FirstCharacter}${infer Rest}` ? (FirstCharacter extends AlphaNumeric ? `${FirstCharacter}${CamelCase<Rest>}` : Capitalize<CamelCase<Rest>>) : Word);
type StripBrackets<Parameter extends string> = (Parameter extends `<${infer ParameterName}>` | `[${infer ParameterName}]` ? (ParameterName extends `${infer SpreadName}...` ? SpreadName : ParameterName) : never);
type ParameterType<Parameter extends string> = (Parameter extends `<${infer _ParameterName}...>` | `[${infer _ParameterName}...]` ? string[] : Parameter extends `<${infer _ParameterName}>` ? string : Parameter extends `[${infer _ParameterName}]` ? string | undefined : never);
type WithCommand<Options extends {
    flags?: Flags;
}, Command extends string | undefined = undefined> = {
    command: Command;
} & Options;
type TypeFlagWrapper<Options extends {
    flags?: Flags;
}, Parameters extends string[]> = TypeFlag<HasHelpOrVersion<Options>> & {
    _: {
        [Parameter in Parameters[number] as CamelCase<StripBrackets<Parameter>>]: ParameterType<Parameter>;
    };
    showHelp: (options?: HelpOptions) => void;
    showVersion: () => void;
};
type ParseArgv<Options extends {
    flags?: Flags;
}, Parameters extends string[], Command extends string | undefined = ''> = (Command extends '' ? TypeFlagWrapper<Options, Parameters> : WithCommand<TypeFlagWrapper<Options, Parameters>, Command>);

declare function cli<Options extends CliOptions<undefined, [...Parameters]>, Parameters extends string[]>(options: Options & CliOptions<undefined, [...Parameters]>, callback?: CallbackFunction<ParseArgv<Options, Parameters>>, argv?: string[]): {
    [Key in keyof ParseArgv<Options, Parameters, undefined>]: ParseArgv<Options, Parameters, undefined>[Key];
};
declare function cli<Options extends CliOptions<[...Commands], [...Parameters]>, Commands extends Command[], Parameters extends string[]>(options: Options & CliOptions<[...Commands], [...Parameters]>, callback?: CallbackFunction<ParseArgv<Options, Parameters>>, argv?: string[]): ({
    [Key in keyof ParseArgv<Options, Parameters, undefined>]: ParseArgv<Options, Parameters, undefined>[Key];
} | {
    [KeyA in keyof Commands]: (Commands[KeyA] extends Command ? ({
        [KeyB in keyof Commands[KeyA][typeof parsedType]]: Commands[KeyA][typeof parsedType][KeyB];
    }) : never);
}[number]);

export { Command, Renderers, cli, command };
