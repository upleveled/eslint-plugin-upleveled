import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-submit-handler-without-preventDefault.js';

new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
}).run('no-submit-handler-without-preventDefault', rule, {
  valid: [
    `function Form() {
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
}`,
  ],
  invalid: [
    {
      code: `function Form() {
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
}`,
      errors: [{ messageId: 'noSubmitHandlerWithoutPreventDefault' }],
    },
  ],
});
