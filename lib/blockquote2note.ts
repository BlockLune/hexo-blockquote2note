const BLOCK_BEGINNING_FLAG = '<!--blockquote2note-->';
const BLOCK_ENDING_FLAG = '<!--end_blockquote2note-->';

const getRawLinesFromBlockquote = (lines: string[]) : string[] => {
  const rawLines: string[] = [];
  for (const line of lines) {
    const rawLine = line.slice(2);
    rawLines.push(rawLine);
  }
  return rawLines;
};

const blockquoteLines2NoteLines = (lines: string[]) : string[] => {
  const noteLines: string[] = [];
  const rawLines = getRawLinesFromBlockquote(lines);

  noteLines.push('{% note %}');
  for (const rawLine of rawLines) {
    noteLines.push(rawLine);
  }
  noteLines.push('{% endnote %}');

  return noteLines;
};

export const blockquote2note = (dataContent : string) : string => {
  const lines: string[] = dataContent.split('\n');
  const updatedLines: string[] = [];

  let blockBeginningIndex = -1;
  let blockEndingIndex = -1;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines.at(i);
    if (!line) {
      throw new RangeError();
    }
    const trimmedLine = line.trim();

    if (trimmedLine === BLOCK_BEGINNING_FLAG) {
      blockBeginningIndex = i;
    }
    if (trimmedLine === BLOCK_ENDING_FLAG) {
      blockEndingIndex = i;
    }

    if (blockBeginningIndex === -1 && blockEndingIndex === -1) {
      updatedLines.push(line);
    } else if (blockBeginningIndex === -1 && blockEndingIndex !== -1) {
      continue;
    } else if (blockBeginningIndex !== -1 && blockEndingIndex === -1) {
      throw new SyntaxError('Found a BLOCK_ENDING_FLAG before finding a BLOCK_BEGINNING_FLAG');
    } else {
      // TODO: generates note based on config
      // const configLine = lines.at(blockBeginningIndex + 1);
      for (const line of blockquoteLines2NoteLines(lines.slice(blockBeginningIndex, blockEndingIndex + 1))) {
        updatedLines.push(line);
      }
    }
  }
  return updatedLines.join('\n');
};
