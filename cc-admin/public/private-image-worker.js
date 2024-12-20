self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const privateHost = new URL(self.serviceWorker.scriptURL).searchParams.get('host')
  if (!event.request.url.startsWith(privateHost)) return

  event.respondWith(modifyAPIResponse(event.request));
})

async function modifyAPIResponse(request) {
  const imageLink = request.url
  request = new Request(`/api/media?url=${imageLink}`, {
    method: 'GET',
    headers: request.headers,
    mode: 'same-origin',
    credentials: 'include',
  });
  return await fetch(request)
}