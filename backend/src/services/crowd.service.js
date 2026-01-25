const getCrowdLevel = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday

  const isWeekend = day === 0 || day === 6;

  if (hour >= 11 && hour <= 16 && isWeekend) {
    return "HIGH";
  }

  if (hour >= 11 && hour <= 15) {
    return "MEDIUM";
  }

  return "LOW";
};

module.exports = { getCrowdLevel };
