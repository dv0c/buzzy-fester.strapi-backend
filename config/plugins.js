module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '3d',
      },
      ratelimit: {
        interval: 60000,
        max: 100000000
      },
    },
  },
});