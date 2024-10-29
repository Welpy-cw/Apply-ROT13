const applyROT13 = "applyROT13";

messenger.menus.create({
  contexts: ["selection"],
  title: "Apply ROT13",
  id: applyROT13,
  visible: true,
});

messenger.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId != applyROT13) {
    return;
  }
  messenger.tabs.executeScript({
    file: "apply-rot13-content-script.js",
  });
});
