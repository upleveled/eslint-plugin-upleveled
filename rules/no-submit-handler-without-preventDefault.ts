import type { TSESTree } from '@typescript-eslint/utils';
import { ASTUtils, TSESLint } from '@typescript-eslint/utils';
import type { Scope } from '@typescript-eslint/utils/ts-eslint';

function getFunctionDeclarationOrExpressionByExpression(
  scope: Scope.Scope,
  expression: TSESTree.Expression | TSESTree.JSXEmptyExpression,
) {
  if (expression.type !== 'Identifier') return expression;
  const node = ASTUtils.findVariable(scope, expression)?.defs[0]?.node;
  return node?.type === 'VariableDeclarator' ? node.init : node;
}

const rule: TSESLint.RuleModule<'noSubmitHandlerWithoutPreventDefault'> = {
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Prevent default form submission behavior by enforcing usage of `event.preventDefault()`',
      url: 'https://github.com/upleveled/eslint-plugin-upleveled/blob/main/docs/rules/no-submit-handler-without-preventDefault.md',
    },
    messages: {
      noSubmitHandlerWithoutPreventDefault:
        'This form submit handler does not call event.preventDefault()',
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
      JSXAttribute(node) {
        if (
          node.parent.name.type === 'JSXIdentifier' &&
          node.parent.name.name === 'form' &&
          node.name.name === 'onSubmit' &&
          node.value?.type === 'JSXExpressionContainer'
        ) {
          const submitHandlerFunction =
            getFunctionDeclarationOrExpressionByExpression(
              context.getScope(),
              node.value.expression,
            );

          // Early return for non-function nodes
          if (
            !submitHandlerFunction ||
            !(
              submitHandlerFunction.type === 'FunctionDeclaration' ||
              submitHandlerFunction.type === 'FunctionExpression' ||
              submitHandlerFunction.type === 'ArrowFunctionExpression'
            ) ||
            submitHandlerFunction.body.type !== 'BlockStatement'
          ) {
            return;
          }

          const firstFunctionParameter = submitHandlerFunction.params[0];
          if (
            // No function parameters
            submitHandlerFunction.params.length < 1 ||
            // First function parameter is not an identifier
            firstFunctionParameter?.type !== 'Identifier' ||
            // Function body does not contain a call to event.preventDefault()
            !submitHandlerFunction.body.body.some((bodyNode) => {
              return (
                bodyNode.type === 'ExpressionStatement' &&
                bodyNode.expression.type === 'CallExpression' &&
                bodyNode.expression.callee.type === 'MemberExpression' &&
                bodyNode.expression.callee.object.type === 'Identifier' &&
                bodyNode.expression.callee.object.name ===
                  firstFunctionParameter.name &&
                bodyNode.expression.callee.property.type === 'Identifier' &&
                bodyNode.expression.callee.property.name === 'preventDefault'
              );
            })
          ) {
            context.report({
              node: submitHandlerFunction,
              messageId: 'noSubmitHandlerWithoutPreventDefault',
            });
          }
        }
      },
    };
  },
};

export default rule;
