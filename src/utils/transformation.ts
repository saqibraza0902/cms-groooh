import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import he from "he";

export function addCustomStyling(content: string) {
  content = content.replace(
    /<pre id="isPasted">/g,
    '<pre class="custom-styling">'
  );
  content = content.replace(/<pre>/g, '<pre class="custom-styling">');
  content = content.replace(
    /<blockquote>/g,
    '<blockquote class="block-styling"><div class="quote-styling"><img src="/icons/icon-quotes.svg" alt="" class="quote-img" /></div>'
  );
  content = content.replace(
    /<p[^>]*>(\s*<img[^>]*>\s*)<\/p>/g,
    '<p style="width: 100%;"><img style="width: 100%;"$1</p>'
  );
  let index = 0;
  content = content.replace(/<h3(\s[^>]*)?>/g, (match, attributes) => {
    index++;
    return `<h3 id="section-${index}"${attributes || ""}>`;
  });

  content = content.replace(
    /<a\s+(?=[^>]*class="iframe")[^>]*href="([^"]*)"[^>]*>.*?<\/a>/g,
    function (match, href) {
      var src = getHrefFromAnchor(match);
      var youtubelinks = transformYouTubeLink(src);
      var googledrivelink = transformToPreviewLink(youtubelinks);
      return (
        '<div class="i-frame-div"><iframe class="iframe-video" allowfullscreen width="420" height="315" src=" ' +
        googledrivelink +
        ' "></iframe></div>'
      );
    }
  );

  content = content.replace(
    /<pre class="custom-styling">([\s\S]*?)<\/pre>/g,
    function (match, codeContent) {
      const decodeContent = decodeHTML(codeContent);
      const containsHTML = /<([a-z]+)(?![^>]*\/>)[^>]*>/i.test(decodeContent);
      const containsCSS =
        !containsHTML && /^\s*\.[a-zA-Z_][\w-]*\s*\{/.test(decodeContent);

      let additionalClass = "";
      if (containsHTML) {
        codeContent = hljs.highlight(decodeContent, {
          language: "xml",
        }).value;
      } else if (containsCSS) {
        additionalClass = "css-content";
        // Apply colorization for CSS content
        codeContent = codeContent
          // Class names (e.g., .card)
          .replace(
            /(\.[a-zA-Z_][\w-]*)/g,
            '<span class="css-class-name">$1</span>'
          )
          // CSS properties (e.g., border, padding, etc.)
          .replace(
            /([a-zA-Z-]+)(\s*:\s*)/g,
            '<span class="css-property">$1</span>$2'
          )
          // CSS values (e.g., 1px solid #ccc)
          .replace(
            /(:\s*)([^;]+)(;)/g,
            '$1<span class="css-value">$2</span>$3'
          );
      } else {
        codeContent = hljs.highlight(decodeContent, {
          language: "javascript",
        }).value;
      }

      return `<pre class="custom-styling"><code class="${additionalClass}">${codeContent}</code></pre>`;
    }
  );

  return content;
}
function decodeHTML(str: string) {
  return he.decode(str);
}
const getHrefFromAnchor = (anchorTagString: any) => {
  const regex = /href="(.*?)"/g;
  const match = regex.exec(anchorTagString);
  if (match) {
    return match[1];
  } else {
    return anchorTagString;
  }
};
const transformYouTubeLink = (link: any) => {
  var regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:.+)?$/;
  if (regExp.test(link)) {
    var match = link.match(regExp);
    if (match && match[1]) {
      var videoId = match[1];
      return "https://www.youtube.com/embed/" + videoId;
    } else {
      return link;
    }
  } else {
    return link;
  }
};
const transformToPreviewLink = (driveLink: any) => {
  const regex = /^https:\/\/drive\.google\.com\/file\/d\//;
  if (regex.test(driveLink)) {
    const match = driveLink.match(/\/d\/([^/]+)/);
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  } else {
    return driveLink;
  }
};
