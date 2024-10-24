function applyROT13(text) {
  function ROT13(match) {
    const charCode = match.charCodeAt(0);
    const codeOfA = charCode < 97 ? 65 : 97;
    return String.fromCharCode(((charCode - codeOfA + 13) % 26) + codeOfA);
  }
  return text.replace(/[A-Za-z]/g, ROT13);
}

const displayROT13 = "displayROT13";

messenger.menus.create({
  contexts: ["selection"],
  title: "Apply ROT13 and Display",
  id: displayROT13,
  visible: false,
});

messenger.menus.onShown.addListener((info, tab) => {
  console.log(info.pageUrl);
  if (!info.pageUrl) {
    return;
  }

  messenger.menus.update(displayROT13, {
    visible: true,
  });
  messenger.menus.refresh();
});

messenger.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId != displayROT13) {
    return;
  }
  console.log(info.selectionText);
  const params = new URLSearchParams({
    rot13text: applyROT13(info.selectionText),
  });

  messenger.windows.create({
    type: "popup",
    url: `displayROT13.html?${params}`,
    allowScriptsToClose: true,
    height: 256,
    width: 640,
  });
});
