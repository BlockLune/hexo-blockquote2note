# hexo-blockquote2note

A Hexo plugin that renders blockquotes to [the note tag of the NexT theme](https://theme-next.js.org/docs/tag-plugins/note).

## Syntax

Surround your blockquotes with `<!--blockquote2note-->` and `<!--end-blockquote2note-->`. For example:

```md
<!--blockquote2note-->
> This is an example blockquote.
<!--end-blockquote2note-->
```

will be rendered as:

```md
{% note %}
This is an example blockquote.
{% endnote %}
```

Configuration is supported. For example:

```md
<!--blockquote2note:default,no-icon,Test-->
> This is an example blockquote.
<!--end-blockquote2note-->
```

will be rendered as:

```md
{% note default no-icon Test %}
This is Line 1 of this blockquote.
{% endnote %}
```

> [!IMPORTANT]
> Keep those commas, even if an option is empty.
> For example: `<!--blockquote2note:,,Test-->`.

> [!CAUTION]
> Nested blockquotes are NOT supported.

## Development

### Setup

```bash
git clone --depth=1 git@github.com:BlockLune/hexo-blockquote2note.git
npm install
```

### Test

```bash
npm test
```

> [!CAUTION]
> Node v21 may not show correct line numbers in stack traces when testing. See [this](https://github.com/BlockLune/hexo-blockquote2note/issues/1) issue.
