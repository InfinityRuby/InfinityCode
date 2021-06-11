import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/ruby/ruby';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight/styles/atelier-dune-dark.css';

let editor;

document.addEventListener('turbolinks:load', () => {
  const tabs = document.querySelector('.quest-button-wrapper');
  const tabButton = document.querySelectorAll('.quest-tab-button');
  const contents = document.querySelectorAll('.quest-content');

  if (tabs) {
    tabs.addEventListener('click', (event) => {
      const { id } = event.target.dataset;
      tabButton.forEach((btn) => {
        btn.classList.remove('active');
      });
      event.target.classList.add('active');

      contents.forEach((content) => {
        content.classList.remove('active');
      });
      const element = document.getElementById(id);
      element.classList.add('active');
      contents.forEach((content) => {
        content.classList.remove('active');
      });
      const content = document.getElementById(id);
      content.classList.add('active');
    });
  }
  if (document.querySelector('#editor')) {
    editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
      mode: 'ruby',
      theme: 'default',
      lineNumbers: true,
      smartIndent: true,
      lineWrapping: true,
      lineSeparator: '\n',
      matchBrackets: true,
      scrollbarStyle: null,
    });
    editor.setSize('500', '500');

    hljs.configure({
      tabReplace: '  ',
      classPrefix: 'hljs-',
      languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown'],
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

    const url = window.location.href;
    const loc = url.substring(url.lastIndexOf('/') + 1);
    fetch(`/api/v1/quests/${loc}`)
      .then((request) => request.json())
      .then((quest) => {
        editor.setValue(quest.problem);
        document.querySelector('.css-title').textContent = quest.title;
        document.querySelector('.css-level').textContent = quest.level;
        document.querySelector('.css-description').innerHTML = marked(quest.description);
        document.querySelector('.css-questImg').innerHTML = marked(quest.picture);

        const resetBtn = document.querySelector('.quest-footer-button:nth-child(1)');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            editor.setValue(quest.problem);
          });
        }
      });
  }
});

export default function getCode() {
  return editor.getValue();
}
