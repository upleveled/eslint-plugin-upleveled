# Prevent unnecessary attributes on HTML elements in JSX (@upleveled/upleveled/no-unnecessary-html-attributes)

Attributes using default values can be omitted, reducing the amount of code that needs to be written and transferred to the user. For example, the default value of the `<input>` element `type` attribute is [the string `"text"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#frame_exampletel:~:text=The%20default%20value,-.).

Example of **incorrect** code:

```jsx
<input type="text" />

<button type="submit">Submit</button>
```

Examples of **correct** code:

```jsx
<input />
<input type="number" />

<button>Submit</button>
<button type="button">Submit</button>
```
