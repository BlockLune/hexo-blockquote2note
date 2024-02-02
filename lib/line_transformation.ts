import { getNoteHead, getNoteTail } from './note';
import { BLOCK_HEAD_REGEX, BLOCK_TAIL_REGEX } from './constants';

const buildNoteBody = (lines: string[]): string[] => {
  const updated: string[] = [];
  for (const line of lines) {
    if (!line.startsWith('> ')) throw new SyntaxError('All lines in a blockquote should start with "> ".');
    updated.push(line.slice(2)); // blockquote lines start with '> '
  }
  return updated;
};

export const blockquoteLines2NoteLines = (lines: string[]): string[] => {
  const updated: string[] = [];

  // head
  const headMatch = lines[0].match(BLOCK_HEAD_REGEX);
  if (!headMatch) throw new SyntaxError('Invalid block head.');
  if (headMatch[1] !== '') {
    updated.push(getNoteHead(headMatch[2]));
  } else {
    updated.push(getNoteHead());
  }

  // body
  for (const line of buildNoteBody(lines.slice(1, -1))) {
    updated.push(line);
  }

  // tail
  const tailMatch = lines[lines.length - 1].match(BLOCK_TAIL_REGEX);
  if (!tailMatch) throw new SyntaxError('Invalid block tail.');
  updated.push(getNoteTail());

  return updated;
};
