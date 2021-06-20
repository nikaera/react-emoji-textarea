module.exports = {
branches: ["main"],
plugins: [
    [
    "@semantic-release/commit-analyzer",
    {
        config: "conventional-changelog-gitmoji-config",
        releaseRules: [{ type: "build", release: "patch" }],
    },
    ],
    [
    "@semantic-release/release-notes-generator",
    {
        config: "conventional-changelog-gitmoji-config",
    },
    ],
    [
    "@semantic-release/github",
    {
        assets: [
        {
            path: "react-emoji-textarea.zip",
            label: "Teemo - Chrome Extension",
        },
        ],
    },
    ],
    [
    "@semantic-release/git",
    {
        message:
        // eslint-disable-next-line no-template-curly-in-string
        ":bookmark: chore(release): ${nextRelease.gitTag} [skip ci] \n\n${nextRelease.notes}",
    },
    ],
],
};
