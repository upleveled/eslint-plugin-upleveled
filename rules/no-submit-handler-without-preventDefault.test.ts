import { describe, it } from 'node:test';
import { type Rule, RuleTester } from 'eslint';
import rule from './no-submit-handler-without-preventDefault.js';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

// typescript-eslint RuleContext type still includes context methods removed in ESLint 10
new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
}).run(
  'no-submit-handler-without-preventDefault',
  rule as unknown as Rule.RuleModule,
  {
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
  },
);
