import { PickerProps } from "emoji-mart";
import React from "react";

export interface EmojiTextAreaProps {
  ref?: React.RefObject<HTMLTextAreaElement>;
  showPicker?: boolean;
  onSuggesting?: (val: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
  emojiPickerProps?: PickerProps;
}
declare const _default: React.ForwardRefExoticComponent<EmojiTextAreaProps>;
export default _default;
