import { describe, it } from 'node:test';
import { type Rule, RuleTester } from 'eslint';
import rule from './no-unnecessary-html-attributes.js';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

// typescript-eslint RuleContext type still includes context methods removed in ESLint 10
new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
}).run('no-unnecessary-html-attributes', rule as unknown as Rule.RuleModule, {
  valid: [
    '<input />',
    '<input type="number" />',
    '<button>Submit</button>',
    '<button type="button">Submit</button>',
  ],
  invalid: [
    {
      code: '<input type="text" />',
      errors: [{ messageId: 'noInputTypeText' }],
    },
    {
      code: '<button type="submit">Submit</button>',
      errors: [{ messageId: 'noButtonTypeSubmit' }],
    },
  ],
});
