module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        config: 'conventional-changelog-gitmoji-config',
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'chore', scope: 'release', release: 'patch' },
          { scope: 'no-release', release: false },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        config: 'conventional-changelog-gitmoji-config',
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'react-emoji-textarea.zip',
            label: 'react-emoji-textarea',
          },
        ],
      },
    ],
  ],
};
