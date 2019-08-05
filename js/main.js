/*把code写在#code和style标签里*/
function writeCss(prefix,code,fn){
  let domCode =document.querySelector('#code')
  let n =0
  let id=setInterval(()=>{
    n+=1
    styleTag.innerHTML = prefix + code.substring(0,n)
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css);
    domCode.scrollTop = domCode.scrollHeight
    if(n>=code.length){
      window.clearInterval(id)
      fn && fn.call()
    }
  },10)
}

function writeMarkdown(markdown,fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(()=>{
    n += 1
    domPaper.innerHTML = markdown.substring(0,n)
    domPaper.scrollTop = domPaper.scrollHeight
    if(n>=markdown.length){
      window.clearInterval(id)
      fn && fn.call()
    }
  },30)
}

var css1 = `/*
面试官你好，我是xxx
我将以动画的形式介绍自己
只用文字做自我介绍太单调了
*/

*{
transition: all 1s;
}
html{
  background:#eee;
  font-size:16px;
}
#code{
  border: 1px solid red;
  padding:17px;
}

/*代码高亮*/
.token.selector{
    color:#690;
}
.token.property{
    color:#905;
}
.token.function{
    color:#DD4A68;
}

/*加一个呼吸效果*/
#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/*做出一张白纸*/
#code-wrapper{
  width: 50%;
  left: 0;
  position: fixed;
  htight: 100%;
}
#paper > .content{
  display: block;
}
/*于是我可以在白纸上写字了，请看右边*/
`

var css2 = `
  /*接下来用一个优秀的库marked.js
  ba Markdown变成HTML
  */
`
var md = `
# 自我介绍

我叫赵昕
1992.12.19出生
自学前端两年
希望应聘前端开发岗位

# 技能介绍

熟悉JavaScript css

# 项目介绍

1. 番茄闹钟
2. vue造轮子

# 联系方式
- 手机 18802937983
- Email izhaox@hotmail.com

`

let css3 = `/*
  这就是我的会动的简历
  谢谢观看
*/`

writeCss('',css1,()=>{
  createPaper(()=>{
    writeMarkdown(md,()=>{
      writeCss(css1,css2,()=>{
        convertMarkdownToHtml(()=>{
          writeCss(css1+css2,css3,()=>{
            console.log('完成')
          })
        })
      })
    })
  })
})


function createPaper(fn){
  var paper = document.createElement('div')
  paper.id ='paper'
  
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

// function convertMarkdownToHtml(fn){
//   document.querySelector('#paper > .content').className = 'html markdown-body'
//   document.querySelector('#paper > .content').innerHTML = marked(md)
//   fn && fn.call()
// }

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}