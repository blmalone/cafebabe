"use strict";exports.id=6083,exports.ids=[6083],exports.modules={36083:(n,e,t)=>{t.r(e),t.d(e,{default:()=>i});let a=Object.freeze({displayName:"CUE",fileTypes:["cue"],name:"cue",patterns:[{include:"#whitespace"},{include:"#comment"},{captures:{1:{name:"keyword.other.package"},2:{name:"entity.name.namespace"}},match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(package)[ \\t]+([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*)(?![\\p{L}\\p{Nd}_\\$\\#])"},{patterns:[{begin:"(?<![\\p{L}\\p{Nd}_\\$\\#])(import)[ \\t]+(\\()",beginCaptures:{1:{name:"keyword.other.import"},2:{name:"punctuation.section.parens.begin"}},end:"\\)",endCaptures:{0:{name:"punctuation.section.parens.end"}},name:"meta.imports",patterns:[{include:"#whitespace"},{include:"#comment"},{captures:{1:{name:"entity.name.namespace"},2:{name:"punctuation.definition.string.begin"},3:{name:"string.quoted.double-import"},4:{name:"punctuation.colon"},5:{name:"entity.name"},6:{name:"punctuation.definition.string.end"}},match:'(?:([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*)[ \\t]+)?(")([^:"]+)(?:(:)([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*))?(")',name:"meta.import-spec"},{match:";",name:"punctuation.separator"},{include:"#invalid_in_parens"}]},{captures:{1:{name:"keyword.other.import"},2:{name:"entity.name.namespace"},3:{name:"punctuation.definition.string.begin"},4:{name:"string.quoted.double-import"},5:{name:"punctuation.colon"},6:{name:"entity.name"},7:{name:"punctuation.definition.string.end"}},match:'(?<![\\p{L}\\p{Nd}_\\$\\#])(import)[ \\t]+(?:([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*)[ \\t]+)?(")([^:"]+)(?:(:)([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*))?(")',name:"meta.import"}]},{include:"#punctuation_comma"},{include:"#declaration"},{include:"#invalid_in_braces"}],repository:{attribute_element:{patterns:[{begin:"([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)(=)",beginCaptures:{1:{name:"variable.other"},2:{name:"punctuation.bind"}},end:"(?=[,\\)])",patterns:[{include:"#attribute_string"}]},{begin:"([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)(\\()",beginCaptures:{1:{name:"variable.other"},2:{name:"punctuation.attribute-elements.begin"}},end:"\\)",endCaptures:{0:{name:"punctuation.attribute-elements.end"}},patterns:[{include:"#punctuation_comma"},{include:"#attribute_element"}]},{include:"#attribute_string"}]},attribute_string:{patterns:[{include:"#string"},{match:`[^\\n,"'#=\\(\\)]+`,name:"string.unquoted"},{match:"[^,\\)]+",name:"invalid"}]},comment:{patterns:[{captures:{1:{name:"punctuation.definition.comment"}},match:"(//).*$\\n?",name:"comment.line"},{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment"}},end:"\\*/",name:"comment.block"}]},declaration:{patterns:[{begin:"(@)([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)(\\()",beginCaptures:{1:{name:"punctuation.definition.annotation"},2:{name:"variable.annotation"},3:{name:"punctuation.attribute-elements.begin"}},end:"\\)",endCaptures:{0:{name:"punctuation.attribute-elements.end"}},name:"meta.annotation",patterns:[{include:"#punctuation_comma"},{include:"#attribute_element"}]},{match:"(?<!:)::(?!:)",name:"punctuation.isa"},{include:"#punctuation_colon"},{match:"\\?",name:"punctuation.option"},{match:"(?<![=!><])=(?![=~])",name:"punctuation.bind"},{match:"<-",name:"punctuation.arrow"},{include:"#expression"}]},expression:{patterns:[{patterns:[{captures:{1:{name:"keyword.control.for"},2:{name:"variable.other"},3:{name:"punctuation.separator"},4:{name:"variable.other"},5:{name:"keyword.control.in"}},match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(for)[ \\t]+([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)(?:[ \\t]*(,)[ \\t]*([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+))?[ \\t]+(in)(?![\\p{L}\\p{Nd}_\\$\\#])"},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])if(?![\\p{L}\\p{Nd}_\\$\\#])",name:"keyword.control.conditional"},{captures:{1:{name:"keyword.control.let"},2:{name:"variable.other"},3:{name:"punctuation.bind"}},match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(let)[ \\t]+([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)[ \\t]*(=)(?![=])"}]},{patterns:[{match:"[\\+\\-\\*]|/(?![/*])",name:"keyword.operator"},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(?:div|mod|quo|rem)(?![\\p{L}\\p{Nd}_\\$\\#])",name:"keyword.operator.word"},{match:"=[=~]|![=~]|<=|>=|[<](?![-=])|[>](?![=])",name:"keyword.operator.comparison"},{match:"&{2}|\\|{2}|!(?![=~])",name:"keyword.operator.logical"},{match:"&(?!&)|\\|(?!\\|)",name:"keyword.operator.set"}]},{captures:{1:{name:"punctuation.accessor"},2:{name:"variable.other.member"}},match:"(?<!\\.)(\\.)([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)(?![\\p{L}\\p{Nd}_\\$\\#])"},{patterns:[{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])_(?!\\|)(?![\\p{L}\\p{Nd}_\\$\\#])",name:"constant.language.top"},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])_\\|_(?![\\p{L}\\p{Nd}_\\$\\#])",name:"constant.language.bottom"},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])null(?![\\p{L}\\p{Nd}_\\$\\#])",name:"constant.language.null"},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(?:true|false)(?![\\p{L}\\p{Nd}_\\$\\#])",name:"constant.language.bool"},{patterns:[{patterns:[{match:"(?<![\\p{L}\\p{Nd}_\\.])[0-9](?:_?[0-9])*\\.(?:[0-9](?:_?[0-9])*)?(?:[eE][\\+\\-]?[0-9](?:_?[0-9])*)?(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.float.decimal"},{match:"(?<![\\p{L}\\p{Nd}_\\.])[0-9](?:_?[0-9])*[eE][\\+\\-]?[0-9](?:_?[0-9])*(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.float.decimal"},{match:"(?<![\\p{L}\\p{Nd}_\\.])\\.[0-9](?:_?[0-9])*(?:[eE][\\+\\-]?[0-9](?:_?[0-9])*)?(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.float.decimal"}]},{patterns:[{patterns:[{match:"(?<![\\p{L}\\p{Nd}_\\.])(?:0|[1-9](?:_?[0-9])*)(?:\\.[0-9](?:_?[0-9])*)?(?:[KMGTPEYZ]i?)(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.integer.other"},{match:"(?<![\\p{L}\\p{Nd}_\\.])\\.[0-9](?:_?[0-9])*(?:[KMGTPEYZ]i?)(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.integer.other"}]},{match:"(?<![\\p{L}\\p{Nd}_\\.])(?:0|[1-9](?:_?[0-9])*)(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.integer.decimal"},{match:"(?<![\\p{L}\\p{Nd}_\\.])0b[0-1](?:_?[0-1])*(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.integer.binary"},{match:"(?<![\\p{L}\\p{Nd}_\\.])0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.integer.hexadecimal"},{match:"(?<![\\p{L}\\p{Nd}_\\.])0o?[0-7](?:_?[0-7])*(?![\\p{L}\\p{Nd}_\\.])",name:"constant.numeric.integer.octal"}]}]},{include:"#string"},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(?:bool|u?int(?:8|16|32|64|128)?|float(?:32|64)?|string|bytes|number|rune)(?![\\p{L}\\p{Nd}_\\$\\#])",name:"support.type"},{patterns:[{begin:"(?<![\\p{L}\\p{Nd}_\\$\\#])(len|close|and|or)(\\()",beginCaptures:{1:{name:"support.function"},2:{name:"punctuation.section.parens.begin"}},end:"\\)",endCaptures:{0:{name:"punctuation.section.parens.end"}},name:"meta.function-call",patterns:[{include:"#whitespace"},{include:"#comment"},{include:"#punctuation_comma"},{include:"#expression"},{include:"#invalid_in_parens"}]},{begin:"(?<![\\p{L}\\p{Nd}_\\$\\#])([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*)(\\.)(\\p{Lu}[\\p{L}\\p{Nd}_\\$\\#]*)(\\()",beginCaptures:{1:{name:"support.module"},2:{name:"punctuation"},3:{name:"support.function"},4:{name:"punctuation.section.parens.begin"}},end:"\\)",endCaptures:{0:{name:"punctuation.section.parens.end"}},name:"meta.function-call",patterns:[{include:"#whitespace"},{include:"#comment"},{include:"#punctuation_comma"},{include:"#expression"},{include:"#invalid_in_parens"}]}]},{match:"(?<![\\p{L}\\p{Nd}_\\$\\#])(?:[\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)(?![\\p{L}\\p{Nd}_\\$\\#])",name:"variable.other"},{begin:"\\{",beginCaptures:{0:{name:"punctuation.definition.struct.begin"}},end:"\\}",endCaptures:{0:{name:"punctuation.definition.struct.end"}},name:"meta.struct",patterns:[{include:"#whitespace"},{include:"#comment"},{include:"#punctuation_comma"},{include:"#punctuation_ellipsis"},{include:"#declaration"},{include:"#invalid_in_braces"}]},{begin:"\\[",beginCaptures:{0:{name:"punctuation.section.brackets.begin"}},end:"\\]",endCaptures:{0:{name:"punctuation.section.brackets.end"}},name:"meta.brackets",patterns:[{include:"#whitespace"},{include:"#comment"},{include:"#punctuation_colon"},{include:"#punctuation_comma"},{include:"#punctuation_ellipsis"},{captures:{1:{name:"variable.other"},2:{name:"punctuation.alias"}},match:"([\\p{L}\\$\\#][\\p{L}\\p{Nd}_\\$\\#]*|_[\\p{L}\\p{Nd}_\\$\\#]+)[ \\t]*(=)"},{include:"#expression"},{match:"[^\\]]+",name:"invalid"}]},{begin:"\\(",beginCaptures:{0:{name:"punctuation.section.parens.begin"}},end:"\\)",endCaptures:{0:{name:"punctuation.section.parens.end"}},name:"meta.parens",patterns:[{include:"#whitespace"},{include:"#comment"},{include:"#punctuation_comma"},{include:"#expression"},{include:"#invalid_in_parens"}]}]}]},invalid_in_braces:{match:"[^\\}]+",name:"invalid"},invalid_in_parens:{match:"[^\\)]+",name:"invalid"},punctuation_colon:{match:"(?<!:):(?!:)",name:"punctuation.colon"},punctuation_comma:{match:",",name:"punctuation.separator"},punctuation_ellipsis:{match:"(?<!\\.)\\.{3}(?!\\.)",name:"punctuation.ellipsis"},string:{patterns:[{begin:'#"""',beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.double-multiline",end:'"""#',endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:'\\\\#(?:"""|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',name:"constant.character.escape"},{match:"\\\\#(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"invalid.illegal"},{begin:"\\\\#\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\#.",name:"invalid.illegal"}]},{begin:'#"',beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.double",end:'"#',endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:'\\\\#(?:"|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',name:"constant.character.escape"},{match:"\\\\#(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"invalid.illegal"},{begin:"\\\\#\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\#.",name:"invalid.illegal"}]},{begin:"#'''",beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.single-multiline",end:"'''#",endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:"\\\\#(?:'''|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})",name:"constant.character.escape"},{match:"\\\\#(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"constant.character.escape"},{begin:"\\\\#\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\#.",name:"invalid.illegal"}]},{begin:"#'",beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.single",end:"'#",endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:"\\\\#(?:'|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})",name:"constant.character.escape"},{match:"\\\\#(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"constant.character.escape"},{begin:"\\\\#\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\#.",name:"invalid.illegal"}]},{begin:'"""',beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.double-multiline",end:'"""',endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:'\\\\(?:"""|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',name:"constant.character.escape"},{match:"\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"invalid.illegal"},{begin:"\\\\\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\.",name:"invalid.illegal"}]},{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.double",end:'"',endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:'\\\\(?:"|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',name:"constant.character.escape"},{match:"\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"invalid.illegal"},{begin:"\\\\\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\.",name:"invalid.illegal"}]},{begin:"'''",beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.single-multiline",end:"'''",endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:"\\\\(?:'''|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})",name:"constant.character.escape"},{match:"\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"constant.character.escape"},{begin:"\\\\\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\.",name:"invalid.illegal"}]},{begin:"'",beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.single",end:"'",endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string",patterns:[{match:"\\\\(?:'|/|\\\\|[abfnrtv]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})",name:"constant.character.escape"},{match:"\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2})",name:"constant.character.escape"},{begin:"\\\\\\(",beginCaptures:{0:{name:"punctuation.section.interpolation.begin"}},contentName:"source.cue.embedded",end:"\\)",endCaptures:{0:{name:"punctuation.section.interpolation.end"}},name:"meta.interpolation",patterns:[{include:"#whitespace"},{include:"#expression"},{include:"#invalid_in_parens"}]},{match:"\\\\.",name:"invalid.illegal"}]},{begin:"`",beginCaptures:{0:{name:"punctuation.definition.string.begin"}},contentName:"string.quoted.backtick",end:"`",endCaptures:{0:{name:"punctuation.definition.string.end"}},name:"meta.string"}]},whitespace:{match:"[ \\t\\r\\n]+"}},scopeName:"source.cue"});var i=[a]}};