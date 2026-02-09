// options.js

// Load saved setting
chrome.storage.sync.get(["enabled"], (result) => {
  document.getElementById("enabled").checked = result.enabled ?? true;
});

// Save on change
document.getElementById("enabled").addEventListener("change", (e) => {
  chrome.storage.sync.set({ enabled: e.target.checked });
});
