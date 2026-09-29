import { describe, it } from 'node:test';
import { type Rule, RuleTester } from 'eslint';
import rule from './no-unnecessary-for-and-id.js';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

// typescript-eslint RuleContext type still includes context methods removed in ESLint 10
new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
}).run('no-unnecessary-for-and-id', rule as unknown as Rule.RuleModule, {
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
