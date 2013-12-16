# markdown-tree [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/markdown-tree&title=markdown-tree&description=hughsk/markdown-tree%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Convert a markdown document into a JSON tree structure, using
[marked](http://github.com/chjj/marked) under the hood.

Should be helpful for cases where you might want to analyse the structure of
the document, e.g. auto-generating sites from GitHub wikis.

## Usage ##

[![markdown-tree](https://nodei.co/npm/markdown-tree.png?mini=true)](https://nodei.co/npm/markdown-tree)

### `require('markdown-tree')(src[, options])` ###

`src` should be the Markdown document you want to parse, as a string.

`options` is passed on to
[`marked.lexer`](https://github.com/chjj/marked/blob/abce5d0d6dbad0f7a19f009510a71708f539c4d6/README.md#access-to-lexer-and-parser).

Each Node in the resulting tree represents either the document root or a
heading, and should be formatted similarly to this:

``` javascript
{
    type: "Heading" // or, "Document"
  , text: "The Heading Contents"
  , children: []
  , depth: 2 // e.g. "### hello" would be 3
  , tokens: [
    {
        type: 'paragraph'
      , text: 'The tokens from each paragraph...'
    },
    {
        type: 'paragraph'
      , text: '...before the next heading go here!'
    },
    {
        type: 'paragraph'
      , text: 'This data comes directly from marked.'
    }
  ]
}
```

There's also a `parent` property, but that's hidden to make logging the tree a
little cleaner.

Note also that the `tokens` array is actually retrieved from the marked module
untouched, so you can run it through `marked.parse` with little trouble to
compile that section to standalone HTML.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/markdown-tree/blob/master/LICENSE.md) for details.
