<p align="center">
  <img src="https://raw.githubusercontent.com/barc-dev/bark/main/icon.jpg" alt="bark logo" width="140" />
</p>

<h1 align="center">bark</h1>
<p align="center"><strong>A Programmer's Best Friend</strong></p>
<p align="center">
  <em>Always by your side — sniffing out errors, fetching answers, and never letting a bug sneak past.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/VS_Code-1.108+-2B2D42?style=flat-square&logo=visualstudiocode&logoColor=00D4AA" alt="VS Code 1.108+" />
  <img src="https://img.shields.io/badge/AI-Gemini_2.0_Flash-2B2D42?style=flat-square&logo=google&logoColor=4488FF" alt="Gemini 2.0 Flash" />
  <img src="https://img.shields.io/badge/License-MIT-2B2D42?style=flat-square&logoColor=00D4AA" alt="MIT License" />
</p>

---

A VS Code extension that detects errors in your active editor, explains them using Google Gemini AI, surfaces relevant documentation, and lets you save notes about fixes for future reference.

---

## Features

- **Real-time error detection** — Automatically reads the first diagnostic error in your active file and displays the file name, line number, and error message.
- **File switching support** — Error display updates instantly when you switch between files.
- **AI-powered explanations** — Click "Analyze with AI" to get a plain-language explanation of the error and suggested fixes, powered by Google Gemini 2.0 Flash.
- **Relevant documentation links** — AI analysis surfaces related documentation links via Google Search grounding, shown directly in the panel.
- **Note-taking system** — Save notes about how you fixed an error, including a description, code snippet, and custom tags.
- **Note management** — View your 3 most recent notes on the main panel, or browse all saved notes. Delete notes you no longer need.
- **Persistent storage** — Notes are saved globally in VS Code and persist across sessions and workspace changes.
- **Status bar toggle** — Click **bark** in the status bar to show or hide the panel at any time.

---

## Why bark?

Every programmer needs a best friend in the trenches. bark watches your code so you don't have to, alerting you the moment something goes wrong and fetching the answers you need — tail wagging, ready to help. Whether you're chasing a tricky TypeScript error or a cryptic runtime message, bark has your back.

---

## Requirements

- **VS Code** version `1.108.1` or higher
- An active internet connection (required for AI analysis and documentation search)

---

## Installation

### From the VS Code Marketplace

1. Open VS Code
2. Go to the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for **bark**
4. Click **Install**

The panel opens automatically when VS Code starts. You can also toggle it at any time using the **bark** button in the status bar.

### From a `.vsix` file

1. Download the `.vsix` file
2. Open the Extensions panel in VS Code
3. Click the `...` menu (top-right of the panel) → **Install from VSIX...**
4. Select the downloaded `.vsix` file

---

## Usage

### Main Panel

When you open a file that contains errors, bark gets to work immediately — the panel displays:

- The **file name** and **line number** of the first detected error
- The **error message**

Click **Analyze with AI** to send the error to Gemini 2.0 Flash. The panel will then show:

- An **AI Insight** — a plain-language explanation of the error and how to fix it
- **Relevant Documentation** — links to related docs and resources

### Saving a Note

1. Click **Save New Note** on the main panel
2. Fill in a description of what caused the error and how you fixed it
3. Optionally paste a code snippet showing the solution
4. Select one or more tags (React, TypeScript, CSS, Node, or a custom tag)
5. Click **Save Note**

### Viewing Notes

- The main panel shows your **3 most recent notes** along with the total saved count
- Click **View All** to see every saved note, where you can also delete individual notes
- Click **Back** to return to the main panel

### Toggling the Panel

Click the **bark** button in the bottom status bar to open or close the panel. You can also run the **Toggle Error Debugger Panel** command from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).

---

## Authors

<table>
  <tr>
    <td align="center"><a href="https://github.com/jonathancabera"><strong>Jonathan Cabera</strong></a></td>
    <td align="center"><a href="https://github.com/johnadms3"><strong>John Adams</strong></a></td>
    <td align="center"><a href="https://github.com/afnan185"><strong>Afnan Rahman</strong></a></td>
    <td align="center"><a href="https://github.com/Keshybb11"><strong>Kish Bosomtwe</strong></a></td>
  </tr>
</table>

---

## License

MIT License — Copyright (c) 2026 Jonathan Cabera

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
