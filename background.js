chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "gala-demo.appspot.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      if (details.type === "xmlhttprequest" && details.method === "POST") {
        const requestBody = decodeURIComponent(
          String.fromCharCode.apply(
            null,
            new Uint8Array(details.requestBody.raw[0].bytes)
          )
        );
        // TODO
      }
    },
    {
      urls: ["*://*.appspot.com/", "*://oauthintegrations.googleapis.com/v1/*"],
    },
    ["extraHeaders", "requestBody"]
  );

  chrome.webRequest.onCompleted.addListener(
    (details) => {},
    {
      urls: ["*://*.appspot.com/", "*://oauthintegrations.googleapis.com/v1/*"],
    },
    ["extraHeaders", "responseHeaders"]
  );

  chrome.runtime.onMessage.addListener((details) => {
    console.log(details);
    // TODO
  });
});
