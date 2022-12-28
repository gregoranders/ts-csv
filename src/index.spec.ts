/* eslint-disable jest/no-conditional-expect */
import * as TestSubject from '.';

const toJson = (keys: string[], row: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = {} as any;
  // eslint-disable-next-line unicorn/no-array-for-each
  keys.forEach((key, keyIndex) => {
    object[key] = row[keyIndex];
  });
  return object;
};

describe(`${TestSubject.libname} ${TestSubject.libversion} - csv`, () => {
  describe('exports', () => {
    it('libname', () => {
      expect(TestSubject.libname).toBe('@gregoranders/csv');
    });

    it('libversion', () => {
      expect(TestSubject.libversion).toBe('0.0.10');
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
        {
          text: '"a","b","c"\n"1","2",""',
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
          if (expected.length > 0) {
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
          expect(() => parser.parse(text)).toThrow(
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
          if (expected.length > 0) {
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
          expect(() => parser.parse(text)).toThrow(
            `Invalid CSV at ${expected[0]}:${expected[1]}`,
          );
        });
      });
    });
  });

  describe(`returned value is immutable`, () => {
    it('parse should return immutable value', () => {
      const testSubject = new TestSubject.Parser();
      const rows = testSubject.parse('1,2,3\n,b,c');

      // eslint-disable-next-line prettier/prettier
      const wrows = (rows as unknown) as Array<string[]>;
      expect.assertions(3);

      expect(() => {
        wrows.push(['test']);
      }).toThrow(
        TypeError('Cannot add property 2, object is not extensible'),
      );

      expect(() => {
        wrows[0].push('test');
      }).toThrow(
        TypeError('Cannot add property 3, object is not extensible'),
      );

      expect(() => {
        wrows[0][0] = 'test';
      }).toThrow(
        TypeError(
          `Cannot assign to read only property '0' of object '[object Array]'`,
        ),
      );
    });

    it('rows should return immutable value', () => {
      const testSubject = new TestSubject.Parser();
      testSubject.parse('1,2,3\n,b,c');

      // eslint-disable-next-line prettier/prettier
      const wrows = (testSubject.rows as unknown) as Array<string[]>;
      expect.assertions(3);

      expect(() => {
        wrows.push(['test']);
      }).toThrow(
        TypeError('Cannot add property 2, object is not extensible'),
      );

      expect(() => {
        wrows[0].push('test');
      }).toThrow(
        TypeError('Cannot add property 3, object is not extensible'),
      );

      expect(() => {
        wrows[0][0] = 'test';
      }).toThrow(
        TypeError(
          `Cannot assign to read only property '0' of object '[object Array]'`,
        ),
      );
    });

    it('json should return immutable value', () => {
      const testSubject = new TestSubject.Parser();
      testSubject.parse('1,2,3\n,b,c');

      // eslint-disable-next-line prettier/prettier
      const wrows = (testSubject.json as unknown) as Array<
        Record<string, string>
      >;
      expect.assertions(2);

      expect(() => {
        wrows.push({ test: 'test' });
      }).toThrow(
        TypeError('Cannot add property 1, object is not extensible'),
      );

      expect(() => {
        wrows[0]['1'] = 'test';
      }).toThrow(
        TypeError(
          `Cannot assign to read only property '1' of object '#<Object>'`,
        ),
      );
    });
  });
});
