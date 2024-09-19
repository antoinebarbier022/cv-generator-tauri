import ReactDOM from 'react-dom/client';
import App from './app/App';

import { invoke } from '@tauri-apps/api/core';
import { getCurrentWindow } from "@tauri-apps/api/window";

enum LogLevel {
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,

}

function forwardConsole(
  fnName: 'log' | 'debug' | 'info' | 'warn' | 'error' | 'trace',
  level: number
) {
  const original = console[fnName];
  console[fnName] = (message) => {
    original(message);
    invoke('plugin:log|log', {level, message: JSON.stringify(message, null, 2), location: "window:"+ getCurrentWindow().label})
  };
}

forwardConsole('trace', LogLevel.TRACE);
forwardConsole('log', LogLevel.DEBUG);
forwardConsole('debug', LogLevel.DEBUG);
forwardConsole('info', LogLevel.INFO);
forwardConsole('warn', LogLevel.WARN);
forwardConsole('error', LogLevel.ERROR);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
