"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const emoji_mart_1 = require("emoji-mart");
const EmojiPicker = (props) => {
    const { hidden, attributers } = props;
    return (jsx_runtime_1.jsx("div", Object.assign({ style: { display: hidden ? "none" : "" }, id: "custom_picker" }, { children: jsx_runtime_1.jsx(emoji_mart_1.Picker, Object.assign({}, attributers), void 0) }), void 0));
};
exports.default = EmojiPicker;
