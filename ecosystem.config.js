module.exports = {
  apps : [{
    name: 'my-app',
    script: './dist/server.js', // Entry point of your application
    env: {
      NODE_ENV: 'development' // Environment variables for development
    },
    env_production: {
      NODE_ENV: 'production' // Environment variables for production
    }
  }]
};
