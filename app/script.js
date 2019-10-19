const fs = require('fs');

// NAWIGACJA **************************
let nav = false;
function toggleNav(){
    if (nav == false) {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        nav = true;
        document.getElementById("hamburger").innerHTML = "&times;";
    } else {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        nav = false;
        document.getElementById("hamburger").innerHTML = "&#9776;";
    }
}
// KONIEC NAWIGACJI *******************

// EDYTOR *****************************
var simplemde = new SimpleMDE({
	autofocus: true,
	autosave: {
		enabled: true,
		uniqueId: "MyUniqueID",
		delay: 1000,
	},
	blockStyles: {
		bold: "__",
		italic: "_"
	},
	element: document.getElementById("MyID"),
	forceSync: true,
	hideIcons: ["guide", "heading"],
	indentWithTabs: false,
	initialValue: "",
	insertTexts: {
		horizontalRule: ["", "\n\n-----\n\n"],
		image: ["![](http://", ")"],
		link: ["[", "](http://)"],
		table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
	},
	lineWrapping: true,
	parsingConfig: {
		allowAtxHeaderWithoutSpace: true,
		strikethrough: false,
		underscoresBreakWords: true,
	},
	placeholder: "Type here...",
	previewRender: function(plainText) {
		return customMarkdownParser(plainText); // Returns HTML from a custom parser
	},
	previewRender: function(plainText, preview) { // Async method
		setTimeout(function(){
			preview.innerHTML = customMarkdownParser(plainText);
		}, 250);

		return "Loading...";
	},
	promptURLs: true,
	renderingConfig: {
		singleLineBreaks: false,
		codeSyntaxHighlighting: true,
	},
	shortcuts: {
		drawTable: "Cmd-Alt-T"
	},
	showIcons: ["code", "table"],
	spellChecker: false,
	status: false,
	// status: ["autosave", "lines", "words", "cursor"], // Optional usage
	status: ["words", {
		className: "characters",
		defaultValue: function(el) {
			this.keystrokes = 0;
			el.innerHTML = "0 characters";
		},
		onUpdate: function(el) {
			el.innerHTML = ++this.keystrokes;
		}
	}], // Another optional usage, with a custom status bar item that counts keystrokes
	styleSelectedText: false,
	tabSize: 4,
	toolbar: false, //["bold", "italic", "heading", "|", "preview"],
	toolbarTips: false,
});

// KONIEC EDYTORA *********************

// SAVE FILE **************************

function saveFile () {
    let dane = simplemde.value();// document.getElementById('MyID').value;
    fs.writeFile('temp.md', dane, (err) => {
        if (err) console.log(err);
        console.log('Zapisane!');
    });
}

// OPEN FILE **************************

function openFile () {
    fs.readFile("temp2.md", function(err, buf) {
        simplemde.value(buf.toString());
    });
};
