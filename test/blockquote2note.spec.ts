import { assert } from 'chai';
import { blockquote2note } from '../lib/blockquote2note';

const example_blockquote_with_config = `
This is an example.

<!--blockquote2note-->
<!--blockquote2note-config:default,no-icon,'Test'-->
> This is Line 1 of this blockquote.
> This is Line 2 of this blockquote.
<!--end-blockquote2note-->
`;

const example_blockquote_with_config_expected_result = `
This is an example.

{% note default no-icon Test %}
This is Line 1 of this blockquote.
This is Line 2 of this blockquote.
{% endnote %}
`;


describe('Blockquote2note Tests', () => {
  it('should be interpreted correctly', () => {
    const result = blockquote2note(example_blockquote_with_config);
    assert.equal(result, example_blockquote_with_config_expected_result);
  });
});
