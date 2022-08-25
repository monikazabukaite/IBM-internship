const PATH = 'http://localhost:3001';

export const getAbsoluteUrl = (relativePath: string) => `${PATH}/${relativePath}`;