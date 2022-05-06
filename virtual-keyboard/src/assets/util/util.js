export const getKeys = async () => {
  try {
    const res = await fetch('./keys.json');
    const keys = await res.json();

    return keys;
  } catch (error) {
    throw new Error(error);
  }
};
