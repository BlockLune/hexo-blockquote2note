import { assert } from 'chai';
import { blockquote2note } from '../lib/blockquote2note';

const exampleNoConfig = `
<!--blockquote2note-->
> This is Line 1 of this blockquote.
<!--end-blockquote2note-->
`;

const expectedResultNoConfig = `
{% note %}
This is Line 1 of this blockquote.
{% endnote %}
`;

const exampleNotFullConfig = `
<!--blockquote2note:,,Test-->
> This is Line 1 of this blockquote.
<!--end-blockquote2note-->
`

const expectedResultNotFullConfig = `
{% note Test %}
This is Line 1 of this blockquote.
{% endnote %}
`;

const exampleFullConfig = `
<!--blockquote2note:default,no-icon,Test-->
> This is Line 1 of this blockquote.
<!--end-blockquote2note-->
`;

const expectedResultFullConfig = `
{% note default no-icon Test %}
This is Line 1 of this blockquote.
{% endnote %}
`;

describe('Blockquote2note Tests', () => {
  it('Without config', () => {
    const result = blockquote2note(exampleNoConfig);
    assert.strictEqual(result, expectedResultNoConfig);
  });

  it('With not full config', () => {
    const result = blockquote2note(exampleNotFullConfig);
    assert.strictEqual(result, expectedResultNotFullConfig);
  });

  it('With full config', () => {
    const result = blockquote2note(exampleFullConfig);
    assert.strictEqual(result, expectedResultFullConfig);
  });
});
