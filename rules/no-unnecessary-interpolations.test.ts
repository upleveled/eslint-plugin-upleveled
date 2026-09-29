import { describe, it } from 'node:test';
import { type Rule, RuleTester } from 'eslint';
import rule from './no-unnecessary-interpolations.js';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

// typescript-eslint RuleContext type still includes context methods removed in ESLint 10
new RuleTester().run(
  'no-unnecessary-interpolations',
  rule as unknown as Rule.RuleModule,
  {
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
  },
);
