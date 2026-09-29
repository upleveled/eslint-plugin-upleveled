import { after, describe, it } from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-unnecessary-html-attributes.js';

RuleTester.afterAll = after;
// node:test describe() and it() return Promises, which node:test awaits
/* eslint-disable @typescript-eslint/no-misused-promises */
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
/* eslint-enable @typescript-eslint/no-misused-promises */

new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
}).run('no-unnecessary-html-attributes', rule, {
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
