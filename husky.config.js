module.exports = {
  // TODO: update hooks as necesarty
  hooks: {
    'commit-msg': 'commitlint -e $GIT_PARAMS',
    'pre-commit': 'lint-staged',
    // TODO: Run cypress and jest tests on psuh
    // 'pre-push': 'yarn lint && yarn test',
  },
};
