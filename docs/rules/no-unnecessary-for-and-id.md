# Prevent unnecessary `for` and `id` attributes on input elements nested in labels (upleveled/no-unnecessary-for-and-id)

When an `<input>` element is nested inside a `<label>` in HTML, the `for` attribute on the `<label>` and the `id` attribute on the `<input>` are not required.

Example of **incorrect** code:

```js
function FormField() {
  return (
    <label htmlFor="firstName">
      First name
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
      First name
      <input />
    </label>
  );
}
```
