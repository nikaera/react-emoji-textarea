module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
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
