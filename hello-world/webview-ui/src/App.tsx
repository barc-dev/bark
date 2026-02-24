import { useState, useEffect } from "react";
import { vscode } from "./utilities/vscode";
import "./App.css";

import ErrorMessage from "./components/ErrorMessage";
import ErrorLocation from "./components/ErrorLocation";
import ErrorPanelHeader from "./components/ErrorPanelHeader";
import AiInsight from "./components/AiInsight";
import NotesPanel from "./components/NotesPanel";
import RelevantDocs from "./components/RelevantDocs";
import SaveFixHeader from "./components/SaveFixHeader";
import FormField from "./components/FormField";
import TagSelector from "./components/TagSelector";
import SaveFixActions from "./components/SaveFixActions";

import { Note } from "./components/NotesPanel";

interface errorDataTypes {
  command: string;
  fileName: string;
  lineNumber: number;
  message: string;
}

export default function App() {
  const [errorData, setErrorData] = useState<errorDataTypes | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [docs, setDocs] = useState<{ title: string; url: string }[] | null>(
    null,
  );
  const [view, setView] = useState<"mainPanel" | "saveNotePanel">("mainPanel");
  const [fixDescription, setFixDescription] = useState<string>("");
  const [fixCodeSnippet, setFixCodeSnippet] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.command === "sendErrorMessage") {
        setAiInsight(null);
        setDocs(null);
        if (!e.data.text) {
          setErrorData(e.data);
        } else {
          setErrorData({
            command: "sendErrorMessage",
            fileName: "",
            lineNumber: 0,
            message: "No errors found in the current file.",
          });
        }
      }
      if (e.data.command === "sendAiInsight") {
        setAiInsight(e.data.message);
      }
      if (e.data.command === "sendAllNotes") {
        setNotes(e.data.notes);
      }
      if (e.data.command === "sendRelevantDocs") {
        setDocs(e.data.docs);
      }
    };
    window.addEventListener("message", handleMessage);
    vscode.postMessage({ command: "ready" });
    vscode.postMessage({ command: "getNotes" });
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleClose = () => alert("Panel closed");

  if (view === "saveNotePanel") {
    return (
      <div className="error-panel">
        <SaveFixHeader fileName={errorData?.fileName ?? ""} />
        <FormField
          label="Description"
          placeholder="What did you do to fix this?"
          value={fixDescription}
          onChange={setFixDescription}
        />
        <FormField
          label="Code Snippet"
          placeholder="Paste the fix here..."
          value={fixCodeSnippet}
          onChange={setFixCodeSnippet}
        />
        <TagSelector
          defaultTags={["React", "TypeScript", "CSS", "Node"]}
          selectedTags={new Set(selectedTags)}
          onToggle={(tag) =>
            setSelectedTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag],
            )
          }
          onAddCustom={(tag) => setSelectedTags((prev) => [...prev, tag])}
          onRemoveCustom={(tag) =>
            setSelectedTags((prev) => prev.filter((t) => t !== tag))
          }
        />
        <SaveFixActions
          onSave={() => {
            vscode.postMessage({
              command: "saveNote",
              note: {
                error: {
                  fileName: errorData?.fileName ?? "",
                  lineNumber: errorData?.lineNumber ?? 0,
                  message: errorData?.message ?? "",
                },
                description: fixDescription ?? "",
                codeSnippet: fixCodeSnippet ?? "",
                tags: selectedTags ?? [],
              },
            });
            vscode.postMessage({ command: "getNotes" });
            setView("mainPanel");
            setFixDescription("");
            setFixCodeSnippet("");
            setSelectedTags([]);
          }}
          onClose={() => setView("mainPanel")}
          saveDisabled={false}
        />
      </div>
    );
  }

  return (
    <div className="error-panel">
      <ErrorPanelHeader
        panelTitle="Solution found in your notes"
        onClose={handleClose}
      />
      <ErrorLocation
        fileName={errorData?.fileName ?? ""}
        lineNumber={errorData?.lineNumber ?? 0}
      />
      <ErrorMessage message={errorData?.message ?? ""} />
      <div className="save-fix-actions">
        <button
          className="sf-btn sf-btn-primary"
          onClick={() => vscode.postMessage({ command: "analyzeError" })}
        >
          Analyze code and find relevant docs
        </button>
      </div>
      {aiInsight && (
        <div className="ai-insight-container">
          <AiInsight aiInsight={aiInsight} />
          <RelevantDocs docs={docs ?? []} />
        </div>
      )}

      <NotesPanel
        notes={notes}
        onSaveNew={() => setView("saveNotePanel")}
        onViewAll={() => alert("View all notes")}
        onDelete={(index) => {
          vscode.postMessage({ command: "deleteNote", index });
          vscode.postMessage({ command: "getNotes" });
        }}
      />
    </div>
  );
}
