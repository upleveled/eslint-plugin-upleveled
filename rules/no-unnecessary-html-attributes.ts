import { TSESLint } from '@typescript-eslint/experimental-utils';
import { TSESTree } from '@typescript-eslint/typescript-estree';

const rule: TSESLint.RuleModule<'noInputTypeText' | 'noButtonTypeSubmit'> =
  {
    meta: {
      docs: {
        description: 'Prevent unnecessary attributes on HTML elements in JSX',
        recommended: 'warn',
        url: 'https://github.com/upleveled/eslint-plugin-upleveled/blob/main/docs/rules/no-unnecessary-html-attributes.md',
      },
      messages: {
        noInputTypeText:
          'The attribute type="text" is the default for <input> elements and can be omitted',
        noButtonTypeSubmit:
          'The attribute type="submit" is the default for <button> elements and can be omitted',
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
        JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
          if (
            node.name.type === 'JSXIdentifier' &&
            node.name.name === 'input'
          ) {
            const typeAttribute = node.attributes.find(
              (attribute) =>
                attribute.type === 'JSXAttribute' &&
                attribute.name.type === 'JSXIdentifier' &&
                attribute.name.name === 'type' &&
                attribute.value?.type === 'Literal' &&
                attribute.value.value === 'text',
            );

            if (typeAttribute) {
              context.report({
                node: typeAttribute,
                messageId: 'noInputTypeText',
              });
            }
          }

          if (
            node.name.type === 'JSXIdentifier' &&
            node.name.name === 'button'
          ) {
            const typeAttribute = node.attributes.find(
              (attribute) =>
                attribute.type === 'JSXAttribute' &&
                attribute.name.type === 'JSXIdentifier' &&
                attribute.name.name === 'type' &&
                attribute.value?.type === 'Literal' &&
                attribute.value.value === 'submit',
            );

            if (typeAttribute) {
              context.report({
                node: typeAttribute,
                messageId: 'noButtonTypeSubmit',
              });
            }
          }
        },
      };
    },
  };

export default rule;
