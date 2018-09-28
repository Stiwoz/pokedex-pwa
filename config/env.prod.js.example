module.exports = function(root) {
  let config = {
    devtool: 'source-map',
    debug: false,
    env: {
      ENV: 'production',
      API_URL: 'https://pokeapi.co/api/v2/',
      BASE_HREF: '',
    },
    'process.env.NODE_ENV': JSON.stringify('production') // redux production config
  };

  for (let property in config.env) {
    if (config.env.hasOwnProperty(property)) {
      let value = config.env[property];
      config.env[property] = JSON.stringify(value);
    }
  }
  return config;
};