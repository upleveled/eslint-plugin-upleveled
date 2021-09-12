import noUnnecessaryForAndId from './rules/no-unnecessary-for-and-id.js';
import noUnnecessaryHtmlAttributes from './rules/no-unnecessary-html-attributes.js';
import noUnnecessaryInterpolations from './rules/no-unnecessary-interpolations.js';

const plugin = {
  rules: {
    'no-unnecessary-for-and-id': noUnnecessaryForAndId,
    'no-unnecessary-html-attributes': noUnnecessaryHtmlAttributes,
    'no-unnecessary-interpolations': noUnnecessaryInterpolations,
  },
};

export type Plugin = typeof plugin;

// `module.exports` here is important, using ESM `export default`
// here instead does not work
module.exports = plugin;
