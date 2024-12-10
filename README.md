# hexo-blockquote2note

A Hexo plugin that renders blockquotes to [the note tag of the NexT theme](https://theme-next.js.org/docs/tag-plugins/note).

You may first edit your `_config.next.yml` to enable all features of the note tag. For example, this is mine:

```yaml
note:
  style: flat
  icons: true
```

## Syntax

Surround the blockquotes that you want to transform to notes with `<!--blockquote2note-->` (HEAD) and `<!--end-blockquote2note-->` (TAIL), and they will be rendered as the note tags.

For example:

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

Configuration is supported.

For example:

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

After v1.1.0, purely blank lines between HEAD and TAIL are allowed. So it's also OK to use like:

```md
<!--blockquote2note-->

> This is an example.

<!--end-blockquote2note-->
```

> [!IMPORTANT] > **Keep those commas**, even if an option is empty.  
> For example: `<!--blockquote2note:,,Test-->`.

---

> [!CAUTION]
> Nested blockquotes are NOT supported.

## Installation

```bash
npm install hexo-blockquote2note --save
```

## Development

### Setup

```bash
git clone --depth=1 git@github.com:BlockLune/hexo-blockquote2note.git
pnpm install
```

### Test

```bash
pnpm test
```

> [!CAUTION]
> Node v21 may not show correct line numbers in stack traces when testing. See [this](https://github.com/BlockLune/hexo-blockquote2note/issues/1) issue.
