import { assert, expect } from 'chai';
import { blockquoteLines2NoteLines } from '../lib/line_transformation';


describe('Lines Transformation Tests', () => {
  it('should work when blockquote has no config', () => {
    const exampleLinesNoConfig = [
      '<!--blockquote2note-->',
      '> This is Line 1 of this blockquote.',
      '<!--end-blockquote2note-->'
    ];
    const result = blockquoteLines2NoteLines(exampleLinesNoConfig);
    const expectedResult = [
      '{% note %}',
      'This is Line 1 of this blockquote.',
      '{% endnote %}'
    ];
    assert.deepStrictEqual(result, expectedResult);
  });

  it('should work when blockquote has not full config', () => {
    const exampleLinesNotFullConfig = [
      '<!--blockquote2note:,,Test-->',
      '> This is Line 1 of this blockquote.',
      '<!--end-blockquote2note-->'
    ];
    const result = blockquoteLines2NoteLines(exampleLinesNotFullConfig);
    const expectedResult = [
      '{% note Test %}',
      'This is Line 1 of this blockquote.',
      '{% endnote %}'
    ];
    assert.deepStrictEqual(result, expectedResult);
  });

  it('should work when blockquote has full config', () => {
    const exampleLinesFullConfig = [
      '<!--blockquote2note:default,no-icon,Test-->',
      '> This is Line 1 of this blockquote.',
      '<!--end-blockquote2note-->'
    ];
    const result = blockquoteLines2NoteLines(exampleLinesFullConfig);
    const expectedResult = [
      '{% note default no-icon Test %}',
      'This is Line 1 of this blockquote.',
      '{% endnote %}'
    ];
    assert.deepStrictEqual(result, expectedResult);
  });

  it('should work when a blockquote has many lines', () => {
    const exampleLinesManyContentLines = [
      '<!--blockquote2note-->',
      '> This is Line 1 of this blockquote.',
      '> This is Line 2 of this blockquote.',
      '> This is Line 3 of this blockquote.',
      '<!--end-blockquote2note-->'
    ];
    const result = blockquoteLines2NoteLines(exampleLinesManyContentLines);
    const expectedResult = [
      '{% note %}',
      'This is Line 1 of this blockquote.',
      'This is Line 2 of this blockquote.',
      'This is Line 3 of this blockquote.',
      '{% endnote %}'
    ];
    assert.deepStrictEqual(result, expectedResult);
  });

  it('should work when lines between HEAD and TAIL are all quotes', () => {
    const exampleLinesAllQuotes = [
      '<!--blockquote2note-->',
      '> This is Line 1 of this blockquote.',
      '>', // a blank line
      '> This is Line 3 of this blockquote.',
      '<!--end-blockquote2note-->'
    ];
    const result = blockquoteLines2NoteLines(exampleLinesAllQuotes);
    const expectedResult = [
      '{% note %}',
      'This is Line 1 of this blockquote.',
      '', // a blank line
      'This is Line 3 of this blockquote.',
      '{% endnote %}'
    ];
    assert.deepStrictEqual(result, expectedResult);
  });

  it('should ignore the purely blank lines between HEAD and TAIL', () => {
    const exampleLinesAllQuotes = [
      '<!--blockquote2note-->',
      '   ', // purely blank line
      '> This is Line 1 of this blockquote.',
      '>', // a blank line
      '> This is Line 3 of this blockquote.',
      '', // purely blank line
      '<!--end-blockquote2note-->'
    ];
    const result = blockquoteLines2NoteLines(exampleLinesAllQuotes);
    const expectedResult = [
      '{% note %}',
      '   ',
      'This is Line 1 of this blockquote.',
      '', // a blank line
      'This is Line 3 of this blockquote.',
      '',
      '{% endnote %}'
    ];
    assert.deepStrictEqual(result, expectedResult);
  });

  it('should throw error when lines between HEAD and TAIL are not all quotes', () => {
    const exampleLinesNotAllQuotes = [
      '<!--blockquote2note-->',
      'This is Line 1 of this blockquote. (Not quote)',
      '> This is Line 2 of this blockquote.',
      'This is Line 3 of this blockquote. (Not quote)',
      '<!--end-blockquote2note-->'
    ];
    expect(() => blockquoteLines2NoteLines(exampleLinesNotAllQuotes)).to.throw(SyntaxError, 'All lines in a blockquote should start with ">".');
  });
});

