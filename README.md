# react-emoji-textarea 😆💖

You can use **Slack-like emoji shortcuts on textarea!** 🦸‍♂️⌨️

[![Image from Gyazo](https://i.gyazo.com/64f104b34c185872b6a864d4bfd6ad21.gif)](https://gyazo.com/64f104b34c185872b6a864d4bfd6ad21)

## 🛠️ Requirement

- [Node.js 14.10.1](https://nodejs.org/)
- [React 17.0.8](https://ja.reactjs.org/)
- [Emoji Mart 3.0.4](https://github.com/missive/emoji-mart)

## 💾 Installation

Install the plugin via Yarn (recommended)

```bash
yarn add -D react-emoji-textarea
```

or via NPM

```bash
npm i -D react-emoji-textarea
```

## 🏃 Getting Started

### Include component

```javascript
import ReactEmojiTextArea from "react-emoji-textarea";
```

### Make some elegant textarea

```javascript
<ReactEmojiTextArea
  style={{ fontSize: "1em" }}
  ref={textAreaEl}
  onChange={(text) => console.log(text)}
  placeholder={"Try typing emoji like a Slack shortcut! 😆💖"}
  emojiPickerProps={{
    showSkinTones: true,
  }}
/>
```

## 🛠️ Configuring the plugin

`Props` for ReactEmojiTextArea include the following, which you can customize as you see fit. 🤵

```javascript
export interface EmojiTextAreaProps {
  ref?: React.RefObject<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
  placeholder?: string;
  showPicker?: boolean;
  emojiPickerProps?: PickerProps;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  onSuggesting?: (val: boolean) => void;
  onChange: (val: string) => void;
}
```

| Attribute        | Required |                  Type                  | Default | Description                                                                                                                                                                                                                  |
| :--------------- | :------: | :------------------------------------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ref              |    -     | `React.RefObject<HTMLTextAreaElement>` | `null`  | Use this when you want to refer to a `textarea` element.                                                                                                                                                                     |
| rows             |    -     |                `number`                |    3    | Specifying rows for `textarea`.                                                                                                                                                                                              |
| cols             |    -     |                `number`                |   40    | Specifying cols for `textarea`.                                                                                                                                                                                              |
| style            |    -     |         `React.CSSProperties`          | `null`  | Specifying the style of a `textarea`.                                                                                                                                                                                        |
| placeholder      |    -     |                `string`                | `null`  | Specifying a placeholder for a `textarea`.                                                                                                                                                                                   |
| showPicker       |    -     |               `boolean`                | `false` | Toggle the display of [emoji-mart's Picker](https://github.com/missive/emoji-mart#picker).                                                                                                                                   |
| emojiPickerProps |    -     |             `PickerProps`              | `null`  | Specify the `props` for [emoji-mart's Picker](https://github.com/missive/emoji-mart#picker). **[onSelect](https://github.com/nikaera/react-emoji-textarea/blob/main/src/index.tsx#L283) is used in `react-emoji-textarea`.** |
| onClick          |    -     |               `function`               | `null`  | Function to determine that a `textarea` field has been clicked.                                                                                                                                                              |
| onSuggesting     |    -     |               `function`               | `null`  | Function to determine while an emoji input candidate is displayed.                                                                                                                                                           |
| onChange         |    ✅    |               `function`               | `null`  | Function used to get the content of the `textarea`.                                                                                                                                                                          |

## 🎁 Contributing

If you have any questions, please feel free to create an [Issue](https://github.com/nikaera/react-emoji-textarea/issues/new) or [PR](https://github.com/nikaera/react-emoji-textarea/pulls) for you! 🙌

## License

[MIT](https://github.com/nikaera/Teemo/blob/main/LICENSE)
