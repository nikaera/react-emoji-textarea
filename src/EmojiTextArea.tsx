import React, { useRef, useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';
import data, { Emoji } from '@emoji-mart/data';

/**
 * Props for the EmojiTextArea component.
 */
export interface EmojiTextAreaProps {
  /**
   * Ref for the textarea element.
   */
  ref?: React.RefObject<HTMLTextAreaElement>;
  /**
   * Number of rows for the textarea.
   */
  rows?: number;
  /**
   * Number of columns for the textarea.
   */
  cols?: number;
  /**
   * Custom style for the textarea.
   */
  style?: React.CSSProperties;
  /**
   * Placeholder text for the textarea.
   */
  placeholder?: string;
  /**
   * Whether to show the emoji picker by default.
   */
  showPicker?: boolean;
  /**
   * Callback when the textarea is clicked.
   */
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  /**
   * Callback when an emoji is selected from the picker.
   */
  onEmojiPick?: (emoji: Emoji) => void;
  /**
   * Callback when the textarea value changes.
   */
  onChange: (val: string) => void;
  /**
   * Callback when the emoji picker is clicked outside.
   * Useful for closing the picker when clicking outside.
   */
  onClickOutside?: () => void;
  /**
   * Maximum height for the emoji suggestion area.
   */
  suggestMaxHeight?: number;
  /**
   * Whether the textarea should automatically receive focus on mount.
   */
  autoFocus?: boolean;
}

/**
 * Regex to match Slack-style :shortcode: emoji input.
 */
const EMOJI_SHORTCODE_REGEX = /:([a-zA-Z0-9_+-]+):?$/;

/**
 * Simple caret position calculation (used for positioning the picker).
 * @param textarea The textarea element
 * @returns Coordinates for the picker
 */
const getCaretCoordinates = (textarea: HTMLTextAreaElement) => {
  const { offsetTop, offsetLeft } = textarea;
  return { top: offsetTop + textarea.offsetHeight, left: offsetLeft };
};

const EmojiTextArea = React.forwardRef<HTMLTextAreaElement, EmojiTextAreaProps>(
  (
    {
      rows = 3,
      cols = 40,
      style,
      placeholder,
      showPicker = false,
      onClick,
      onEmojiPick,
      onChange,
      onClickOutside,
      suggestMaxHeight = 160,
      autoFocus = true, // Whether to focus the textarea when the picker opens
    },
    ref,
  ) => {
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState('');
    const [pickerOpen, setPickerOpen] = useState(showPicker);
    const [suggesting, setSuggesting] = useState(false);
    const [suggestResults, setSuggestResults] = useState<Emoji[]>([]);
    const [suggestPos, setSuggestPos] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });
    const [suggestIndex, setSuggestIndex] = useState(0);
    const [suggestQuery, setSuggestQuery] = useState('');

    useEffect(() => {
      setPickerOpen(showPicker);
    }, [showPicker]);

    // pickerOpen が true になったときに textarea に focus を当てる
    useEffect(() => {
      if (pickerOpen && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [pickerOpen]);

    /**
     * Handles input and shows suggestions when typing Slack-style :shortcode:.
     */
    const handleInput = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setValue(val);
      onChange(val);

      const match = val.slice(0, e.target.selectionStart ?? undefined).match(EMOJI_SHORTCODE_REGEX);
      if (match && match[1]) {
        setSuggestQuery(match[1]);
        // If the shortcode is closed with a colon, check for an exact match immediately
        if (/^:[a-zA-Z0-9_+-]+:$/.test(match[0])) {
          try {
            const { SearchIndex, init } = await import('emoji-mart');
            await init({ data });
            const results = await SearchIndex.search(match[1]);
            // If there is an exact match, replace immediately
            const exact = results.find((emoji: Emoji) => emoji.id === match[1]);
            if (exact) {
              handleSuggestSelect(exact);
              setSuggesting(false);
              setSuggestResults([]);
              setSuggestIndex(0);
              return;
            }
            // If not, show normal suggestions
            setSuggesting(true);
            setSuggestResults(results);
            setSuggestIndex(0);
            if (textareaRef.current) {
              setSuggestPos(getCaretCoordinates(textareaRef.current));
            }
          } catch {
            setSuggestResults([]);
          }
        } else {
          // Normal suggestion
          setSuggesting(true);
          try {
            const { SearchIndex, init } = await import('emoji-mart');
            await init({ data });
            const results = await SearchIndex.search(match[1]);
            setSuggestResults(results);
            setSuggestIndex(0);
            if (textareaRef.current) {
              setSuggestPos(getCaretCoordinates(textareaRef.current));
            }
          } catch {
            setSuggestResults([]);
          }
        }
      } else {
        setSuggestQuery('');
        setSuggesting(false);
        setSuggestResults([]);
        setSuggestIndex(0);
      }
    };

    /**
     * When an emoji is selected from the suggestion list.
     */
    const handleSuggestSelect = (emoji: Emoji) => {
      if (!textareaRef.current) return;
      const cursor = textareaRef.current.selectionStart ?? value.length;
      const before = value.slice(0, cursor).replace(EMOJI_SHORTCODE_REGEX, '');
      const after = value.slice(cursor);
      const newValue = before + emoji.skins[0].native + after;
      setValue(newValue);
      onChange(newValue);
      setSuggesting(false);
      setSuggestResults([]);
      // Move caret to just after the inserted emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            before.length + emoji.skins[0].native.length;
        }
      }, 0);
    };

    /**
     * When an emoji is selected from the emoji picker.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePickerSelect = (emoji: any) => {
      if (!textareaRef.current) return;
      const cursor = textareaRef.current.selectionStart ?? value.length;
      const before = value.slice(0, cursor);
      const after = value.slice(cursor);
      // emoji-mart v5 以降は emoji.native で取得
      const emojiChar =
        emoji.native || (emoji.skins && emoji.skins[0] && emoji.skins[0].native) || '';
      const newValue = before + emojiChar + after;
      setValue(newValue);
      onChange(newValue);
      if (onEmojiPick) onEmojiPick(emoji);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            before.length + emojiChar.length;
        }
      }, 0);
    };

    /**
     * Handles up/down/enter key events when suggestion list is open.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (suggesting && suggestResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSuggestIndex((i) => (i + 1) % suggestResults.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSuggestIndex((i) => (i - 1 + suggestResults.length) % suggestResults.length);
        } else if (e.key === 'Enter') {
          if (suggestResults[suggestIndex]) {
            e.preventDefault();
            handleSuggestSelect(suggestResults[suggestIndex]);
          }
        }
      }
    };

    /**
     * Ref array for each suggestion item element.
     */
    const suggestItemRefs = useRef<(HTMLDivElement | null)[]>([]);

    /**
     * Adjusts scroll position when the selected suggestion index changes.
     */
    useEffect(() => {
      if (suggesting && suggestResults.length > 0 && suggestItemRefs.current[suggestIndex]) {
        const container = suggestItemRefs.current[0]?.parentElement;
        const item = suggestItemRefs.current[suggestIndex];
        if (container && item) {
          const containerRect = container.getBoundingClientRect();
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < containerRect.top) {
            // If above the container, align to top
            item.scrollIntoView({ block: 'start', behavior: 'auto' });
          } else if (itemRect.bottom > containerRect.bottom) {
            // If below the container, align to bottom
            item.scrollIntoView({ block: 'end', behavior: 'auto' });
          }
        }
      }
    }, [suggestIndex, suggesting, suggestResults.length]);

    return (
      <div style={{ position: 'relative', width: 'fit-content', overflow: 'visible' }}>
        <textarea
          ref={textareaRef}
          rows={rows}
          cols={cols}
          style={style}
          placeholder={placeholder}
          value={value}
          onChange={handleInput}
          onClick={onClick}
          onKeyDown={handleKeyDown}
        />
        {/* Slack風 :shortcode: 候補 */}
        {suggesting && suggestResults.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: suggestPos.top + 4,
              left: suggestPos.left,
              zIndex: 9999,
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 8px 32px rgba(18,100,163,0.18), 0 2px 8px rgba(0,0,0,0.12)',
              width: '85%',
              fontFamily:
                'Slack-Lato, apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
              fontSize: 15,
              color: '#1d1c1d',
              border: 'none',
              padding: '4px 0',
              overflow: 'visible',
              pointerEvents: 'auto',
              transition: 'box-shadow 0.2s',
              maxHeight: suggestMaxHeight,
              overflowY: 'auto',
            }}
          >
            {suggestResults.map((emoji, idx) => {
              // ハイライト用分割
              let id = emoji.id;
              let query = suggestQuery;
              let startIdx = id.toLowerCase().indexOf(query.toLowerCase());
              let before = id.slice(0, startIdx);
              let match = id.slice(startIdx, startIdx + query.length);
              let after = id.slice(startIdx + query.length);
              return (
                <div
                  key={emoji.id}
                  ref={(el) => (suggestItemRefs.current[idx] = el)}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    background: idx === suggestIndex ? '#e8f5fd' : 'transparent',
                    fontWeight: idx === suggestIndex ? 700 : 400,
                    color: idx === suggestIndex ? '#1264A3' : '#1d1c1d',
                    borderRadius: 6,
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestSelect(emoji);
                  }}
                  onMouseEnter={() => setSuggestIndex(idx)}
                >
                  <span style={{ fontSize: 22, marginRight: 12, flexShrink: 0 }}>
                    {emoji.skins[0].native}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: idx === suggestIndex ? '#1264A3' : '#616061',
                      opacity: 0.85,
                    }}
                  >
                    :
                    {startIdx !== -1 ? (
                      <>
                        {before}
                        <span
                          style={{ background: '#ffe066', borderRadius: 3 }}
                          data-testid="emoji-suggest-id"
                        >
                          {match}
                        </span>
                        {after}
                      </>
                    ) : (
                      id
                    )}
                    :
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {/* emoji-mart Picker */}
        {pickerOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}>
            <Picker
              data={data}
              onEmojiSelect={handlePickerSelect}
              onClickOutside={onClickOutside}
              autoFocus={autoFocus}
            />
          </div>
        )}
      </div>
    );
  },
);

EmojiTextArea.displayName = 'EmojiTextArea';
export default EmojiTextArea;
