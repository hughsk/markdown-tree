var test = require('tape')
var tree = require('./')

test('Simple', function(t) {
  var out = tree([
      '# Heading 1'
    , 'Text here.'
    , '## Heading 2A'
    , 'More text.'
    , ''
    , 'Second paragraph'
    , '## Heading 2B'
  ].join('\n'))

  t.equal(out.type, 'Document', 'top-most node is "Document"')
  t.equal(out.children.length, 1, 'root has 1 child')

  t.equal(out.children[0].type,  'Heading',   'h1 has proper type')
  t.equal(out.children[0].text,  'Heading 1', 'h1 has proper text')
  t.equal(out.children[0].depth, 1,           'h1 has proper depth')

  t.equal(out.children[0].tokens.length, 1, 'h1 expected amount of tokens.')
  t.deepEqual(out.children[0].tokens[0], {
      type: 'paragraph'
    , text: 'Text here.'
  }, 'token has correct values')

  var subs = out.children[0].children
  t.equal(subs.length, 2, '2 subheadings')

  t.equal(subs[0].text, 'Heading 2A', 'h2a has correct title')
  t.equal(subs[0].type, 'Heading', 'h2a has correct type')
  t.equal(subs[0].depth, 2, 'h2a has correct depth')
  t.equal(subs[0].tokens.length, 2, 'h2b has two tokens')

  t.deepEqual(subs[0].tokens[0], {
      type: 'paragraph'
    , text: 'More text.'
  }, 'first paragraph')
  t.deepEqual(subs[0].tokens[1], {
      type: 'paragraph'
    , text: 'Second paragraph'
  }, 'second paragraph')

  t.equal(subs[1].text, 'Heading 2B', 'h2b has correct title')
  t.equal(subs[1].type, 'Heading', 'h2b has correct type')
  t.equal(subs[1].depth, 2, 'h2b has correct depth')
  t.equal(subs[1].tokens.length, 0, 'h2b has no tokens')

  t.end()
})

test('Skipping Down', function(t) {
  var out = tree([
      '## Heading 1'
    , '#### Heading 2'
    , '# Heading 3'
  ].join('\n'))

  t.equal(out.type, 'Document', 'top-most type is "Document"')
  t.equal(out.children.length, 2, 'two root headings')

  t.equal(out.children[0].text, 'Heading 1', 'first heading is first')
  t.equal(out.children[1].text, 'Heading 3', 'h1 comes after')
  t.ok(
    out.children[0].depth === 2 && out.children[1].depth === 1
  , 'both are the right depth')

  t.equal(out.children[0].children[0].text, 'Heading 2', 'h2 is stil a child of h1')
  t.equal(out.children[0].children[0].depth, 4, 'with the right depth too')

  t.end()
})
