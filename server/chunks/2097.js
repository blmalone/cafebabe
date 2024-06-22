"use strict";exports.id=2097,exports.ids=[2097],exports.modules={82097:(e,n,t)=>{t.r(n),t.d(n,{default:()=>d});var a=t(8764),s=t(77893),r=t(82753),u=t(9681),i=t(68523),c=t(17725);let m=Object.freeze({displayName:"Ruby Haml",fileTypes:["haml","html.haml"],foldingStartMarker:"^\\s*([-%#\\:\\.\\w\\=].*)\\s$",foldingStopMarker:"^\\s*$",name:"haml",patterns:[{begin:"^(\\s*)==",contentName:"string.quoted.double.ruby",end:"$\\n*",patterns:[{include:"#interpolated_ruby"}]},{begin:"^(\\s*):ruby",end:"^(?!\\1\\s+|$\\n*)",name:"source.ruby.embedded.filter.haml",patterns:[{include:"source.ruby"}]},{captures:{1:{name:"punctuation.definition.prolog.haml"}},match:"^(!!!)($|\\s.*)",name:"meta.prolog.haml"},{begin:"^(\\s*):javascript",end:"^(?!\\1\\s+|$\\n*)",name:"js.haml",patterns:[{include:"source.js"}]},{begin:"^(\\s*)%script",end:"^(?!\\1\\s+|$\\n*)",name:"js.inline.haml",patterns:[{include:"source.js"}]},{begin:"^(\\s*):ruby$",end:"^(?!\\1\\s+|$\\n*)",name:"source.ruby.embedded.filter.haml",patterns:[{include:"source.ruby"}]},{captures:{1:{name:"punctuation.section.comment.haml"}},match:"^(\\s*)(\\/\\[[^\\]].*?$\\n?)",name:"comment.line.slash.haml"},{begin:"^(\\s*)(\\-\\#|\\/|\\-\\s*\\/\\*+)",beginCaptures:{2:{name:"punctuation.section.comment.haml"}},end:"^(?!\\1\\s+|\\n)",name:"comment.block.haml",patterns:[{include:"text.haml"}]},{begin:"^\\s*(?:((%)([-\\w:]+))|(?=\\.|#))",captures:{1:{name:"meta.tag.haml"},2:{name:"punctuation.definition.tag.haml"},3:{name:"entity.name.tag.haml"}},end:"$|(?!\\.|#|\\{|\\(|\\[|&amp;|=|-|~|!=|&=|/)",patterns:[{begin:"==",contentName:"string.quoted.double.ruby",end:"$\\n?",patterns:[{include:"#interpolated_ruby"}]},{captures:{1:{name:"entity.other.attribute-name.class"}},match:"(\\.[\\w\\-\\:]+)",name:"meta.selector.css"},{captures:{1:{name:"entity.other.attribute-name.id"}},match:"(#[\\w-]+)",name:"meta.selector.css"},{begin:"(?<!\\#)\\{(?=.*(,|(do)|\\{|\\}|\\||(\\#.*)|\\R)\\s*)",end:"\\s*\\}(?!\\s*\\,)(?!\\s*\\|)(?!\\#\\{.*\\})",name:"meta.section.attributes.haml",patterns:[{include:"source.ruby"},{include:"#continuation"},{include:"#rubyline"}]},{begin:"\\(",end:"\\)",name:"meta.section.attributes.plain.haml",patterns:[{match:"([\\w-]+)",name:"constant.other.symbol.ruby"},{match:"\\=",name:"punctuation"},{include:"#variables"},{begin:'"',end:'"',name:"string.quoted.double.ruby",patterns:[{match:"\\\\(x\\h{2}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)",name:"constant.character.escape.ruby"},{include:"#interpolated_ruby"}]},{include:"#interpolated_ruby"}]},{begin:"\\[(?=.+(,|\\[|\\]|\\||(\\#.*))\\s*)",end:"\\s*\\](?!.*(?!\\#\\[)\\])",name:"meta.section.object.haml",patterns:[{include:"source.ruby"},{include:"#continuation"},{include:"#rubyline"}]},{include:"#interpolated_ruby_line"},{include:"#rubyline"},{match:"/",name:"punctuation.terminator.tag.haml"}]},{begin:"^(\\s*):(ruby|opal)$",end:"^(?!\\1\\s+|$\\n*)",name:"source.ruby.embedded.filter.haml",patterns:[{include:"source.ruby"}]},{begin:"^(\\s*):ruby$",end:"^(?!\\1\\s+|$\\n*)",name:"source.ruby.embedded.filter.haml",patterns:[{include:"source.ruby"}]},{begin:"^(\\s*):(style|sass)$",end:"^(?=\\1\\s+|$\\n*)",name:"source.sass.embedded.filter.haml",patterns:[{include:"source.sass"}]},{begin:"^(\\s*):coffee(script)?",end:"^(?!\\1\\s+|$\\n*)",name:"source.coffee.embedded.filter.haml",patterns:[{include:"source.coffee"}]},{begin:"^(\\s*):plain$",end:"^(?=\\1\\s+|$\\n*)",name:"text.plain.embedded.filter.haml",patterns:[{include:"text.plain"}]},{begin:"^(\\s*)(:ruby)",beginCaptures:{2:{name:"keyword.control.filter.haml"}},end:"(?m:(?<=\\n)(?!\\1\\s+|$\\n*))",name:"source.ruby.embedded.filter.haml",patterns:[{include:"source.ruby"}]},{begin:"^(\\s*)(:sass)",beginCaptures:{2:{name:"keyword.control.filter.haml"}},end:"^(?!\\1\\s+|$\\n*)",name:"source.embedded.filter.sass",patterns:[{include:"source.sass"}]},{begin:"^(\\s*):(styles|sass)$",end:"^(?=\\1\\s+|$\\n*)",name:"source.sass.embedded.filter.haml",patterns:[{include:"source.sass"}]},{begin:"^(\\s*):plain$",end:"^(?=\\1\\s+|$\\n*)",name:"text.plain.embedded.filter.haml",patterns:[{include:"text.plain"}]},{captures:{1:{name:"meta.escape.haml"}},match:"^\\s*(\\.)"},{begin:"^\\s*(?==|-|~|!=|&=)",end:"$",patterns:[{include:"#interpolated_ruby_line"},{include:"#rubyline"}]},{begin:"^(\\s*)(:php)",captures:{2:{name:"entity.name.tag.haml"}},end:"^(?!\\1\\s+|$\\n*)",name:"meta.embedded.php",patterns:[{include:"text.html.php#language"}]},{begin:"^(\\s*)(:markdown)",captures:{2:{name:"entity.name.tag.haml"}},end:"^(?!\\1\\s+|$\\n*)",name:"meta.embedded.markdown",patterns:[{include:"text.html.markdown"}]},{begin:"^(\\s*)(:(css|styles?))$",captures:{2:{name:"entity.name.tag.haml"}},end:"^(?!\\1\\s+|$\\n*)",name:"meta.embedded.css",patterns:[{include:"source.css"}]},{begin:"^(\\s*)(:sass)$",captures:{2:{name:"entity.name.tag.haml"}},end:"^(?!\\1\\s+|$\\n*)",name:"meta.embedded.sass",patterns:[{include:"source.sass"}]},{begin:"^(\\s*)(:scss)$",captures:{2:{name:"entity.name.tag.haml"}},end:"^(?!\\1\\s+|$\\n*)",name:"meta.embedded.scss",patterns:[{include:"source.scss"}]}],repository:{continuation:{captures:{1:{name:"punctuation.separator.continuation.haml"}},match:"(\\|)\\s*\\n"},interpolated_ruby:{patterns:[{captures:{0:{name:"punctuation.section.embedded.ruby"},1:{name:"source.ruby.embedded.source.empty"}},match:"#\\{(\\})",name:"source.ruby.embedded.source"},{begin:"#\\{",captures:{0:{name:"punctuation.section.embedded.ruby"}},end:"(\\})",name:"source.ruby.embedded.source",patterns:[{include:"#nest_curly_and_self"},{include:"source.ruby"}]},{include:"#variables"}]},interpolated_ruby_line:{begin:"!?==",contentName:"string.source.ruby.embedded.haml",end:"$",name:"meta.line.ruby.interpolated.haml",patterns:[{include:"#interpolated_ruby"},{include:"source.ruby#escaped_char"}]},nest_curly_and_self:{patterns:[{begin:"\\{",captures:{0:{name:"punctuation.section.scope.ruby"}},end:"\\}",patterns:[{include:"#nest_curly_and_self"},{include:"source.ruby"}]}]},rubyline:{begin:"(&amp|!)?(=|-|~)",contentName:"source.ruby.embedded.haml",end:"((do|\\{)( \\|[.*]+\\|)?)$|$|^(?!.*\\|\\s*)$\\n?",endCaptures:{1:{name:"source.ruby.embedded.html"},2:{name:"keyword.control.ruby.start-block"}},name:"meta.line.ruby.haml",patterns:[{captures:{1:{name:"keyword.control.php"}},match:"\\s+((elseif|foreach|switch|declare|default|use))(?=\\s|\\()"},{captures:{1:{name:"keyword.control.import.include.php"}},match:"\\s+(require_once|include_once)(?=\\s|\\()"},{match:"\\s+(catch|try|throw|exception|finally|die)(?=\\s|\\(|\\n*)",name:"keyword.control.exception.php"},{captures:{1:{name:"storage.type.function.php"}},match:"\\s+(function\\s*)((?=\\())"},{captures:{1:{name:"keyword.control.php"}},match:"\\s+(use\\s*)((?=\\())"},{match:"(\\||,|<|do|\\{)\\s*(\\#.*)?$\\n*",name:"source.ruby",patterns:[{include:"#rubyline"}]},{comment:"Hack to let ruby comments work in this context properly",match:"#.*$",name:"comment.line.number-sign.ruby"},{include:"source.ruby"},{include:"#continuation"}]},variables:{patterns:[{captures:{1:{name:"punctuation.definition.variable.ruby"}},match:"(#@)[a-zA-Z_]\\w*",name:"variable.other.readwrite.instance.ruby"},{captures:{1:{name:"punctuation.definition.variable.ruby"}},match:"(#@@)[a-zA-Z_]\\w*",name:"variable.other.readwrite.class.ruby"},{captures:{1:{name:"punctuation.definition.variable.ruby"}},match:"(#\\$)[a-zA-Z_]\\w*",name:"variable.other.readwrite.global.ruby"}]}},scopeName:"text.haml",embeddedLangs:["ruby","javascript","sass","coffee","markdown","css"]});var d=[...a.default,...s.default,...r.default,...u.default,...i.default,...c.default,m]}};