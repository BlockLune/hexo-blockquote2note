import { assert } from 'chai';
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
});

