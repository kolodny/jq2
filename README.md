# jq2
extract json data

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

### install

```bash
npm install -g jq2
```

### usage

```
jq2 <lookupstring> [filename]
```

if no filename is provided it will use stdin. `$` in the `<lookupstring>` is a reference to the javascript object.

### examples

```bash
echo '{"a": {"b": [ 123 ]}}' | jq2 '$.a.b[0]' # 123
echo '{"a": {"b": [ 123 ]}}' | jq2 'Math.pow($.a.b[0], 2)' # 15129
echo '["  foo bar  ", "   baz  "]' | jq2 '$.map(s => s.trim()).join("")' # foo barbaz

# lodash is included so this will work too
echo '["  foo bar  ", "   baz  "]' | jq2 '$.map(_.trim).join("")' # foo barbaz

echo '{"a": 123}' > file.json
jq2 '$.a' file.json # 123
```


[npm-image]: https://img.shields.io/npm/v/jq2.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jq2
[travis-image]: https://img.shields.io/travis/kolodny/jq2.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/jq2
[downloads-image]: http://img.shields.io/npm/dm/jq2.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/jq2
