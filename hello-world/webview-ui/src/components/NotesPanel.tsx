import React from "react";

export interface Note {
  error: {fileName: string; lineNumber: number; message: string};
  description: string;
  codeSnippet: string;
  tags: string[];
}

interface NotesPanelProps {
  notes: Note[];
  totalCount: number;
  onSaveNew: () => void;
  onViewAll: () => void;
  onDelete: (index: number) => void;
}

export default function NotesPanel({
  notes,
  totalCount,
  onSaveNew,
  onViewAll,
  onDelete,
}: NotesPanelProps) {
  return (
    <div className="notes-panel">
      <span className="notes-header">
        <strong>RECENT NOTES({totalCount} saved)</strong>
      </span>
      {notes.length === 0 ? (
        <span className="notes-empty"></span>
      ) : (
        notes.map((note, index) => (
          <div key={index} className="note-card">
            <div className="note-error">
              {note.error.fileName}:{note.error.lineNumber} - {note.error.message}
            </div>
            <div className="note-description">{note.description}</div>
            <pre className="note-code">{note.codeSnippet}</pre>
            <div className="note-footer">
              <div className="note-tags">
                {note.tags.map((tag, i) => (
                  <span key={i} className="note-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="note-delete-btn"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="notes-buttons">
        <button className="sf-btn sf-btn-primary" onClick={onSaveNew}>
          Save New Note
        </button>
        <button className="sf-btn sf-btn-secondary" onClick={onViewAll}>
          View All
        </button>
      </div>
    </div>
  );
}
