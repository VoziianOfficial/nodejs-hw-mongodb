// src/utils/parseFilterParams.js

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = type; // Неизмененный тип
  const parsedIsFavourite = parseBoolean(isFavourite); // Преобразование в boolean

  return {
    ...(parsedType ? { contactType: parsedType } : {}),
    ...(parsedIsFavourite !== undefined
      ? { isFavourite: parsedIsFavourite }
      : {}),
  };
};
