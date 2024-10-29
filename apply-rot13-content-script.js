(() => {
  const selection = document.getSelection();
  if (selection.isCollapsed) {
    return;
  }

  if (selection.rangeCount != 1) {
    console.warn("Apply ROT13: Multi-range selections are not supported.");
    return;
  }

  const range = selection.getRangeAt(0);

  const applyROT13 = (text) => {
    function ROT13(match) {
      const charCode = match.charCodeAt(0);
      const codeOfA = charCode < 97 ? 65 : 97;
      return String.fromCharCode(((charCode - codeOfA + 13) % 26) + codeOfA);
    }
    return text.replace(/[A-Za-z]/g, ROT13);
  };

  const recurseChildNodes = (node) => {
    if (selection.containsNode(node, true) && node.nodeType == Node.TEXT_NODE) {
      const content = node.textContent;
      const startOffset = node == range.startContainer ? range.startOffset : 0;
      const endOffset =
        node == range.endContainer ? range.endOffset : content.length;
      node.textContent =
        content.substring(0, startOffset) +
        applyROT13(content.substring(startOffset, endOffset)) +
        content.substring(endOffset);
      return;
    }
    for (childNode of node.childNodes) {
      recurseChildNodes(childNode);
    }
  };

  recurseChildNodes(range.commonAncestorContainer);
  selection.empty();
})();
