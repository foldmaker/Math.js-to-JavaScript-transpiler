import Foldmaker, { tokenize, flatten } from 'foldmaker'

let KEYWORDS = /^(while|for|if|else)$/

export let transpile = (string, settings = {debug: true}) => {
  let tokens = tokenize(
    string,
    [
      ['c', /(\/\/).*?(?=\n|$)/], // Comment
      ['m', /\/\*[\s\S]*?\*\//], // Multiline comment
      ['e', /(['"])(\\\1|[\s\S])*?\1/], // String
      ['e', /(\[.*?\])/], // Array
      ['s', /[\{\}\(\),;]/], // { } ( ) , ; remains unchanged
      [' ', /[ \t]+/], // Space
      ['\n', /[\n\r]+/], // Newline
      ['i', /[\w$]+/], // Identifier or keyword
      ['e', /[\s\S]/] // Unknown
    ],
    ({ type, value }) => {
      if (type === 'i') type = KEYWORDS.test(value) ? 'k' : 'e'
      else if (type === 's') type = value
      else if (type === 'c' && settings.debug) value = '/*' + value.substring(2) + ' */'
      return { type, value }
    }
  )

  let result = Foldmaker
    .from(tokens)
    // Join expression tokens together
    .parse( 
      [
        ['EXPRESSION', /e[e, ]+|e\(e?\)/],
        ['DEFAULT', /[\s\n\S]/]
      ],
      {
        EXPRESSION: result => ['e', result]
      }
    )
    // Flatten expressions, ignore spaces
    .parse(
      [
        ['EXPRESSION', /(e)/],
        ['SPACE', /[ \t]/],
        ['DEFAULT', /[\s\S]/]
      ],
      {
        EXPRESSION: result => {
          let val = flatten(result[0]).join('')
          return '_("' + val.trim() + '")'
        },
        // Ignore spaces from now on
        SPACE: result => null
      }
    )
    .parse(
      [
        ['BLOCK', /(\{)([o\n;]*)?(\})/],
        ['FOR_WHILE_BLOCK', /(k)(\([o ;]*\))\{([o\n;]*)?\}/],
        ['FOR_WHILE_WITHOUT_CURLY', /(k)(\([o ;]*\))([o\n;]+)/],
        ['DEFAULT', /[\s\S]/]
      ],
      { 
        BLOCK: result => {
          let body = flatten(result[2]).join('')
          return '{_start();' + body + ';_end()}'
        },
        FOR_WHILE_BLOCK: result => {
          let whole = flatten(result[0]).join('')
          if(['for', 'while', 'if'].includes(result[1][0])) return '{_start();' + whole + ';_end()}'
          else return whole
        },
        FOR_WHILE_WITHOUT_CURLY: result => {
          let whole = flatten(result[0]).join('')
          if(['for', 'while', 'if'].includes(result[1][0])) return '{_start();' + whole + ';_end()}'
          else return whole        }
      }
    )

  let temp = result.array.reduce((acc, el) => (acc + el), '')
  if(settings.debug) temp = temp.split('\n').map((line, i) => (line + ';_line(' + (i + 2) + ')\n')).join('')
  return temp
}
