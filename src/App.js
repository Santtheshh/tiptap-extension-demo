import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from './highlight';
import TextStyle from '@tiptap/extension-text-style'; // Ensure TextStyle is imported
import FontFamily from '@tiptap/extension-font-family'; // Ensure FontFamily is imported
import Sidebar from './Sidebar';
import './App.css';

const App = () => {
  const [customColor, setCustomColor] = useState('#ffeb3b'); // Default color
  const [selectedFont, setSelectedFont] = useState('Arial'); // Default font

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle, // Include TextStyle here
      FontFamily.configure({
        types: ['textStyle'], // Configure FontFamily to work with TextStyle
      }),
    ],
    content: 'Select text and apply custom highlights and font styles!',
  });

  if (!editor) {
    return null;
  }

  const applyCustomColor = () => {
    editor.chain().focus().setHighlight(customColor).run();
  };

  const applyFontFamily = (font) => {
    setSelectedFont(font);
    editor.chain().focus().setFontFamily(font).run();
  };
  const downloadText = () => {
    const content = editor.getHTML(); // Get the editor's content as HTML
    const blob = new Blob([content], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'edited-content.html';
    link.click();
  };

  return (
    <div className="app-container">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="editor-container">
        {/* Toolbar */}
        <div className="toolbar">
          <h3>Editor Controls</h3>
          
          {/* Font Family Selector */}
          <div className="font-family-selector">
            <label htmlFor="fontFamily">Font Family:</label>
            <select
              id="fontFamily"
              value={selectedFont}
              onChange={(e) => applyFontFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>

          {/* Predefined Color Buttons */}
          <div className="predefined-colors">
            <button
              className="highlight-btn yellow"
              onClick={() => editor.chain().focus().toggleHighlight('yellow').run()}
            >
              Yellow
            </button>
            <button
              className="highlight-btn pink"
              onClick={() => editor.chain().focus().toggleHighlight('pink').run()}
            >
              Pink
            </button>
            <button
              className="highlight-btn lightgreen"
              onClick={() => editor.chain().focus().toggleHighlight('lightgreen').run()}
            >
              Light Green
            </button>
            <button
              className="highlight-btn cyan"
              onClick={() => editor.chain().focus().toggleHighlight('cyan').run()}
            >
              Cyan
            </button>
          </div>

          {/* Custom Color Picker */}
          <div className="custom-color">
            <label htmlFor="colorPicker">Custom Color:</label>
            <input
              type="color"
              id="colorPicker"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
            />
            <button className="apply-btn" onClick={applyCustomColor}>
              Apply
            </button>
          </div>

          {/* Remove Highlight Button */}
          <button className="unset-btn" onClick={() => editor.chain().focus().unsetHighlight().run()}>
            Remove Highlight
          </button>
          <button className="download-btn" onClick={downloadText}>
            Download Text
          </button>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} className="editor" />
      </div>
    </div>
  );
};

export default App;

