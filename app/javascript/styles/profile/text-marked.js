import './github-markdown.css'
import hljs from 'highlight.js'
import marked from 'marked'
import '../highlight/atelier-dune-dark.css'

const html = marked('# Marked in Node.js\n\nRendered by **marked**.');
hljs.configure({
  tabReplace: '  ',
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown']
})

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
})

document.addEventListener("turbolinks:load", function() {
  const text = document.querySelector('.profile-text');
  text.innerHTML = marked(text.innerHTML);
});
