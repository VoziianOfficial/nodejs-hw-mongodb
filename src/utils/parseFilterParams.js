// src/utils/parseFilterParams.js

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  return {
    ...(type ? { contactType: type } : {}),
    ...(parsedIsFavourite !== undefined
      ? { isFavourite: parsedIsFavourite }
      : {}),
  };
};
