module.exports = function (api) { // eslint-disable-line no-undef
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
  };
};
