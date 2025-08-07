import React from 'react';
import { Emoji } from '@emoji-mart/data';
/**
 * Props for the EmojiTextarea component.
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
}
declare const EmojiTextArea: React.ForwardRefExoticComponent<Omit<EmojiTextAreaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export default EmojiTextArea;
