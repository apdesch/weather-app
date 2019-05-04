const convertTemp = (temp, metric) => {
  const calc = !metric
    ? (temp - 273.15) * 1.8 + 32
    : temp - 273.15;
  return Math.round(calc);
}

export default convertTemp;
