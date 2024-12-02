// src/utils/parseFilterParams.js

export const parseFilterParams = (query) => {
  const { type, isFavorite } = query;

  const parsedIsFavorite =
    isFavorite === 'true' ? true : isFavorite === 'false' ? false : undefined;

  return {
    type,
    isFavorite: parsedIsFavorite,
  };
};
