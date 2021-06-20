import React from "react";
import { Picker, PickerProps } from "emoji-mart";

interface EmojiPickerProps {
  hidden?: boolean;
  attributers: PickerProps;
}

const EmojiPicker: React.FunctionComponent<EmojiPickerProps> = (props) => {
  const { hidden, attributers } = props;
  return (
    <div style={{ display: hidden ? "none" : "" }} id="custom_picker">
      <Picker {...attributers} />
    </div>
  );
};

export default EmojiPicker;
