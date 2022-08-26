const PATH = 'http://localhost:3001';//process.env.BASE_URL;

export const getAbsoluteUrl = (relativePath: string) => `${PATH}/${relativePath}`;