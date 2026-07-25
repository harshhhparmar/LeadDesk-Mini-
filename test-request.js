async function run() {
  const res = await fetch('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: "test",
      email: "test@example.com",
      budget: "Below ₹10,000",
      message: "Testing this thing"
    }),
  });
  console.log(res.status);
  console.log(await res.text());
}
run();
