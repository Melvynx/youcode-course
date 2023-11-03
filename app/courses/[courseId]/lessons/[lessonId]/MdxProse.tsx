import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';

export type MdxProseProps = {
  markdown: string;
};

export const MdxProse = (props: MdxProseProps) => {
  return (
    <article className="prose m-auto dark:prose-invert xl:prose-xl">
      <MDXRemote
        options={{
          mdxOptions: {
            // @ts-expect-error
            rehypePlugins: [rehypePrism],
          },
        }}
        source={props.markdown}
      />
    </article>
  );
};
