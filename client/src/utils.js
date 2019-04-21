export const dateFormat = (date) => {
  const simpleDate = new Date(date);
  const month = simpleDate.toLocaleString('en-us', { month: 'long' });
  const day = simpleDate.getDate();
  const year = simpleDate.getFullYear();

  return `${month} ${day}, ${year}`;
}