(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/content.js.4a353e83.js")
    );
  })().catch(console.error);

})();
