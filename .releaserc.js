module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [{ type: 'build', release: 'patch' }],
      },
    ],
    [
      '@semantic-release/release-notes-generator'
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        pkgRoot: 'dist',
      },
    ],
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
