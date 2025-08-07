import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import EmojiTextarea from '../src/EmojiTextarea';

describe('EmojiTextarea', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <EmojiTextarea placeholder="test" onChange={() => {}} />,
    );
    expect(getByPlaceholderText('test')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <EmojiTextarea placeholder="test" onChange={handleChange} />,
    );
    const textarea = getByPlaceholderText('test') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('shows emoji suggest when typing :smile:', async () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <EmojiTextarea placeholder=":smile:" onChange={handleChange} />,
    );
    const textarea = getByPlaceholderText(':smile:') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello :smil' } });
    // 候補が表示されるまで待つ
    await waitFor(() => {
      // ハイライト部分のdata-testidで検出
      expect(document.querySelector('[data-testid="emoji-suggest-id"]')).toBeInTheDocument();
    });
  });
});
