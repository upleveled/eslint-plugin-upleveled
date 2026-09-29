import { after, describe, it } from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-submit-handler-without-preventDefault.js';

RuleTester.afterAll = after;
// node:test describe() and it() return Promises, which node:test awaits
/* eslint-disable @typescript-eslint/no-misused-promises */
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
/* eslint-enable @typescript-eslint/no-misused-promises */

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
