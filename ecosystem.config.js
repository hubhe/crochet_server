module.exports = {
  apps : [{
    name: 'my-app',
    script: './src/server.ts', // Entry point of your application
    watch: true, // Enable auto-restart on file changes
    interpreter: '/usr/bin/ts-node', // Absolute path to ts-node
    env: {
      NODE_ENV: 'development' // Environment variables for development
    },
    env_production: {
      NODE_ENV: 'production' // Environment variables for production
    }
  }]
};
