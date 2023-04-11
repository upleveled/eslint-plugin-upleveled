# Prevent default form submission behavior by enforcing usage of `event.preventDefault()` (upleveled/no-submit-handler-without-preventDefault)

The default behavior of the HTML `<form>` element is to submit data to a server with less control than JavaScript allows us. To prevent this, the `event.preventDefault()` method can be used.

Example of **incorrect** code:

```js
function Form() {
  return (
    <form
      onSubmit={() => {
        console.log('In onSubmit handler');
      }}
    >
      <label>
        First name
        <input />
      </label>
    </form>
  );
}
```

Examples of **correct** code:

```js
function Form() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log('In onSubmit handler');
      }}
    >
      <label>
        First name
        <input />
      </label>
    </form>
  );
}
```
