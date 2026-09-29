import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-unnecessary-interpolations.js';

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
