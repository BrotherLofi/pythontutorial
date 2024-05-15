addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Replace 'your-pythonanywhere-api-url' with the URL of your PythonAnywhere API endpoint
  const apiUrl = 'https://brothertest.pythonanywhere.com/api/hello';

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
    <style>
      body {
        font-family: Arial, sans-serif; /* Specify the sans-serif font */
        background-color: #fff; /* White background color for the overall page */
        padding: 20px; /* Add padding to the body */
      }
      .content {
        background-color: #f5f5f5; /* Light gray background color for the content */
        padding: 20px; /* Add padding to the content area */
        max-width: 600px; /* Limit the maximum width of the content area */
        margin: 0 auto; /* Center the content area horizontally */
      }
      p {
        margin: 10px 0; /* Add margin around paragraphs */
      }
      h1, h2, h3 {
        margin-bottom: 5px; /* Add margin below each heading */
        color: #333; /* Dark text color */
      }
      h2 {
        margin-top: 20px; /* Add extra margin above h2 */
        border-bottom: 2px solid #ccc; /* Add a border below h2 */
        padding-bottom: 5px; /* Add padding below h2 */
      }
      h3 {
        margin-top: 15px; /* Add smaller margin above h3 */
        color: #666; /* Slightly lighter text color for h3 */
      }
    </style>
    <div class="content">
      <h1>In Cloudflare Worker</h1>
      <h2>Message</h2>
      <p>${data.message}</p>
      <h3>Time</h3>
      <p>${data.time}</p>
    </div>
  `;



  // Return the HTML response from the Cloudflare Worker
  return new Response(htmlResponse, {
    headers: { 'Content-Type': 'text/html' },
  });
}
