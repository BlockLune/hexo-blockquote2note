import { assert, expect } from 'chai';
import { getNoteHead } from '../lib/note';

describe('Note Head Tests', () => {
  it('should work when given full options (all valid)', () => {
    const fullOptions = 'default,no-icon,Test';
    const result = getNoteHead(fullOptions);
    const expectedResult = '{% note default no-icon Test %}';
    assert.strictEqual(result, expectedResult);
  });

  it('should work when given partial options (all valid)', () => {
    const partialOptions = ',,Test';
    const result = getNoteHead(partialOptions);
    const expectedResult = '{% note Test %}'; assert.strictEqual(result, expectedResult);
  });

  it('should work when given no options', () => {
    const result = getNoteHead();
    const expectedResult = '{% note %}';
    assert.strictEqual(result, expectedResult);
  });

  it('should throw error when given an invalid note type', () => {
    const invalidNoteType = 'invalidNoteType,,';
    expect(() => getNoteHead(invalidNoteType)).to.throw(SyntaxError, 'Invalid note type.');
  });

  it('should throw error when given an invalid icon type', () => {
    const invalidIconType = ',invalidIconType,';
    expect(() => getNoteHead(invalidIconType)).to.throw(SyntaxError, 'Invalid icon type.');
  });

  it('should work when given more than two commas', () => {
    const options = ',,This is the third option, with comma.';
    const result = getNoteHead(options);
    const expectedResult = '{% note This is the third option, with comma. %}';
    assert.strictEqual(result, expectedResult);
  });
});
