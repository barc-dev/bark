import * as vscode from "vscode";

interface SavedNote {
  error: { fileName: string; lineNumber: number; message: string };
  description: string;
  codeSnippet: string;
  tags: string[];
}

export default class GlobalStorageService {
  private globalState: vscode.Memento;

  constructor(context: vscode.ExtensionContext) {
    this.globalState = context.globalState;
  }

  getAllNotes = (): SavedNote[] => {
    return this.globalState.get<SavedNote[]>("errorDebugger.notes") || [];
  };

  saveNote = async (note: SavedNote): Promise<void> => {
    const notesList = this.getAllNotes();
    notesList.push(note);
    await this.globalState.update("errorDebugger.notes", notesList);
  };

  deleteNote = async (index: number): Promise<void> => {
    const noteList = this.getAllNotes();
    const filteredNotes = noteList.filter((_, i) => i !== index)
    await this.globalState.update("errorDebugger.notes", filteredNotes);
  };
}
