export const getKeys = async() => {
  const res = await fetch('./keys.json');
  const keys = await res.json();

  return keys;
  // try {
  // } catch (error) {
  //   throw new Error(error);
  // }
}