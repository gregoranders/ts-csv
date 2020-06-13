import * as TestSubject from './index';

const toJson = (keys: string[], row: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj = {} as any;
  keys.forEach((key, keyIdx) => {
    obj[key] = row[keyIdx];
  });

  return obj;
};

describe(`${TestSubject.libname} ${TestSubject.libversion} - csv`, () => {
  describe('exports', () => {
    it('libname', () => {
      expect(TestSubject.libname).toBe('@gregoranders/csv');
    });

    it('libversion', () => {
      expect(TestSubject.libversion).toBe('0.0.1');
    });

    it('liburl', () => {
      expect(TestSubject.liburl).toMatch(/https/);
    });

    it('Parser', () => {
      expect(TestSubject.Parser).toBe(TestSubject.default);
    });

    it('default', () => {
      expect(TestSubject.Parser).toBeDefined();
    });
  });

  describe('parse', () => {
    describe('valid', () => {
      [
        {
          text: '',
          expected: [],
        },
        {
          text: 'a,b,c\n1,2,3',
          expected: [
            ['a', 'b', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: 'a,b,c\n1,2,3',
          expected: [
            ['a', 'b', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: 'a,"b,",c\n1,2,3',
          expected: [
            ['a', 'b,', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: 'a,"b\\"",c\n1,2,3',
          expected: [
            ['a', 'b"', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: 'a,"b\n",c\n1,2,3',
          expected: [
            ['a', 'b\n', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: 'a,b,c\n1,2,3\n',
          expected: [
            ['a', 'b', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: 'a,b,c\n1,2,',
          expected: [
            ['a', 'b', 'c'],
            ['1', '2', ''],
          ],
        },
      ].map(({ text, expected }) => {
        it(`${text.replace(/\n/g, '<NL>')} = ${JSON.stringify(
          expected,
        )}`, () => {
          const parser = new TestSubject.Parser();
          expect(parser.parse(text)).toStrictEqual(expected);
          expect(parser.rows).toStrictEqual(expected);
          if (expected.length) {
            expect(parser.json).toEqual([toJson(expected[0], expected[1])]);
          } else {
            expect(parser.json).toEqual([]);
          }
        });
      });
    });

    describe('invalid', () => {
      [
        {
          text: 'a,"b"",c\n1,2,3',
          expected: [0, 5],
        },
        {
          text: 'a,"b",c\n1,"2"",',
          expected: [1, 5],
        },
        {
          text: 'a,"b,c\n1,2,',
          expected: [0, 2],
        },
      ].map(({ text, expected }) => {
        it(`${text.replace(/\n/g, '<NL>')} => ParseError(${expected[0]}, ${
          expected[1]
          })`, () => {
            const parser = new TestSubject.Parser();
            expect(() => parser.parse(text)).toThrowError(
              `Invalid CSV at ${expected[0]}:${expected[1]}`,
            );
          });
      });
    });
  });

  describe(`custom - ${JSON.stringify({
    fieldSeparator: ';',
    quote: `'`,
    lineSeparator: '\t',
  })}`, () => {
    describe('valid', () => {
      [
        {
          text: '',
          expected: [],
        },
        {
          text: 'a;b;c\t1;2;3',
          expected: [
            ['a', 'b', 'c'],
            ['1', '2', '3'],
          ],
        },
        {
          text: "a;'b\n';c\t1;2;3",
          expected: [
            ['a', 'b\n', 'c'],
            ['1', '2', '3'],
          ],
        },
      ].map(({ text, expected }) => {
        it(`${text.replace(/\n/g, '<NL>')} = ${JSON.stringify(
          expected,
        )}`, () => {
          const parser = new TestSubject.Parser({
            fieldSeparator: ';',
            quote: `'`,
            lineSeparator: '\t',
          });
          expect(parser.parse(text)).toStrictEqual(expected);
          expect(parser.rows).toStrictEqual(expected);
          if (expected.length) {
            expect(parser.json).toEqual([toJson(expected[0], expected[1])]);
          } else {
            expect(parser.json).toEqual([]);
          }
        });
      });
    });

    describe('invalid', () => {
      [
        {
          text: 'a;"b"";c\n1,2,3',
          expected: [0, 5],
        },
      ].map(({ text, expected }) => {
        it(`${text.replace(/\n/g, '<NL>')} => ParseError(${expected[0]}, ${
          expected[1]
          })`, () => {
            const parser = new TestSubject.Parser({ fieldSeparator: ';' });
            expect(() => parser.parse(text)).toThrowError(
              `Invalid CSV at ${expected[0]}:${expected[1]}`,
            );
          });
      });
    });
  });
});
