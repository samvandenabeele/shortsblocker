(function () {
  function applyBlockingState() {
    chrome.storage.sync.get(["enabled"], (result) => {
      const isEnabled = result.enabled !== false; // Default to true if not set

      if (isEnabled) {
        document.documentElement.classList.add('shorts-blocker-enabled');
        blockShortForm();
      } else {
        document.documentElement.classList.remove('shorts-blocker-enabled');
      }
    });
  }

  function blockShortForm() {
    const path = window.location.pathname;
    const hostname = window.location.hostname;


    if (hostname.includes("youtube.com") && path.startsWith("/shorts/")) {
      window.location.replace("https://www.youtube.com/");
      return;
    }

    // Instagram Reels
    if (hostname.includes("instagram.com")) {
      if (
        path.startsWith("/reels/") ||
        path.startsWith("/reel/") ||
        path.startsWith("/explore/reels/")
      ) {
        window.location.replace("https://www.instagram.com/");
        return;
      }
    }

    // TikTok videos
    if (hostname.includes("tiktok.com")) {
      window.location.replace("https://www.google.com/");
    }
  }

  // Run immediately
  applyBlockingState();

  // Listen for changes to the enabled setting
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.enabled) {
      applyBlockingState();
    }
  });

  // Also handle YouTube's internal navigation (SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      applyBlockingState();
    }
  }).observe(document, { subtree: true, childList: true });
})();
