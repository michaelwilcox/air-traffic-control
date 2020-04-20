chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (request.request && request.request.url) {
      chrome.runtime.sendMessage({
        response: body,
      });
    }
  });
});
