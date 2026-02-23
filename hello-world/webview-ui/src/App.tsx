import { useState, useEffect } from "react";
import { vscode } from "./utilities/vscode";
import "./App.css";

//components
import ErrorMessage from "./components/ErrorMessage"; //props: message
import ErrorLocation from "./components/ErrorLocation"; //props: fileName, lineNumber
import ErrorPanelHeader from "./components/ErrorPanelHeader"; //props: panelTitle, onClose
import AiInsight from "./components/AiInsight"; //props: aiInsight
import NotesPanel from "./components/NotesPanel"; //props: notes, onSaveNew, onViewAll
import RelevantDocs from "./components/RelevantDocs"; //props: docs
import SaveFixHeader from "./components/SaveFixHeader"; //props: headerTitle
import FormField from "./components/FormField"; //props: label, value, onChange
import TagSelector from "./components/TagSelector"; //props: availableTags, selectedTags, onChange
import SaveFixActions from "./components/SaveFixActions"; //props: onSave, onCancel

//type interfaces
import { Note } from "./components/NotesPanel";

interface errorDataTypes {
  command: string;
  fileName: string;
  lineNumber: number;
  message: string;
}

export default function App() {
  //errorData variable holds onto error messages from useEffect
  const [errorData, setErrorData] = useState<errorDataTypes | null>(null);

  //notes variable holds onto all notes in global storage
  const [notes, setNotes] = useState<Note[]>([]);

  //aiInsight variable holds onto AI insights from useEffect
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const [docs, setDocs] = useState<{ title: string; url: string }[] | null>(
    null,
  );

  //lets you swap between the main error panel and the save fix panel
  const [view, setView] = useState<"mainPanel" | "saveNotePanel">("mainPanel");

  //fields within the save note panel
  const [searchText, setSearchText] = useState<string>("");

  //all of the use state variables for the fields that the user has to fill out
  const [selectedErrorKey, setSelectedErrorKey] = useState<string>("");
  const [fixDescription, setFixDescription] = useState<string>("");
  const [fixCodeSnippet, setFixCodeSnippet] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      console.log(e.data);
      if (e.data.command === "sendErrorMessage") {
        setErrorData(e.data);
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
  const handleApply = () => alert("Apply button clicked");
  const handleDismiss = () => alert("Dismiss button clicked");

  //there is a button that has an event handler to swap to the to the save note panel..
  //when the view's state switches, it returns new JSX which is the saveNotePanel interface that Kish implemented
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
            setSearchText("");
            setSelectedErrorKey("");
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
      <AiInsight aiInsight={aiInsight ?? "Analyzing error..."} />
      <RelevantDocs docs={docs ?? []} />
      <NotesPanel
        notes={notes}
        onSaveNew={() => setView("saveNotePanel")}
        onViewAll={() => alert("View all notes")}
      />
    </div>
  );
}
