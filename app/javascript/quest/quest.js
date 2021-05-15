import "codemirror/lib/codemirror.js"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"
import "codemirror/mode/ruby/ruby.js"
import CodeMirror from "codemirror"

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector(".quest-buttonWrapper");
  const tabButton = document.querySelectorAll(".quest-tab-button");
  const contents = document.querySelectorAll(".quest-content");

  tabs.addEventListener("click", (event) => {
    console.log(event.target.dataset)
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
  })

  const editor = CodeMirror.fromTextArea(document.querySelector("#editor"),{
    mode: "ruby",
    theme: "default",
    lineNumbers: true,
    smartIndent: true,
    lineWrapping: true,
    lineSeparator: '\n',
    matchBrackets:true,
  })
  editor.setSize("100%","645")

  const resetbtn = document.querySelector(".quest-footer-button:nth-child(1)")
  resetbtn.addEventListener("click", (el)=>{
    editor.setValue('')
  })
})