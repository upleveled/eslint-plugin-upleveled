import { TSESTree } from '@typescript-eslint/typescript-estree';
import { TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'noUnnecessaryInterpolations'> = {
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Prevent unnecessary interpolations in template strings',
      url: 'https://github.com/upleveled/eslint-plugin-upleveled/blob/main/docs/rules/no-unnecessary-interpolations.md',
    },
    messages: {
      noUnnecessaryInterpolations:
        'A template string is not necessary for a single interpolation',
    },
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      TemplateLiteral(node: TSESTree.TemplateLiteral) {
        if (
          // Only match single interpolations inside of
          // a template string such as `${color}`
          node.quasis.length === 2 &&
          node.expressions.length === 1 &&
          // Make sure all quasis (TemplateElements) are empty
          node.quasis.every((quasi) => {
            return quasi.value.raw === '';
          })
        ) {
          context.report({
            node,
            messageId: 'noUnnecessaryInterpolations',
          });
        }
      },
    };
  },
};

export default rule;
