// src/utils/parseFilterParams.js

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedIsFavorite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  return {
    type,
    isFavourite: parsedIsFavorite,
  };
};
