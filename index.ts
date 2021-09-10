import noUnnecessaryHtmlAttributes from './rules/no-unnecessary-html-attributes.js';

const plugin = {
  rules: {
    'no-unnecessary-html-attributes': noUnnecessaryHtmlAttributes,
  },
};

export type Plugin = typeof plugin;

// `module.exports` here is important, using ESM `export default`
// here instead does not work
module.exports = plugin;
