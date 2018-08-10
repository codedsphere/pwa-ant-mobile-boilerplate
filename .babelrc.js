const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-export-default-from"
];
const presets = [ '@babel/preset-env','@babel/preset-react',];
const options = {};


module.exports = {...options, plugins, presets};
