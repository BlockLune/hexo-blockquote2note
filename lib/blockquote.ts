import { getNoteHead, getNoteTail } from './note';

const BLOCK_HEAD_REGEX = /^<!--blockquote2note(:?(.*?))-->$/;
const BLOCK_TAIL_REGEX = /^<!--end-blockquote2note-->$/;

const buildNoteBody = (lines: string[]): string[] => {
  const updated: string[] = [];
  for (const line of lines) {
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
  const tailMatch = lines[-1].match(BLOCK_TAIL_REGEX);
  if (!tailMatch) throw new SyntaxError('Invalid block tail.');
  updated.push(getNoteTail());

  return updated;
};
