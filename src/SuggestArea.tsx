import classNames from "classnames";
import { EmojiData, BaseEmoji } from "emoji-mart";

import React from "react";

import styled from "styled-components";

const EmojiInfoDiv = styled.div`
  padding: 0.3em;
  font-size: 1.1em;
  font-size: 1.5em;
  margin: 0px;
  height: 2em;
`;

const EmojiColonsP = styled.p`
  font-size: 0.5em;
  font-style: italic;
  color: gray;
  position: relative;
  top: -10px;
`;

const EmojiHighlightSpan = styled.span`
  color: blue;
  background-color: yellow;
`;

const EmojiSpanSelected = (selected: boolean) => {
  if (selected) {
    return `
      border-radius: 50%;
      background-color: #f4f4f4;
    `;
  }
  return null;
};
const EmojiSpan = styled.span<{ selected: boolean }>`
  margin-left: 0.1em;
  margin-right: 0.1em;
  padding: 0.3em;
  font-size: 1.1em;

  ${({ selected }) => EmojiSpanSelected(selected)}
`;

const EmojiSuggestLineP = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
`;

interface SuggestAreaProps {
  highlight?: string;
  columnMax: number;
  suggestions: Array<EmojiData>;
  emojiIndex: number;
  onOverEmojiIndex: (index: number) => void;
  onSelect: (emoji: EmojiData) => void;
}

const SuggestArea: React.FunctionComponent<SuggestAreaProps> = (props) => {
  const {
    columnMax,
    emojiIndex,
    highlight,
    suggestions,
    onOverEmojiIndex,
    onSelect,
  } = props;

  // ref: https://www.nxworld.net/js-array-chunk.html
  const arrayChunk = ([...array]: EmojiData[], size = 1): EmojiData[][] => {
    return array.reduce(
      (acc, _, index) =>
        index % size ? acc : [...acc, array.slice(index, index + size)],
      [] as EmojiData[][]
    );
  };
  const selectedEmojiInfo = (highlight: string) => {
    const emoji = suggestions[emojiIndex] as BaseEmoji | null;
    if (emoji) {
      const { short_names } = suggestions[emojiIndex] as {
        short_names: string[];
      };
      return (
        <EmojiInfoDiv>
          <span>{emoji.native}</span>
          <br />
          <EmojiColonsP>
            {short_names.map((s) => {
              const start = s.indexOf(highlight);
              const before = s.slice(0, start);
              const highlightEmoji = s.slice(start, start + highlight.length);
              const after = s.slice(start + highlight.length);

              return (
                <span key={s}>
                  :{before}
                  <EmojiHighlightSpan>{highlightEmoji}</EmojiHighlightSpan>
                  {after}:
                </span>
              );
            })}
          </EmojiColonsP>
        </EmojiInfoDiv>
      );
    }
    return null;
  };

  let suggestsElement = null;
  const onClick = () => {
    if (suggestions.length > 0) {
      onSelect(suggestions[emojiIndex]);
    }
  };

  if (suggestions.length > 0) {
    const suggestionsChunk = arrayChunk(suggestions, columnMax);
    suggestsElement = (
      <div>
        {highlight ? selectedEmojiInfo(highlight) : null}
        {suggestionsChunk.map((_suggestions, row) => {
          const elements = _suggestions.map((emoji, column) => {
            const selected = (emoji as BaseEmoji).native;
            const index = row * columnMax + column;
            const emojiClass = classNames("emoji", {
              selected: index === emojiIndex,
            });
            return (
              <EmojiSpan
                key={emoji.id}
                selected={index === emojiIndex}
                className={emojiClass}
                onMouseOver={() => onOverEmojiIndex(index)}
                onClick={onClick}
              >
                {selected}
              </EmojiSpan>
            );
          });
          const emojiSetKey = _suggestions
            .map((emoji) => (emoji as BaseEmoji).native)
            .join();
          return (
            <EmojiSuggestLineP key={emojiSetKey}>{elements}</EmojiSuggestLineP>
          );
        })}
      </div>
    );
  }

  return suggestsElement;
};

export default SuggestArea;
