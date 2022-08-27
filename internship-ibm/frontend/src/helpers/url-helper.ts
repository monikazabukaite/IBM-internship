const PATH = process.env.BASE_URL;

export const getAbsoluteUrl = (relativePath: string) =>
  `${PATH}/${relativePath}`;
