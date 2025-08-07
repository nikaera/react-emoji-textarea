import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import EmojiTextarea from '../src/EmojiTextarea';

const meta = {
  title: 'Components/EmojiTextarea',
  component: EmojiTextarea,
} satisfies Meta<typeof EmojiTextarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Try typing :smile: or open picker! 😆💖',
    onChange: () => {},
  },
  render: (args) => {
    return (
      <>
        <EmojiTextarea {...args} />
        <p>Something Text</p>
      </>
    );
  },
};

export const WithPicker: Story = {
  args: {
    placeholder: ':heart: :star: :fire:',
    emojiPickerProps: { showSkinTones: true },
    onChange: () => {},
  },
  render: (args) => {
    const [showPicker, setShowPicker] = useState(false);
    return (
      <>
        <button onClick={() => setShowPicker((v) => !v)}>
          {showPicker ? 'Close Picker' : 'Open Picker'}
        </button>
        <EmojiTextarea
          {...args}
          showPicker={showPicker}
          onEmojiPick={(e) => {
            console.log(e);
            setShowPicker((v) => !v);
          }}
        />
      </>
    );
  },
};

export const PickerAlwaysOpen: Story = {
  args: {
    placeholder: 'Picker always open!',
    showPicker: true,
    emojiPickerProps: { showSkinTones: true },
    onChange: () => {},
  },
  render: (args) => {
    return <EmojiTextarea {...args} />;
  },
};
