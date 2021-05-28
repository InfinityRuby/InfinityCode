import "codemirror/lib/codemirror.js"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"
import "codemirror/mode/ruby/ruby.js"
import CodeMirror from "codemirror"
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight/styles/atelier-dune-dark.css'


document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector(".quest-buttonWrapper");
  const tabButton = document.querySelectorAll(".quest-tab-button");
  const contents = document.querySelectorAll(".quest-content");
  const submit = document.querySelector('.quest-footer-button:nth-child(2)')

  if (tabs) {
    tabs.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    tabButton.forEach(btn => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");

    contents.forEach(content => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
    contents.forEach(content => {
      content.classList.remove("active");
    });
    const content = document.getElementById(id);
    content.classList.add("active");
  }) 
}
  if (document.querySelector("#editor")) {  
    const editor = CodeMirror.fromTextArea(document.querySelector("#editor"),{
      mode: "ruby",
      theme: "default",
      lineNumbers: true,
      smartIndent: true,
      lineWrapping: true,
      lineSeparator: '\n',
      matchBrackets:true,
      scrollbarStyle: null
    })
    editor.setSize("500","500")

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

    fetch('/api/v1/quests')
      .then(request => request.json())
      .then(posts => {
        const firstPost = posts[0]
        editor.setValue(firstPost.problem)   
        document.querySelector('.css-title').textContent = firstPost.title
        document.querySelector('.css-level').textContent = firstPost.level
        document.querySelector('.css-description').innerHTML = marked(firstPost.description)
        document.querySelector('.css-picture').innerHTML = marked(firstPost.picture)
    })
  }
        const resetbtn = document.querySelector(".quest-footer-button:nth-child(1)")
        if (resetbtn) {resetbtn.addEventListener("click", (el)=>{
          editor.setValue(firstPost.problem)
          })
        }
})