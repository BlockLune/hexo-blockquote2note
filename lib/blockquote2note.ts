import {
  BLOCK_HEAD_REGEX,
  BLOCK_TAIL_REGEX
} from './constants';
import { blockquoteLines2NoteLines } from './line_transformation';

export const blockquote2Note = (dataContent: string): string => {
  const lines = dataContent.split('\n');
  let headIndex = -1;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines.at(i);
    if (line === undefined) throw new RangeError(`Line of index ${i} is undefined.`);

    if (line.trim().match(BLOCK_HEAD_REGEX)) {
      headIndex = i;
      continue;
    }
    if (line.trim().match(BLOCK_TAIL_REGEX)) {
      if (headIndex === -1) throw new SyntaxError('Found TAIL before finding HEAD.');
      const tailIndex = i;
      const linesToTransform = lines.slice(headIndex, tailIndex + 1);
      const transformedLines = blockquoteLines2NoteLines(linesToTransform);
      for (let j = 0; j < transformedLines.length; ++j) {
        if (transformedLines.at(j) !== undefined) {
          lines[headIndex + j] = transformedLines[j];
        } else {
          throw new RangeError(`Line of index ${j} is undefined.`);
        }
      }
      headIndex = -1;
    }
  }
  return lines.join('\n');
};
