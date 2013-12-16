var marked = require('marked')

module.exports = createTree

function createTree(src, options) {
  var tokens = marked.lexer(
    src, options = options || {}
  )

  var root = {
      type: 'Document'
    , children: []
    , parent: null
  }

  var curr = {
      depth: 0
    , heading: root
    , tokens: []
  }

  for (var i = 0, l = tokens.length; i < l; i += 1) {
    var token = tokens[i]

    switch (token.type) {
      case 'heading':
        var depth = token.depth
        var text = token.text

        if (depth > curr.depth) {
          curr.heading = curr.heading || root
          curr.depth = depth

          curr.heading.children.push(curr.heading = hideParent({
              type: 'Heading'
            , text: text
            , children: []
            , parent: curr.heading
            , depth: depth
            , tokens: []
          }))
        } else {
          while (curr.depth !== depth) {
            curr.depth -= 1
            curr.heading = curr.heading.parent || root
          }

          (curr.heading.parent || root
          ).children.push(curr.heading = hideParent({
              type: 'Heading'
            , text: text
            , children: []
            , parent: curr.heading.parent
            , depth: depth
            , tokens: []
          }))
        }
      break
      default:
        curr.heading.tokens.push(token)
      break
    }
  }

  return root
}

// Makes logging much more legible :)
function hideParent(obj) {
  Object.defineProperty(obj, 'parent', {
      value: obj.parent
    , enumerable: false
  })

  return obj
}
