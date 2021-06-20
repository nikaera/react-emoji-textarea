"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const styled_components_1 = __importDefault(require("styled-components"));
const EmojiInfoDiv = styled_components_1.default.div `
  padding: 0.3em;
  font-size: 1.1em;
  font-size: 1.5em;
  margin: 0px;
  height: 2em;
`;
const EmojiColonsP = styled_components_1.default.p `
  font-size: 0.5em;
  font-style: italic;
  color: gray;
  position: relative;
  top: -10px;
`;
const EmojiHighlightSpan = styled_components_1.default.span `
  color: blue;
  background-color: yellow;
`;
const EmojiSpanSelected = (selected) => {
    if (selected) {
        return `
      border-radius: 50%;
      background-color: #f4f4f4;
    `;
    }
    return null;
};
const EmojiSpan = styled_components_1.default.span `
  margin-left: 0.1em;
  margin-right: 0.1em;
  padding: 0.3em;
  font-size: 1.1em;

  ${({ selected }) => EmojiSpanSelected(selected)}
`;
const EmojiSuggestLineP = styled_components_1.default.p `
  margin-top: 0px;
  margin-bottom: 0px;
`;
const SuggestArea = (props) => {
    const { columnMax, emojiIndex, highlight, suggestions, onOverEmojiIndex, onSelect, } = props;
    // ref: https://www.nxworld.net/js-array-chunk.html
    const arrayChunk = ([...array], size = 1) => {
        return array.reduce((acc, _, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
    };
    const selectedEmojiInfo = (highlight) => {
        const emoji = suggestions[emojiIndex];
        if (emoji) {
            const { short_names } = suggestions[emojiIndex];
            return (jsx_runtime_1.jsxs(EmojiInfoDiv, { children: [jsx_runtime_1.jsx("span", { children: emoji.native }, void 0), jsx_runtime_1.jsx("br", {}, void 0), jsx_runtime_1.jsx(EmojiColonsP, { children: short_names.map((s) => {
                            const start = s.indexOf(highlight);
                            const before = s.slice(0, start);
                            const highlightEmoji = s.slice(start, start + highlight.length);
                            const after = s.slice(start + highlight.length);
                            return (jsx_runtime_1.jsxs("span", { children: [":", before, jsx_runtime_1.jsx(EmojiHighlightSpan, { children: highlightEmoji }, void 0), after, ":"] }, s));
                        }) }, void 0)] }, void 0));
        }
        return null;
    };
    let suggestsElement = null;
    const onClick = () => {
        if (suggestions.length > 0) {
            onSelect(suggestions[emojiIndex]);
        }
    };
    if (suggestions.length > 0) {
        const suggestionsChunk = arrayChunk(suggestions, columnMax);
        suggestsElement = (jsx_runtime_1.jsxs("div", { children: [highlight ? selectedEmojiInfo(highlight) : null, suggestionsChunk.map((_suggestions, row) => {
                    const elements = _suggestions.map((emoji, column) => {
                        const selected = emoji.native;
                        const index = row * columnMax + column;
                        const emojiClass = classnames_1.default("emoji", {
                            selected: index === emojiIndex,
                        });
                        return (jsx_runtime_1.jsx(EmojiSpan, Object.assign({ selected: index === emojiIndex, className: emojiClass, onMouseOver: () => onOverEmojiIndex(index), onClick: onClick }, { children: selected }), emoji.id));
                    });
                    const emojiSetKey = _suggestions
                        .map((emoji) => emoji.native)
                        .join();
                    return (jsx_runtime_1.jsx(EmojiSuggestLineP, { children: elements }, emojiSetKey));
                })] }, void 0));
    }
    return suggestsElement;
};
exports.default = SuggestArea;
