addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Replace 'your-pythonanywhere-api-url' with the URL of your PythonAnywhere API endpoint
  const apiUrl = 'https://username.pythonanywhere.com/api/hello';

  // Make a GET request to your Flask API
  const response = await fetch(apiUrl);

  // Check if the response is successful
  if (!response.ok) {
    throw new Error('Failed to fetch data from the API');
  }

  // Extract JSON data from the response
  const data = await response.json();

  // Construct an HTML response with the data wrapped in <h2> tags
  const htmlResponse = `
    <h1>In Cloudflare Worker</h1>
    <h2>Message : ${data.message}</h2>
    <h3>Time    : ${data.time}</h3>
  `;

  // Return the HTML response from the Cloudflare Worker
  return new Response(htmlResponse, {
    headers: { 'Content-Type': 'text/html' },
  });
}
