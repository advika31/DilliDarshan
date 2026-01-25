export async function getNextAction(lat, lon) {
  const res = await fetch(
    `http://192.168.1.56:5001/api/next-action?lat=${lat}&lon=${lon}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch next action");
  }

  return res.json();
}
