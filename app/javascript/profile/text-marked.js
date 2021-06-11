import './github-markdown.css';
import hljs from 'highlight.js';
import marked from 'marked';
import 'styles/highlight/atelier-dune-dark.css';

hljs.configure({
  tabReplace: '  ',
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML', 'JavaScript', 'Ruby', 'PHP', 'Python', 'Markdown'],
});

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: (code) => hljs.highlightAuto(code).value,
});

document.addEventListener('turbolinks:load', () => {
  const text = document.querySelector('.profile-text');
  if (text) {
    text.innerHTML = marked(text.innerHTML);
  }
});