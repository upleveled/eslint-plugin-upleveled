import noSubmitHandlerWithoutPreventDefault from './rules/no-submit-handler-without-preventDefault.js';
import noUnnecessaryForAndId from './rules/no-unnecessary-for-and-id.js';
import noUnnecessaryHtmlAttributes from './rules/no-unnecessary-html-attributes.js';
import noUnnecessaryInterpolations from './rules/no-unnecessary-interpolations.js';

const plugin = {
  rules: {
    'no-submit-handler-without-preventDefault':
      noSubmitHandlerWithoutPreventDefault,
    'no-unnecessary-for-and-id': noUnnecessaryForAndId,
    'no-unnecessary-html-attributes': noUnnecessaryHtmlAttributes,
    'no-unnecessary-interpolations': noUnnecessaryInterpolations,
  },
};

export type Plugin = typeof plugin;

export default plugin;
