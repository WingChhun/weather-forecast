module.exports = {
  // TODO: hook in Cypress
  // TODO: separate cypress and jest tests
  hooks: {
    'commit-msg': 'commitlint -e $GIT_PARAMS',
    'pre-commit': 'lint-staged',
    // 'pre-push': 'yarn lint && yarn test',
  },
};
