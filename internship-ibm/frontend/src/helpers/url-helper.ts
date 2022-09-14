const PATH = process.env.REACT_APP_BASE_URL;

export const getAbsoluteUrl = (relativePath: string) =>
  `${PATH}/${relativePath}`;
