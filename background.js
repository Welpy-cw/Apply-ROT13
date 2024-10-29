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
  messenger.tabs.executeScript(tab.id, {
    file: "apply-rot13-content-script.js",
  });
});

messenger.commands.onCommand.addListener(async (command, tab) => {
  if (
    command == "apply_rot13" &&
    ["content", "mail", "messageCompose", "messageDisplay"].includes(tab.type)
  ) {
    messenger.tabs.executeScript(tab.id, {
      file: "apply-rot13-content-script.js",
    });
  }
});
