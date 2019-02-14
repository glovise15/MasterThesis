# limit-alphanumeric [![Build Status](https://travis-ci.org/bendrucker/limit-alphanumeric.svg?branch=master)](https://travis-ci.org/bendrucker/limit-alphanumeric)

> Limit a string to alphanumeric characters


## Install

```
$ npm install --save limit-alphanumeric
```


## Usage

```js
var limitAlphanumeric = require('limit-alphanumeric')

limitAlphanumeric('foo./;:()123')
//=> foo123
```

## API

#### `limitAlphanumeric(str)` -> `string`

##### str

*Required*  
Type: `string`

An input string from which to strip non-alphanumeric characters.


## License

MIT © [Ben Drucker](http://bendrucker.me)
