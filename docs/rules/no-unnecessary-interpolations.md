# Prevent unnecessary interpolations in template strings (@upleveled/upleveled/no-unnecessary-interpolations)

Template strings are not necessary when using a single interpolation without any further string literal content. If a conversion from a different data type is wished, a better, more explicit option is to use the `String` constructor.

Example of **incorrect** code:

```js
const withIdentifier = `${color}`;
const withLiteral = `${'red'}`;
const withCallExpression = `${getColor()}`;

const withNumber = `${1}`; // Conversion from another data type
```

Examples of **correct** code:

```js
const withIdentifier = color;
const withLiteral = 'red';
const withCallExpression = getColor();

const withNumber = String(1); // Conversion from another data type
```
