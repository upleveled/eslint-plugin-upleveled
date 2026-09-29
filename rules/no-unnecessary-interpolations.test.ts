import { after, describe, it } from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-unnecessary-interpolations.js';

RuleTester.afterAll = after;
// node:test describe() and it() return Promises, which node:test awaits
/* eslint-disable @typescript-eslint/no-misused-promises */
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
/* eslint-enable @typescript-eslint/no-misused-promises */

new RuleTester().run('no-unnecessary-interpolations', rule, {
  valid: [
    `const withIdentifier = color;
const withLiteral = 'red';
const withCallExpression = getColor();

const withNumber = String(1); // Conversion from another data type`,
  ],
  invalid: [
    {
      code: `const withIdentifier = \`\${color}\`;
const withLiteral = \`\${'red'}\`;
const withCallExpression = \`\${getColor()}\`;

const withNumber = \`\${1}\`; // Conversion from another data type`,
      errors: [
        { messageId: 'noUnnecessaryInterpolations' },
        { messageId: 'noUnnecessaryInterpolations' },
        { messageId: 'noUnnecessaryInterpolations' },
        { messageId: 'noUnnecessaryInterpolations' },
      ],
    },
  ],
});
