// note
export const NOTE_TYPES = ['', 'default', 'primary', 'info', 'success', 'warning', 'danger'];
export const ICON_TYPES = ['', 'no-icon'];

export const NOTE_LEFT_PART = '{%';
export const NOTE_RIGHT_PART = '%}';
export const NOTE_HEAD_FLAG = 'note';
export const NOTE_TAIL_FLAG = 'end' + NOTE_HEAD_FLAG;

// blockquote
export const BLOCK_HEAD_REGEX = /^<!--blockquote2note(:?(.*?))-->$/;
export const BLOCK_TAIL_REGEX = /^<!--end-blockquote2note-->$/;
