export type EditorProps = {
  title: string;
  content: string;
};

export function Editor({ title, content }: EditorProps) {
  return (
    <div className="join join-vertical h-full w-full">
      <div className="join-item border-base-content bg-base-300 border px-3 py-2 text-base">{title}</div>
      <textarea
        data-disable-dnd
        className="textarea border-base-content bg-base-300 join-item h-full w-full border text-base focus:outline-none"
        placeholder="New Note"
        value={content}
      />
    </div>
  );
}
