import {
  HTMLReactParserOptions,
  DOMNode,
  Element,
  Text,
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
    if (isH2Tag(node)) {
      if (node.firstChild instanceof Element) {
        const { id, href } = node.firstChild.attribs;
        const anchorTag = node.firstChild.firstChild;

        if (anchorTag instanceof Text && anchorTag.data) {
          return (
            // Absolute God Awful Typing, compliment of the package author @see: https://github.com/remarkablemark/html-react-parser/issues/1126#issuecomment-1784188447
            <BlogHeading id={id} href={href}>
              {anchorTag.data}
            </BlogHeading>
          );
        }
      }
    }

    // ---------> DETECT ALERT [BLOG_ALERT]
    if (isBlogAlertParagraph(node)) {
      const pTagText = node.firstChild;

      if (pTagText instanceof Text && pTagText.data) {
        return <Attention type="ALERT">{pTagText.data}</Attention>;
      }
    }

    // ---------> DETECT NOTICE [BLOG_NOTICE]
    if (isBlogNoticeParagraph(node)) {
      const pTagText = node.firstChild;

      if (pTagText instanceof Text && pTagText.data) {
        return <Attention type="NOTE">{pTagText.data}</Attention>;
      }
    }

    // ---------> DISPLAY CODE WITH `BRIGHT` PACKAGE
    if (isCodeElement(node)) {
      const code = node.firstChild;
      const { 'data-lang': lang, 'data-title': title } = node.attribs;

      if (code instanceof Text && code.data) {
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
