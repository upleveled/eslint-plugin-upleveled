import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-unnecessary-html-attributes.js';

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
