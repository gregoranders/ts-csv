## API Report File for "@gregoranders/csv"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export interface Configuration {
    fieldSeparator?: string;
    lineSeparator?: string;
    quote?: string;
}

// @public
export type Field = string;

// @public
export const libname = "@gregoranders/csv";

// @public
export const liburl = "https://gregoranders.github.io/ts-csv/";

// @public
export const libversion = "0.0.13";

// @public
class Parser<T = Record<string, string>> {
    constructor(configuration?: Configuration);
    // @virtual
    get json(): readonly T[];
    parse(text: string): readonly Row[];
    // @virtual
    get rows(): readonly Row[];
}
export { Parser }
export default Parser;

// @public
export type Row = Array<Field>;

```
