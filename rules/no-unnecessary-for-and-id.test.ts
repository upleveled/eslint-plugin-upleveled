import { after, describe, it } from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-unnecessary-for-and-id.js';

RuleTester.afterAll = after;
// node:test describe() and it() return Promises, which node:test awaits
/* eslint-disable @typescript-eslint/no-misused-promises */
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
/* eslint-enable @typescript-eslint/no-misused-promises */

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
