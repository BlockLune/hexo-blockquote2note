import {blockquote2note} from './blockquote2note';

// @ts-ignore
hexo.extend.filter.register('before_post_render', data => {
  data.content = blockquote2note(data.content);
  return data;
});
