# Prevent unnecessary `for` and `id` attributes on input elements nested in labels (@upleveled/upleveled/no-unnecessary-interpolations)

When an `<input>` element is nested inside a `<label>` in HTML, the `for` attribute on the `<label>` and the `id` attribute on the `<input>` are not required.

Example of **incorrect** code:

```js
function FormField() {
  return (
    <label htmlFor="firstName">
      <input id="firstName" />
    </label>
  );
}
```

Examples of **correct** code:

```js
function FormField() {
  return (
    <label>
      <input />
    </label>
  );
}
```
