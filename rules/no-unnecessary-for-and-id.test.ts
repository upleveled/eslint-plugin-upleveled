import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-unnecessary-for-and-id.js';

new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
}).run('no-unnecessary-for-and-id', rule, {
  valid: [
    `function FormField() {
  return (
    <label>
      First name
      <input />
    </label>
  );
}`,
  ],
  invalid: [
    {
      code: `function FormField() {
  return (
    <label htmlFor="firstName">
      First name
      <input id="firstName" />
    </label>
  );
}`,
      errors: [{ messageId: 'noLabelFor' }, { messageId: 'noInputId' }],
    },
  ],
});
