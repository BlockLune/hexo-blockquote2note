const BLOCK_BEGINNING_FLAG = '<!--blockquote2note-->';
const BLOCK_ENDING_FLAG = '<!--end-blockquote2note-->';
const BLOCK_CONFIG_REGEX = /<!--blockquote2note-config:(.*?),(.*?),'(.*?)'-->/;
// see https://theme-next.js.org/docs/tag-plugins/note
const NOTE_TYPES = ['', 'default', 'primary', 'info', 'success', 'warning', 'danger'];
const NOTE_HAS_ICON = ['', 'no-icon'];

const getConfiguredNoteStarter = (configLine: string) : string => {
  const match = configLine.match(BLOCK_CONFIG_REGEX);
  if (match) {
    const type = match[1];
    const icon = match[2];
    const other = match[3].slice(1, -1);

    if (NOTE_TYPES.indexOf(type) === -1) {
      throw new SyntaxError('Invalid note type.');
    }
    if (NOTE_HAS_ICON.indexOf(icon) === -1) {
      throw new SyntaxError('Invalid icon type.');
    }
    return `{% note ${type} ${icon} ${other} %}`;
  }
  throw new SyntaxError('Invalid config line.');
};

const getRawLinesFromBlockquote = (lines: string[]) : string[] => {
  const rawLines: string[] = [];
  for (const line of lines) {
    const rawLine = line.slice(2); // blockquote lines start with "> "
    rawLines.push(rawLine);
  }
  return rawLines;
};

const blockquoteLines2NoteLines = (lines: string[], configLine? : string) : string[] => {
  const noteLines: string[] = [];
  const rawLines = getRawLinesFromBlockquote(lines);

  if (configLine) {
    noteLines.push(getConfiguredNoteStarter(configLine));
  } else {
    noteLines.push('{% note %}');
  }
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
      throw new SyntaxError('Found a BLOCK_ENDING_FLAG before finding a BLOCK_BEGINNING_FLAG.');
    } else {
      let configLine;
      const lineNextToBeginning = lines.at(blockBeginningIndex + 1);
      if (lineNextToBeginning && lineNextToBeginning.startsWith('<!--blockquote2note')) {
        // TODO: Now here is inadequate.
        configLine = lineNextToBeginning;
      }

      const blockquoteLines = configLine
        ? lines.slice(blockBeginningIndex + 1, blockEndingIndex + 1)
        : lines.slice(blockBeginningIndex, blockEndingIndex + 1);

      for (const line of blockquoteLines2NoteLines(blockquoteLines, configLine)) {
        updatedLines.push(line);
      }
    }
  }
  return updatedLines.join('\n');
};
