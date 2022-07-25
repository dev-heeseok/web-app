export async function fetchCount(amount = 1): Promise<{ data: number }> {
  const res = await fetch("api/counter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const result = await res.json();
  return result;
}
