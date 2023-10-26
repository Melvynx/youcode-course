import Markdown from 'react-markdown';

export type MarkdownProseProps = {
  markdown: string;
};

export const MarkdownProse = (props: MarkdownProseProps) => {
  return (
    <Markdown className="prose dark:prose-invert lg:prose-lg">
      {props.markdown}
    </Markdown>
  );
};
