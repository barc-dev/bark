import * as vscode from "vscode";
import { ErrorDebuggerPanel } from "./panels/ErrorDebuggerPanel";
import GlobalStorageService from "./backend/GlobalStorageService";

export function activate(context: vscode.ExtensionContext) {
  const globalStorageService = new GlobalStorageService(context);
  ErrorDebuggerPanel.render(context.extensionUri, globalStorageService, context);

  const analyzeCommand = vscode.commands.registerCommand(
    "error-debugger.analyze",
    () => {
      ErrorDebuggerPanel.render(context.extensionUri, globalStorageService, context);
    },
  );

  context.subscriptions.push(analyzeCommand);
}

export function deactivate() {}
