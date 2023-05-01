chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create({ periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "countdown") {
    // Your countdown logic here
  }
});