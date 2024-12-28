import { Mark } from '@tiptap/core';

const Highlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      HTMLAttributes: {},
      colors: ['yellow', 'pink', 'lightgreen', 'cyan'], // Customizable highlight colors
    };
  },

  addAttributes() {
    return {
      color: {
        default: 'yellow', // Default color
        parseHTML: (element) => element.style.backgroundColor || 'yellow',
        renderHTML: (attributes) => {
          return { style: `background-color: ${attributes.color};` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*="background-color"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { ...HTMLAttributes }, 0];
  },

  addCommands() {
    return {
      setHighlight:
        (color) =>
        ({ commands }) => {
          return commands.setMark(this.name, { color });
        },
      toggleHighlight:
        (color) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, { color });
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default Highlight;
