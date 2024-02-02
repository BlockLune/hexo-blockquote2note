import { blockquote2Note } from './blockquote2note';

// @ts-ignore
hexo.extend.filter.register('before_post_render', data => {
  data.content = blockquote2Note(data.content);
  return data;
});
