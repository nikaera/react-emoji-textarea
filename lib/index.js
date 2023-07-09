"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("emoji-mart/css/emoji-mart.css");
const emoji_mart_1 = require("emoji-mart");
const react_1 = require("react");
const EmojiPicker_1 = __importDefault(require("./EmojiPicker"));
const SuggestArea_1 = __importDefault(require("./SuggestArea"));
const EmojiTextArea = (props, ref) => {
    const columnMax = 9;
    const defaultTextArea = {
        rows: 3,
        cols: 40,
    };
    const textAreaRef = react_1.useRef(null);
    const textAreaElement = () => {
        const _ref = ref;
        if (_ref) {
            return _ref.current;
        }
        else if (textAreaRef) {
            return textAreaRef.current;
        }
        else {
            return null;
        }
    };
    const [state, setState] = react_1.useState({
        text: props.value,
        editingEmoji: "",
        selectedEmojiIndex: 0,
        suggestions: Array(),
        isShowPicker: false,
    });
    const { suggestions, selectedEmojiIndex, text, editingEmoji } = state;
    const setTextAreaCursor = (cursor) => {
        const element = textAreaElement();
        if (!element)
            return;
        setTimeout(() => {
            element.focus();
            element.selectionStart = cursor;
            element.selectionEnd = cursor;
        }, 0);
    };
    react_1.useEffect(() => {
        const element = textAreaElement();
        if (element && !props.showPicker) {
            element.focus();
        }
    }, [props.showPicker]);
    react_1.useEffect(() => {
        setState(Object.assign(Object.assign({}, state), { text: props.value }));
    }, [props.value]);
    const handleChange = react_1.useCallback((event) => {
        event.persist();
        let currentText = event.target.value;
        let emojiSentenceIndex = -1;
        let selectionStart = event.target.selectionStart - 1;
        if (currentText[selectionStart] === ":") {
            selectionStart -= 1;
        }
        for (let i = selectionStart; i >= 0; i--) {
            if (currentText[i] === ":") {
                emojiSentenceIndex = i;
                break;
            }
            else if (/\s+/.test(currentText[i])) {
                break;
            }
        }
        const matches = /^:[a-z0-9!@#$%^&*)(+=._-]+:?/.exec(currentText.substr(emojiSentenceIndex));
        const currentEmoji = emojiSentenceIndex > -1 && matches ? matches[0] : null;
        let suggestions = null;
        if (currentEmoji) {
            let emoji = currentEmoji.substr(1);
            if (emoji.slice(-1) === ":") {
                emoji = emoji.slice(0, -1);
                const currentSuggestions = emoji_mart_1.emojiIndex.search(emoji);
                if (currentSuggestions != null && currentSuggestions.length > 0) {
                    const emojiReplace = currentSuggestions[0].native;
                    currentText = currentText.replace(currentEmoji, emojiReplace);
                    setTextAreaCursor(emojiSentenceIndex + emojiReplace.length);
                }
            }
            else {
                suggestions = emoji_mart_1.emojiIndex.search(emoji);
                if (suggestions) {
                    suggestions = suggestions.slice(0, defaultTextArea.rows * columnMax);
                }
            }
        }
        props.onChange(currentText);
        if (props.onSuggesting) {
            const isExistSuggestions = suggestions && suggestions.length > 0;
            props.onSuggesting(isExistSuggestions ? isExistSuggestions : false);
        }
        setState(Object.assign(Object.assign({}, state), { text: currentText, editingEmoji: currentEmoji ? currentEmoji : "", suggestions: suggestions ? suggestions : [], selectedEmojiIndex: 0 }));
    }, [state]);
    const forwardEmoji = (isVertical) => {
        const move = isVertical ? columnMax : 1;
        const index = selectedEmojiIndex + move;
        setState(Object.assign(Object.assign({}, state), { selectedEmojiIndex: index >= suggestions.length ? suggestions.length - 1 : index }));
    };
    const beforeEmoji = (isVertical) => {
        const move = isVertical ? columnMax : 1;
        const index = selectedEmojiIndex - move;
        setState(Object.assign(Object.assign({}, state), { selectedEmojiIndex: index < 0 ? 0 : index }));
    };
    const enterEmoji = (emojiData) => {
        const emoji = emojiData.native;
        if (!text)
            return;
        const cursor = text.indexOf(editingEmoji) + emoji.length + 1;
        setState(Object.assign(Object.assign({}, state), { text: text.replace(editingEmoji, `${emoji} `), editingEmoji: "", suggestions: [] }));
        if (props.onSuggesting) {
            props.onSuggesting(false);
        }
        setTextAreaCursor(cursor);
    };
    const handleKeyDown = (e) => {
        if (!e.ctrlKey && !e.shiftKey) {
            switch (e.key) {
                case "Left":
                case "ArrowLeft":
                    if (suggestions.length > 0) {
                        beforeEmoji(false);
                        e.preventDefault();
                    }
                    break;
                case "Right":
                case "ArrowRight":
                    if (suggestions.length > 0) {
                        forwardEmoji(false);
                        e.preventDefault();
                    }
                    break;
                case "Up":
                case "ArrowUp":
                    if (suggestions.length > 0) {
                        beforeEmoji(true);
                        e.preventDefault();
                    }
                    break;
                case "Down":
                case "ArrowDown":
                    if (suggestions.length > 0) {
                        forwardEmoji(true);
                        e.preventDefault();
                        break;
                    }
            }
        }
    };
    const handleKeyUp = (e) => {
        switch (e.key) {
            case "Enter":
                if (suggestions.length > 0) {
                    enterEmoji(suggestions[selectedEmojiIndex]);
                    e.preventDefault();
                }
                break;
            case "Tab":
            case " ":
                setState(Object.assign(Object.assign({}, state), { editingEmoji: "", suggestions: [] }));
                break;
        }
    };
    const onSelectEmoji = (emoji) => {
        const element = textAreaElement();
        if (!element)
            return;
        if (!text)
            return;
        const before = text.slice(0, element.selectionStart);
        const native = emoji.native;
        const after = text.slice(element.selectionStart);
        const newText = `${before}${native}${after}`;
        setState(Object.assign(Object.assign({}, state), { text: newText, editingEmoji: "", suggestions: [], selectedEmojiIndex: 0 }));
        setTextAreaCursor(before.length + native.length);
    };
    const onClick = (e) => {
        if (props.onClick) {
            props.onClick(e);
        }
        setState(Object.assign(Object.assign({}, state), { editingEmoji: "", suggestions: [], selectedEmojiIndex: 0 }));
    };
    const onOverEmojiIndex = (index) => setState(Object.assign(Object.assign({}, state), { selectedEmojiIndex: index }));
    const highlight = editingEmoji.substr(1);
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("textarea", { autoFocus: true, value: text, onChange: handleChange, style: props.style, onClick: onClick, ref: ref ? ref : textAreaRef, rows: props.rows ? props.rows : defaultTextArea.rows, cols: props.cols ? props.cols : defaultTextArea.cols, placeholder: props.placeholder, onKeyDown: handleKeyDown, onKeyPress: handleKeyUp }, void 0), jsx_runtime_1.jsx(SuggestArea_1.default, { columnMax: columnMax, emojiIndex: selectedEmojiIndex, suggestions: suggestions, highlight: highlight, onOverEmojiIndex: onOverEmojiIndex, onSelect: enterEmoji }, void 0), props.showPicker ? (jsx_runtime_1.jsx(EmojiPicker_1.default, { attributers: Object.assign(Object.assign({}, props.emojiPickerProps), { onSelect: onSelectEmoji }) }, void 0)) : null] }, void 0));
};
exports.default = react_1.forwardRef(EmojiTextArea);
