import "./styles.css";
import styled from "styled-components";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import LinkBase from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { getMarkRange } from "@tiptap/core";
import { Plugin, TextSelection } from "prosemirror-state";

const ExtendedLinkExtension = LinkBase.configure({
  openOnClick: false,
  linkOnPaste: true
}).extend({
  inclusive: false,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick(view, pos) {
            const range = getMarkRange(
              view.state.doc.resolve(pos),
              view.state.schema.marks.link
            );
            if (!range) return false;

            const $start = view.state.doc.resolve(range.from);
            const $end = view.state.doc.resolve(range.to);
            const transaction = view.state.tr.setSelection(
              new TextSelection($start, $end)
            );
            view.dispatch(transaction);

            return true;
          }
        }
      })
    ];
  }
});
const App: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Code,
      CodeBlock,
      Heading,
      Color,
      Highlight,
      ExtendedLinkExtension,
      Placeholder,
      TaskList,
      TaskItem
    ]
  });
  return (
    <EditorWrapper
      onClick={() => {
        editor?.commands.focus();
      }}
    >
      <EditorContent editor={editor} />
    </EditorWrapper>
  );
};

const EditorWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  .ProseMirror:focus {
    outline: none;
  }
`;

export default App;
