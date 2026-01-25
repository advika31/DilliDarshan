export async function getNextAction(lat, lon) {
  const res = await fetch(
    `http://localhost:5001/api/next-action?lat=${lat}&lon=${lon}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch next action");
  }

  return res.json();
}
