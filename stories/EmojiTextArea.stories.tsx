import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import EmojiTextArea from '../src/EmojiTextArea';

const meta = {
  title: 'Components/EmojiTextArea',
  component: EmojiTextArea,
} satisfies Meta<typeof EmojiTextArea>;
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
        <EmojiTextArea {...args} />
        <p>Something Text</p>
      </>
    );
  },
};

export const WithPicker: Story = {
  args: {
    placeholder: ':heart: :star: :fire:',
    onChange: () => {},
  },
  render: (args) => {
    const [showPicker, setShowPicker] = useState(false);
    return (
      <>
        <button onClick={() => setShowPicker((v) => !v)}>
          {showPicker ? 'Close Picker' : 'Open Picker'}
        </button>
        <EmojiTextArea
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
    onChange: () => {},
  },
  render: (args) => {
    return <EmojiTextArea {...args} />;
  },
};
