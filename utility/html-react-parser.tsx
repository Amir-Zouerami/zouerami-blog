import {
  HTMLReactParserOptions,
  DOMNode,
  Element,
  Text,
  domToReact,
} from 'html-react-parser';

import BlogHeading from '@/components/Blog/BlogHeading';
import Attention from '@/components/Blog/Attention';
import { Code } from 'bright';
import BlogPostImage from '@/components/Blog/BlogPostImage';

// ----------------------------- Helper Filter Functions ------------------------------------------------

// Check if the node is a <p> tag with the class "BLOG_ALERT"
const isBlogAlertParagraph = (node: DOMNode): node is Element => {
  return (
    node.type === 'tag' &&
    node.name === 'p' &&
    node.attribs &&
    node.attribs.class === 'BLOG_ALERT'
  );
};

// Check if the node is a <p> tag with the class "BLOG_NOTICE"
const isBlogNoticeParagraph = (node: DOMNode): node is Element => {
  return (
    node.type === 'tag' &&
    node.name === 'p' &&
    node.attribs &&
    node.attribs.class === 'BLOG_NOTICE'
  );
};

// Check if the node is an <h2> tag
const isH2Tag = (node: DOMNode): node is Element => {
  return node instanceof Element && node.type === 'tag' && node.name === 'h2';
};

// Check if the node is an <h3> tag
const isH3Tag = (node: DOMNode): node is Element => {
  return node instanceof Element && node.type === 'tag' && node.name === 'h3';
};

// Check if the node is a <code> tag
const isCodeElement = (node: DOMNode): node is Element => {
  return node.type === 'tag' && node.name === 'code';
};

// Check if the node is a image <Figure> with caption
const isImageFigure = (node: DOMNode): node is Element => {
  return (
    node.type === 'tag' &&
    node.name === 'p' &&
    node.attribs.class === 'BLOG_IMAGE_FIGURE'
  );
};

// ----------------------------- Parse Options ------------------------------------------------

export const parseOptions: HTMLReactParserOptions = {
  replace: node => {
    // ---------> REPLACE THE H2 TAG
    if (isH2Tag(node) || isH3Tag(node)) {
      if (node.firstChild instanceof Element) {
        const { id, href } = node.firstChild.attribs;
        const anchorTag = node.firstChild.firstChild;

        if (anchorTag instanceof Text && anchorTag.data) {
          return (
            // Absolute God Awful Typing, compliment of the package author @see: https://github.com/remarkablemark/html-react-parser/issues/1126#issuecomment-1784188447
            <BlogHeading id={id} href={href} as={node.name}>
              {anchorTag.data}
            </BlogHeading>
          );
        }
      }
    }

    // ---------> DETECT ALERT [BLOG_ALERT]
    if (isBlogAlertParagraph(node)) {
      const pHasChildren = node.firstChild;

      if (pHasChildren) {
        return (
          <Attention type="ALERT">
            {/* awful type assertion thanks to html-react-parser. @see: https://github.com/remarkablemark/html-react-parser/issues/1126#issuecomment-1784188447 */}
            {domToReact(node.children as DOMNode[])}
          </Attention>
        );
      }
    }

    // ---------> DETECT NOTICE [BLOG_NOTICE]
    if (isBlogNoticeParagraph(node)) {
      const pHasChildren = node.firstChild;

      if (pHasChildren) {
        return (
          <Attention type="NOTE">
            {/* awful type assertion thanks to html-react-parser. @see: https://github.com/remarkablemark/html-react-parser/issues/1126#issuecomment-1784188447 */}
            {domToReact(node.children as DOMNode[])}
          </Attention>
        );
      }
    }

    // ---------> DISPLAY CODE WITH `BRIGHT` PACKAGE
    if (isCodeElement(node)) {
      const code = node.firstChild;
      const { 'data-lang': lang, 'data-title': title } = node.attribs;

      if (code instanceof Text && code.data && lang) {
        return (
          <div className="ltr mx-auto lg:max-w-[90%]">
            <Code lang={lang} title={title} theme={'one-dark-pro'}>
              {code.data}
            </Code>
          </div>
        );
      }
    }

    // ---------> SET STYLE FOR IMAGE <Figure> AND ITS CAPTION
    if (isImageFigure(node)) {
      const image = node.firstChild as Element;
      const { src, alt } = image.attribs;

      return <BlogPostImage href={src} caption={alt} />;
    }
  },
};
