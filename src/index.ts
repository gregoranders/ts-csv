/**
 * simple CSV parser
 *
 * @packageDocumentation
 */

/**
 * library name
 *
 * @public
 * @readonly
 */
export const libname = '@gregoranders/csv';

/**
 * library version
 *
 * @public
 * @readonly
 */
export const libversion = '0.0.12';

/**
 * library homepage
 *
 * @public
 * @readonly
 */
export const liburl = 'https://gregoranders.github.io/ts-csv/';

/**
 * csv field
 *
 * @public
 */
export type Field = string;

/**
 * csv row
 *
 * @public
 */
export type Row = Array<Field>;

/**
 * parser configuration
 *
 * @public
 */
export interface Configuration {
  /**
   * field separator
   *
   * @defaultValue `,`
   */
  fieldSeparator?: string;
  /**
   * line separator
   *
   * @defaultValue `\n`
   */
  lineSeparator?: string;
  /**
   * quote character
   *
   * @defaultValue `"`
   */
  quote?: string;
}

const DefaultConfiguration = {
  fieldSeparator: ',',
  lineSeparator: '\n',
  quote: '"',
};

interface State {
  appendCell: boolean;
  appendField: boolean;
  appendRow: boolean;
  field: number;
  fieldOffset: number;
  line: number;
  lineOffset: number;
  quoted: boolean;
}

const CSV_INITAL_STATE = {
  field: 0,
  fieldOffset: 0,
  line: 0,
  lineOffset: 0,
  quoted: false,
  appendCell: false,
  appendField: false,
  appendRow: false,
} as State;

class ParseError extends Error {
  public constructor(line: number, column: number) {
    super(`Invalid CSV at ${line}:${column}`);
  }
}

/**
 * csv parser
 *
 * @example
 * ```ts
 * import Parser from '@gregoranders/csv';
 *
 * const parser = new Parser();
 * const rows = parser.parse('a,b,c\n1,2,3\n4,5,6');
 * ```
 *
 * @typeParam T - the type returned by {@link Parser#json}
 * @public
 */
export class Parser<T = Record<string, string>> {
  private _rows = [] as Row[];

  private _row = [] as Field[];

  private _cell = '';

  private _options = DefaultConfiguration;

  private _state = { ...CSV_INITAL_STATE };

  private _index = 0;

  private _current = '';

  private _previous = '';

  private _quoteState = { ...CSV_INITAL_STATE };

  /**
   * constructor
   *
   * @param configuration - optional configuration
   */
  public constructor(configuration: Configuration = DefaultConfiguration) {
    this._options = Object.assign({}, DefaultConfiguration, configuration);
  }

  /**
   * parse csv
   *
   * @param text - CSV text
   * @returns an array of {@link Row}s
   *
   * @throws Error on parse error
   * @readonly
   */
  public parse(text: string): readonly Row[] {
    this.reset();

    for (this._index = 0; this._index < text.length; this._index++) {
      this._state.appendCell = true;
      this._previous = this._current;
      this._current = text[this._index];
      this.handleNext();
    }

    if (this._row.length > 0) {
      this.addField(this.fieldValue(this._cell), this._row, this._state);
      this.addRow(this._row, this._rows, this._state);
    }

    if (this._state.quoted) {
      throw new ParseError(
        this._quoteState.line,
        this._quoteState.lineOffset,
      );
    }

    this.makeImmutable();

    return this._rows;
  }

  /**
   * returns rows
   *
   * @returns an array of {@link Row}s
   * @readonly
   * @virtual
   */
  public get rows(): readonly Row[] {
    return this._rows;
  }

  /**
   * returns rows as JSON using the first row as property name provider
   *
   * @returns an array of {@link Row}s as JSON
   * @readonly
   * @virtual
   */
  public get json(): readonly T[] {
    if (this.rows.length > 0) {
      const keys = this.rows[0].filter(
        (field) => typeof field === 'string',
      ) as string[];

      return Object.freeze(
        this.rows
          .filter((row, index) => row && index > 0)
          .map((row) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const object = {} as any;
            // eslint-disable-next-line unicorn/no-array-for-each
            keys.forEach((key, keyIndex) => {
              object[key] = row[keyIndex];
            });
            return Object.freeze(object);
          }),
      );
    }

    return Object.freeze([]);
  }

  private handleNext() {
    this.handleQuote() ||
      this.handleFieldSeparator() ||
      this.handleLineSeparator();
    this.processState();
  }

  private handleQuote() {
    if (this._current === this._options.quote) {
      this._quoteState = { ...this._state };
      if (this._previous === '\\') {
        this.handleQuoteEscaped();
      } else {
        this.handleQuoteNotEscaped();
      }
      return true;
    }
    return false;
  }

  private handleQuoteEscaped() {
    this._cell = this._cell.slice(0, Math.max(0, this._cell.length - 1));
  }

  private handleQuoteNotEscaped() {
    if (this._cell.length === 0 || this._state.quoted) {
      this._state.quoted = !this._state.quoted;
    } else {
      throw new ParseError(this._state.line, this._state.lineOffset);
    }
    this._state.appendCell = false;
  }

  private handleFieldSeparator() {
    if (this._current === this._options.fieldSeparator) {
      if (!this._state.quoted) {
        this._state.appendCell = false;
        this._state.appendField = true;
      }
      return true;
    }
    return false;
  }

  private handleLineSeparator() {
    if (this._current === this._options.lineSeparator) {
      if (!this._state.quoted) {
        this._state.appendCell = false;
        this._state.appendField = true;
        this._state.appendRow = true;
      }
      return true;
    }
    return false;
  }

  private processState() {
    if (this._state.appendCell) {
      this._cell += this._current;
    }

    if (this._state.appendField) {
      this.addField(this.fieldValue(this._cell), this._row, this._state);
      this._cell = '';
    }

    if (this._state.appendRow) {
      this.addRow(this._row, this._rows, this._state);
      this._row = [] as Field[];
    }

    this._state.lineOffset++;
    this._state.fieldOffset++;
  }

  private fieldValue(cell: string): Field {
    return cell;
  }

  private addField<F extends Field, T extends Row>(
    field: F,
    row: T,
    state: State,
  ) {
    row.push(field);
    state.field++;
    state.fieldOffset = -1;
    state.appendField = false;
  }

  private addRow<T extends Row>(row: T, rows: T[], state: State) {
    rows.push(row);
    state.field = 0;
    state.line++;
    state.lineOffset = -1;
    state.appendRow = false;
  }

  private makeImmutable() {
    // eslint-disable-next-line unicorn/no-array-for-each
    this.rows.forEach((row) => {
      // eslint-disable-next-line unicorn/no-array-for-each
      row.forEach((value) => Object.freeze(value));
      Object.freeze(row);
    });
    Object.freeze(this._rows);
  }

  private reset() {
    this._rows = [];
    this._row = [];
    this._cell = '';
    this._state = { ...CSV_INITAL_STATE };
    this._index = 0;
    this._current = '';
    this._previous = '';
    this._quoteState = { ...CSV_INITAL_STATE };
  }
}

/**
 * default export
 *
 * @public
 */
export default Parser;
