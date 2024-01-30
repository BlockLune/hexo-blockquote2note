const NOTE_TYPES = ['', 'default', 'primary', 'info', 'success', 'warning', 'danger'];
const ICON_TYPES = ['', 'no-icon'];

const NOTE_LEFT_PART = '{%';
const NOTE_RIGHT_PART = '%}';
const NOTE_HEAD_FLAG = 'note';
const NOTE_TAIL_FLAG = 'end' + NOTE_HEAD_FLAG;

const parseNoteType = (option: string): string => {
  if (NOTE_TYPES.indexOf(option.trim()) === -1) {
    throw new SyntaxError('Invalid note type.');
  }
  return option.trim();
};

const parseIconType = (option: string): string => {
  if (ICON_TYPES.indexOf(option.trim()) === -1) {
    throw new SyntaxError('Invalid icon type.');
  }
  return option.trim();
};

const parseSummary = (option: string): string => {
  return option.trim();
};

export const getNoteHead = (options?: string): string => {
  const result: string[] = [];
  result.push(NOTE_LEFT_PART);
  result.push(NOTE_HEAD_FLAG);

  if (options) {
    const optionArray = options.split(',');

    const noteType = parseNoteType(optionArray[0]);
    const iconType = parseIconType(optionArray[1]);
    const summary = parseSummary(optionArray.slice(2).join(',')); // three parts

    if (noteType !== '') result.push(noteType);
    if (iconType !== '') result.push(iconType);
    if (summary !== '') result.push(summary);
  }

  result.push(NOTE_RIGHT_PART);
  return result.join(' ');
};

export const getNoteTail = (): string => {
  return NOTE_LEFT_PART + ' ' + NOTE_TAIL_FLAG + ' ' + NOTE_RIGHT_PART;
};

