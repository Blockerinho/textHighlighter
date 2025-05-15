
let evidenziatoreAttivo = false; //extensione turned on or not

document.getElementById("toggle").addEventListener("click", () => { //listener

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab || !tab.id) return; 

    //code to inject
    const codeToInject = `
      // tool not turned on
      if (!window.__highlighterActive) {
        window.__highlighterActive = true; // turn on
        window.__highlightStack = []; // Stack used to track the last highlight (used for undo operations)

        //highlight function
        window.__highlighterHandler = function () {
          const selection = window.getSelection(); // current selection
          if (!selection || selection.isCollapsed) return; 

          const selectedText = selection.toString().trim(); // trim of the selected text so it can be modified word by word
          if (selectedText.length === 0) return; 

          /* 
          already highlighted text has attribute data-highlighted=true, 
          from every altready highlighted text this checks if the current
          selection has already been highlighted, if that's true then
          it gets un-highlighted
          */
          const existing = Array.from(document.querySelectorAll("span[data-highlighted='true']"));
          const already = existing.find(el => el.textContent === selectedText);

          if (already) {
            const parent = already.parentNode;
            while (already.firstChild) {
              parent.insertBefore(already.firstChild, already);
            }
            parent.removeChild(already);
            selection.removeAllRanges(); // Removes the selection
            return;
          }

          // if not highlighted it gets highlighted
          const range = selection.getRangeAt(0);

          try {
            const highlight = document.createElement("span"); 
            highlight.style.backgroundColor = "gold"; 
            highlight.style.borderRadius = "2px"; 
            highlight.style.padding = "0 2px"; 
            highlight.setAttribute("data-highlighted", "true"); 

            range.surroundContents(highlight); 
            window.__highlightStack.push(highlight); 
            selection.removeAllRanges(); 
          } catch (e) {
            console.warn("Errore evidenziazione:", e); 
          }
        };

        //For enabling Ctrl+Z or Cmd+Z
        window.__undoHighlight = function () {
          const last = window.__highlightStack.pop(); 
          if (last && last.parentNode) {
            const parent = last.parentNode;
            while (last.firstChild) {
              parent.insertBefore(last.firstChild, last); 
            }
            parent.removeChild(last); 
          }
        };

        window.addEventListener("mouseup", window.__highlighterHandler);

        window.addEventListener("keydown", function (e) {
          if ((e.ctrlKey || e.metaKey) && e.key === "z") {
            e.preventDefault();
            window.__undoHighlight();
          }
        });

      } else {
        window.removeEventListener("mouseup", window.__highlighterHandler);
        window.__highlighterActive = false;
      }
    `;

    // injects the code
    chrome.tabs.executeScript(tab.id, { code: codeToInject }, (result) => {
      //error handler
      if (chrome.runtime.lastError) {
        console.error("Errore executeScript:", chrome.runtime.lastError.message);
      }
    });
  });
});

