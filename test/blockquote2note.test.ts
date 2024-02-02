import { assert } from 'chai';
import { blockquote2Note } from '../lib/blockquote2note';

const exampleArticle
  = `This is an example.

> This is a blockquote not flagged.

<!--blockquote2note-->
> This is a blockquote flagged.
<!--end-blockquote2note-->
`;

const expectedResult
  = `This is an example.

> This is a blockquote not flagged.

{% note %}
This is a blockquote flagged.
{% endnote %}
`;

describe('Article Tests', () => {
  it('should work', () => {
    const result = blockquote2Note(exampleArticle);
    assert.strictEqual(result, expectedResult);
  });
});
