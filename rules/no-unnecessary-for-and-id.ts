import { TSESTree } from '@typescript-eslint/typescript-estree';
import { TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'noLabelFor' | 'noInputId'> = {
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Prevent unnecessary `for` and `id` attributes on input elements nested in labels in JSX',
      recommended: 'warn',
      url: 'https://github.com/upleveled/eslint-plugin-upleveled/blob/main/docs/rules/no-unnecessary-for-and-id.md',
    },
    messages: {
      noLabelFor:
        'When an input is nested within a label, the "for" attribute on the label can be omitted',
      noInputId:
        'When an input is nested within a label, the "id" attribute on the input can be omitted',
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      JSXElement(node: TSESTree.JSXElement) {
        if (
          node.openingElement.name.type === 'JSXIdentifier' &&
          node.openingElement.name.name === 'label'
        ) {
          let inputIdAttribute:
            | TSESTree.JSXSpreadAttribute
            | TSESTree.JSXAttribute
            | undefined;

          const inputElement = node.children.find((child) => {
            if (child.type !== 'JSXElement') return false;

            inputIdAttribute = child.openingElement.attributes.find(
              (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'id',
            );

            return (
              child.openingElement.name.type === 'JSXIdentifier' &&
              child.openingElement.name.name === 'input' &&
              inputIdAttribute
            );
          });

          if (!inputElement) return;

          const forAttribute = node.openingElement.attributes.find(
            (attribute) =>
              attribute.type === 'JSXAttribute' &&
              attribute.name.type === 'JSXIdentifier' &&
              attribute.name.name === 'htmlFor',
          );

          if (forAttribute) {
            context.report({
              node: forAttribute,
              messageId: 'noLabelFor',
            });
          }

          if (inputIdAttribute) {
            context.report({
              node: inputIdAttribute,
              messageId: 'noInputId',
            });
          }
        }
      },
    };
  },
};

export default rule;
