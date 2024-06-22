"use strict";exports.id=3492,exports.ids=[3492],exports.modules={13492:(a,e,n)=>{n.r(e),n.d(e,{default:()=>l});var t=n(29881),d=n(53324),o=n(17725),r=n(77893),i=n(16899);let p=Object.freeze({displayName:"APL",fileTypes:["apl","apla","aplc","aplf","apli","apln","aplo","dyalog","dyapp","mipage"],firstLineMatch:"(?x)\n# APL symbols\n[⌶-⍺]\n|\n\n# Hashbang\n^\\#!.*(?:\\s|\\/|(?<=!)\\b)\n	(?:gnu[-._]?apl|aplx?|dyalog)\n(?:$|\\s)\n|\n\n# Modeline\n(?i:\n	# Emacs\n	-\\*-(?:\\s*(?=[^:;\\s]+\\s*-\\*-)|(?:.*?[;\\s]|(?<=-\\*-))mode\\s*:\\s*)\n		apl\n	(?=[\\s;]|(?<![-*])-\\*-).*?-\\*-\n\n	|\n\n	# Vim\n	(?:(?:\\s|^)vi(?:m[<=>]?\\d+|m)?|\\sex)(?=:(?=\\s*set?\\s[^\\n:]+:)|:(?!\\s* set?\\s))(?:(?:\\s|\\s*:\\s*)\\w*(?:\\s*=(?:[^\\n\\\\\\s]|\\\\.)*)?)*[\\s:](?:filetype|ft|syntax)\\s*=\n		apl\n	(?=\\s|:|$)\n)",foldingStartMarker:"{",foldingStopMarker:"}",name:"apl",patterns:[{match:"\\A#!.*$",name:"comment.line.shebang.apl"},{include:"#heredocs"},{include:"#main"},{begin:"^\\s*((\\))OFF|(\\])NEXTFILE)\\b(.*)$",beginCaptures:{1:{name:"entity.name.command.eof.apl"},2:{name:"punctuation.definition.command.apl"},3:{name:"punctuation.definition.command.apl"},4:{patterns:[{include:"#comment"}]}},contentName:"text.embedded.apl",end:"(?=N)A"},{begin:"\\(",beginCaptures:{0:{name:"punctuation.round.bracket.begin.apl"}},end:"\\)",endCaptures:{0:{name:"punctuation.round.bracket.end.apl"}},name:"meta.round.bracketed.group.apl",patterns:[{include:"#main"}]},{begin:"\\[",beginCaptures:{0:{name:"punctuation.square.bracket.begin.apl"}},end:"\\]",endCaptures:{0:{name:"punctuation.square.bracket.end.apl"}},name:"meta.square.bracketed.group.apl",patterns:[{include:"#main"}]},{begin:"^\\s*((\\))\\S+)",beginCaptures:{1:{name:"entity.name.command.apl"},2:{name:"punctuation.definition.command.apl"}},end:"$",name:"meta.system.command.apl",patterns:[{include:"#command-arguments"},{include:"#command-switches"},{include:"#main"}]},{begin:"^\\s*((\\])\\S+)",beginCaptures:{1:{name:"entity.name.command.apl"},2:{name:"punctuation.definition.command.apl"}},end:"$",name:"meta.user.command.apl",patterns:[{include:"#command-arguments"},{include:"#command-switches"},{include:"#main"}]}],repository:{class:{patterns:[{begin:"(?x)\n(?<=\\s|^)\n((:)Class)\n\\s+\n(\n	'[^']*'?\n	|\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n)\n\\s*\n(\n	(:)\n	\\s*\n	(?:\n		(\n			'[^']*'?\n			|\n			[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n			[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n		)\n		\\s*\n	)?\n)?\n(.*?)$",beginCaptures:{0:{name:"meta.class.apl"},1:{name:"keyword.control.class.apl"},2:{name:"punctuation.definition.class.apl"},3:{name:"entity.name.type.class.apl",patterns:[{include:"#strings"}]},4:{name:"entity.other.inherited-class.apl"},5:{name:"punctuation.separator.inheritance.apl"},6:{patterns:[{include:"#strings"}]},7:{name:"entity.other.class.interfaces.apl",patterns:[{include:"#csv"}]}},end:"(?<=\\s|^)((:)EndClass)(?=\\b)",endCaptures:{1:{name:"keyword.control.class.apl"},2:{name:"punctuation.definition.class.apl"}},patterns:[{begin:"(?<=\\s|^)(:)Field(?=\\s)",beginCaptures:{0:{name:"keyword.control.field.apl"},1:{name:"punctuation.definition.field.apl"}},end:"\\s*(←.*)?(?:$|(?=⍝))",endCaptures:{0:{name:"entity.other.initial-value.apl"},1:{patterns:[{include:"#main"}]}},name:"meta.field.apl",patterns:[{match:"(?<=\\s|^)Public(?=\\s|$)",name:"storage.modifier.access.public.apl"},{match:"(?<=\\s|^)Private(?=\\s|$)",name:"storage.modifier.access.private.apl"},{match:"(?<=\\s|^)Shared(?=\\s|$)",name:"storage.modifier.shared.apl"},{match:"(?<=\\s|^)Instance(?=\\s|$)",name:"storage.modifier.instance.apl"},{match:"(?<=\\s|^)ReadOnly(?=\\s|$)",name:"storage.modifier.readonly.apl"},{captures:{1:{patterns:[{include:"#strings"}]}},match:"(?x)\n(\n	'[^']*'?\n	|\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n)",name:"entity.name.type.apl"}]},{include:"$self"}]}]},"command-arguments":{patterns:[{begin:"\\b(?=\\S)",end:"\\b(?=\\s)",name:"variable.parameter.argument.apl",patterns:[{include:"#main"}]}]},"command-switches":{patterns:[{begin:"(?x)\n(?<=\\s)(-)\n(\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n)\n(=)",beginCaptures:{1:{name:"punctuation.delimiter.switch.apl"},2:{name:"entity.name.switch.apl"},3:{name:"punctuation.assignment.switch.apl"}},end:"\\b(?=\\s)",name:"variable.parameter.switch.apl",patterns:[{include:"#main"}]},{captures:{1:{name:"punctuation.delimiter.switch.apl"},2:{name:"entity.name.switch.apl"}},match:"(?x)\n(?<=\\s)(-)\n(\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n)\n(?!=)",name:"variable.parameter.switch.apl"}]},comment:{patterns:[{begin:"⍝",captures:{0:{name:"punctuation.definition.comment.apl"}},end:"$",name:"comment.line.apl"}]},csv:{patterns:[{match:",",name:"punctuation.separator.apl"},{include:"$self"}]},definition:{patterns:[{begin:"(?x) ^\\s*? (?# 1: keyword.operator.nabla.apl) (∇) (?: \\s* (?: (?# 2: entity.function.return-value.apl) ( [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* ) | \\s* (?# 3: entity.function.return-value.shy.apl) ( (\\{)             (?# 4: punctuation.definition.return-value.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\})             (?# 5: punctuation.definition.return-value.end.apl) | (\\()             (?# 6: punctuation.definition.return-value.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\))             (?# 7: punctuation.definition.return-value.end.apl) | (\\(\\s*\\{)      (?# 8: punctuation.definition.return-value.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\}\\s*\\))      (?# 9: punctuation.definition.return-value.end.apl) | (\\{\\s*\\()      (?# 10: punctuation.definition.return-value.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\)\\s*\\})      (?# 11: punctuation.definition.return-value.end.apl) ) \\s* ) \\s* (?# 12: keyword.operator.assignment.apl) (←) )? \\s* (?: (?# MONADIC) (?: (?# 13: entity.function.name.apl) ( [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* ) \\s* (?# 14: entity.function.axis.apl) ( (?# 15: punctuation.definition.axis.begin.apl) (\\[) \\s* (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* (?# 16: invalid.illegal.extra-characters.apl) (.*?) | (?# 17: invalid.illegal.apl) ([^\\]]*) ) \\s* (?# 18: punctuation.definition.axis.end.apl) (\\]) )? \\s*? (?# 19: entity.function.arguments.right.apl) ( (?<=\\s|\\]) [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* | (\\()   (?# 20: punctuation.definition.arguments.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\))   (?# 21: punctuation.definition.arguments.end.apl) ) \\s* (?=;|$) ) | (?# DYADIC/AMBIVALENT) (?#==================) (?: (?# 22: entity.function.arguments.left.apl) ( [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s+ ) | (?# 23: entity.function.arguments.left.optional.apl) ( (\\{)          (?# 24: punctuation.definition.arguments.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\})          (?# 25: punctuation.definition.arguments.end.apl) | (\\(\\s*\\{)   (?# 26: punctuation.definition.arguments.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\}\\s*\\))   (?# 27: punctuation.definition.arguments.end.apl) | (\\{\\s*\\()   (?# 28: punctuation.definition.arguments.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\)\\s*\\})   (?# 29: punctuation.definition.arguments.end.apl) ) )? \\s* (?: (?# 30: entity.function.name.apl) ( [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* ) \\s* (?# 31: entity.function.axis.apl) ( (?# 32: punctuation.definition.axis.begin.apl) (\\[) \\s* (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* (?# 33: invalid.illegal.extra-characters.apl) (.*?) | (?# 34: invalid.illegal.apl) ([^\\]]*) ) \\s* (?# 35: punctuation.definition.axis.end.apl) (\\]) )? | (?# 36: entity.function.operands.apl) ( (?# 37: punctuation.definition.operands.begin.apl) (\\() (?# 38: entity.function.operands.left.apl) ( \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* )? \\s* (?# 39: entity.function.name.apl) ( [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* ) \\s*? (?# 40: entity.function.axis.apl) ( (?# 41: punctuation.definition.axis.begin.apl) (\\[) \\s* (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* (?# 42: invalid.illegal.extra-characters.apl) (.*?) | (?# 43: invalid.illegal.apl) ([^\\]]*) ) \\s* (?# 44: punctuation.definition.axis.end.apl) (\\]) )? \\s* (?# 45: entity.function.operands.right.apl) ( [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )? (?# 46: punctuation.definition.operands.end.apl) (\\)) ) ) \\s* (?# 47: entity.function.arguments.right.apl) ( (?<=\\s|\\]) [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* | \\s* (\\()   (?# 48: punctuation.definition.arguments.begin.apl) (?: \\s* [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )* (\\))   (?# 49: punctuation.definition.arguments.end.apl) )? (?#==================) ) \\s* (?# 50: invalid.illegal.arguments.right.apl) ([^;]+)? (?# 51: entity.function.local-variables.apl) ( (?# 52: Include “;”) ( (?> \\s* ; (?: \\s* [⎕A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ] [A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]* \\s* )+ )+ ) | (?# 53: invalid.illegal.local-variables.apl) ([^⍝]+) )? \\s* (?# 54: comment.line.apl) (⍝.*)? $",beginCaptures:{0:{name:"entity.function.definition.apl"},1:{name:"keyword.operator.nabla.apl"},2:{name:"entity.function.return-value.apl"},3:{name:"entity.function.return-value.shy.apl"},4:{name:"punctuation.definition.return-value.begin.apl"},5:{name:"punctuation.definition.return-value.end.apl"},6:{name:"punctuation.definition.return-value.begin.apl"},7:{name:"punctuation.definition.return-value.end.apl"},8:{name:"punctuation.definition.return-value.begin.apl"},9:{name:"punctuation.definition.return-value.end.apl"},10:{name:"punctuation.definition.return-value.begin.apl"},11:{name:"punctuation.definition.return-value.end.apl"},12:{name:"keyword.operator.assignment.apl"},13:{name:"entity.function.name.apl",patterns:[{include:"#embolden"}]},14:{name:"entity.function.axis.apl"},15:{name:"punctuation.definition.axis.begin.apl"},16:{name:"invalid.illegal.extra-characters.apl"},17:{name:"invalid.illegal.apl"},18:{name:"punctuation.definition.axis.end.apl"},19:{name:"entity.function.arguments.right.apl"},20:{name:"punctuation.definition.arguments.begin.apl"},21:{name:"punctuation.definition.arguments.end.apl"},22:{name:"entity.function.arguments.left.apl"},23:{name:"entity.function.arguments.left.optional.apl"},24:{name:"punctuation.definition.arguments.begin.apl"},25:{name:"punctuation.definition.arguments.end.apl"},26:{name:"punctuation.definition.arguments.begin.apl"},27:{name:"punctuation.definition.arguments.end.apl"},28:{name:"punctuation.definition.arguments.begin.apl"},29:{name:"punctuation.definition.arguments.end.apl"},30:{name:"entity.function.name.apl",patterns:[{include:"#embolden"}]},31:{name:"entity.function.axis.apl"},32:{name:"punctuation.definition.axis.begin.apl"},33:{name:"invalid.illegal.extra-characters.apl"},34:{name:"invalid.illegal.apl"},35:{name:"punctuation.definition.axis.end.apl"},36:{name:"entity.function.operands.apl"},37:{name:"punctuation.definition.operands.begin.apl"},38:{name:"entity.function.operands.left.apl"},39:{name:"entity.function.name.apl",patterns:[{include:"#embolden"}]},40:{name:"entity.function.axis.apl"},41:{name:"punctuation.definition.axis.begin.apl"},42:{name:"invalid.illegal.extra-characters.apl"},43:{name:"invalid.illegal.apl"},44:{name:"punctuation.definition.axis.end.apl"},45:{name:"entity.function.operands.right.apl"},46:{name:"punctuation.definition.operands.end.apl"},47:{name:"entity.function.arguments.right.apl"},48:{name:"punctuation.definition.arguments.begin.apl"},49:{name:"punctuation.definition.arguments.end.apl"},50:{name:"invalid.illegal.arguments.right.apl"},51:{name:"entity.function.local-variables.apl"},52:{patterns:[{match:";",name:"punctuation.separator.apl"}]},53:{name:"invalid.illegal.local-variables.apl"},54:{name:"comment.line.apl"}},end:"^\\s*?(?:(∇)|(⍫))\\s*?(⍝.*?)?$",endCaptures:{1:{name:"keyword.operator.nabla.apl"},2:{name:"keyword.operator.lock.apl"},3:{name:"comment.line.apl"}},name:"meta.function.apl",patterns:[{captures:{0:{name:"entity.function.local-variables.apl"},1:{patterns:[{match:";",name:"punctuation.separator.apl"}]}},match:"(?x)\n^\\s*\n(\n	(?>\n		;\n		(?:\n			\\s*\n			[⎕A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n			[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n			\\s*\n		)+\n	)+\n)",name:"entity.function.definition.apl"},{include:"$self"}]}]},"embedded-apl":{patterns:[{begin:"(?i)(<(\\?|%)(?:apl(?=\\s+)|=))",beginCaptures:{1:{name:"punctuation.section.embedded.begin.apl"}},end:"(?<=\\s)(\\2>)",endCaptures:{1:{name:"punctuation.section.embedded.end.apl"}},name:"meta.embedded.block.apl",patterns:[{include:"#main"}]}]},embolden:{patterns:[{match:".+",name:"markup.bold.identifier.apl"}]},heredocs:{patterns:[{begin:`^.*?\u2395INP\\s+('|")((?i).*?HTML?.*?|END-OF-\u2395INP)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},contentName:"text.embedded.html.basic",end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"text.html.basic"},{include:"#embedded-apl"}]},{begin:`^.*?\u2395INP\\s+('|")((?i).*?(?:XML|XSLT|SVG|RSS).*?)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},contentName:"text.embedded.xml",end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"text.xml"},{include:"#embedded-apl"}]},{begin:`^.*?\u2395INP\\s+('|")((?i).*?(?:CSS|stylesheet).*?)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},contentName:"source.embedded.css",end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"source.css"},{include:"#embedded-apl"}]},{begin:`^.*?\u2395INP\\s+('|")((?i).*?(?:JS(?!ON)|(?:ECMA|J|Java).?Script).*?)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},contentName:"source.embedded.js",end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"source.js"},{include:"#embedded-apl"}]},{begin:`^.*?\u2395INP\\s+('|")((?i).*?(?:JSON).*?)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},contentName:"source.embedded.json",end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"source.json"},{include:"#embedded-apl"}]},{begin:`^.*?\u2395INP\\s+('|")(?i)((?:Raw|Plain)?\\s*Te?xt)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},contentName:"text.embedded.plain",end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"#embedded-apl"}]},{begin:`^.*?\u2395INP\\s+('|")(.*?)\\1.*$`,beginCaptures:{0:{patterns:[{include:"#main"}]}},end:"^.*?\\2.*?$",endCaptures:{0:{name:"constant.other.apl"}},name:"meta.heredoc.apl",patterns:[{include:"$self"}]}]},label:{patterns:[{captures:{1:{name:"entity.label.name.apl"},2:{name:"punctuation.definition.label.end.apl"}},match:"(?x)\n^\\s*\n(\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n	[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*\n)\n(:)",name:"meta.label.apl"}]},lambda:{begin:"\\{",beginCaptures:{0:{name:"punctuation.definition.lambda.begin.apl"}},end:"\\}",endCaptures:{0:{name:"punctuation.definition.lambda.end.apl"}},name:"meta.lambda.function.apl",patterns:[{include:"#main"},{include:"#lambda-variables"}]},"lambda-variables":{patterns:[{match:"⍺⍺",name:"constant.language.lambda.operands.left.apl"},{match:"⍵⍵",name:"constant.language.lambda.operands.right.apl"},{match:"[⍺⍶]",name:"constant.language.lambda.arguments.left.apl"},{match:"[⍵⍹]",name:"constant.language.lambda.arguments.right.apl"},{match:"χ",name:"constant.language.lambda.arguments.axis.apl"},{match:"∇∇",name:"constant.language.lambda.operands.self.operator.apl"},{match:"∇",name:"constant.language.lambda.operands.self.function.apl"},{match:"λ",name:"constant.language.lambda.symbol.apl"}]},main:{patterns:[{include:"#class"},{include:"#definition"},{include:"#comment"},{include:"#label"},{include:"#sck"},{include:"#strings"},{include:"#number"},{include:"#lambda"},{include:"#sysvars"},{include:"#symbols"},{include:"#name"}]},name:{patterns:[{match:"(?x)\n[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ]\n[A-Z_a-z\xc0-\xd6\xd8-\xdd\xdf\xe0-\xf6\xf8-\xfc\xfe∆⍙Ⓐ-Ⓩ\xaf0-9]*",name:"variable.other.readwrite.apl"}]},number:{patterns:[{match:"\xaf?[0-9][\xaf0-9A-Za-z]*(?:\\.[\xaf0-9Ee][\xaf0-9A-Za-z]*)*|\xaf?\\.[0-9Ee][\xaf0-9A-Za-z]*",name:"constant.numeric.apl"}]},sck:{patterns:[{captures:{1:{name:"punctuation.definition.sck.begin.apl"}},match:"(?<=\\s|^)(:)[A-Za-z]+",name:"keyword.control.sck.apl"}]},strings:{patterns:[{begin:"'",beginCaptures:{0:{name:"punctuation.definition.string.begin.apl"}},end:"'|$",endCaptures:{0:{name:"punctuation.definition.string.end.apl"}},name:"string.quoted.single.apl",patterns:[{match:"[^']*[^'\\n\\r\\\\]$",name:"invalid.illegal.string.apl"}]},{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.apl"}},end:'"|$',endCaptures:{0:{name:"punctuation.definition.string.end.apl"}},name:"string.quoted.double.apl",patterns:[{match:'[^"]*[^"\\n\\r\\\\]$',name:"invalid.illegal.string.apl"}]}]},symbols:{patterns:[{match:"(?<=\\s)←(?=\\s|$)",name:"keyword.spaced.operator.assignment.apl"},{match:"(?<=\\s)→(?=\\s|$)",name:"keyword.spaced.control.goto.apl"},{match:"(?<=\\s)≡(?=\\s|$)",name:"keyword.spaced.operator.identical.apl"},{match:"(?<=\\s)≢(?=\\s|$)",name:"keyword.spaced.operator.not-identical.apl"},{match:"\\+",name:"keyword.operator.plus.apl"},{match:"[-−]",name:"keyword.operator.minus.apl"},{match:"\xd7",name:"keyword.operator.times.apl"},{match:"\xf7",name:"keyword.operator.divide.apl"},{match:"⌊",name:"keyword.operator.floor.apl"},{match:"⌈",name:"keyword.operator.ceiling.apl"},{match:"[∣|]",name:"keyword.operator.absolute.apl"},{match:"[⋆*]",name:"keyword.operator.exponent.apl"},{match:"⍟",name:"keyword.operator.logarithm.apl"},{match:"○",name:"keyword.operator.circle.apl"},{match:"!",name:"keyword.operator.factorial.apl"},{match:"∧",name:"keyword.operator.and.apl"},{match:"∨",name:"keyword.operator.or.apl"},{match:"⍲",name:"keyword.operator.nand.apl"},{match:"⍱",name:"keyword.operator.nor.apl"},{match:"<",name:"keyword.operator.less.apl"},{match:"≤",name:"keyword.operator.less-or-equal.apl"},{match:"=",name:"keyword.operator.equal.apl"},{match:"≥",name:"keyword.operator.greater-or-equal.apl"},{match:">",name:"keyword.operator.greater.apl"},{match:"≠",name:"keyword.operator.not-equal.apl"},{match:"[∼~]",name:"keyword.operator.tilde.apl"},{match:"\\?",name:"keyword.operator.random.apl"},{match:"[∊∈]",name:"keyword.operator.member-of.apl"},{match:"⍷",name:"keyword.operator.find.apl"},{match:",",name:"keyword.operator.comma.apl"},{match:"⍪",name:"keyword.operator.comma-bar.apl"},{match:"⌷",name:"keyword.operator.squad.apl"},{match:"⍳",name:"keyword.operator.iota.apl"},{match:"⍴",name:"keyword.operator.rho.apl"},{match:"↑",name:"keyword.operator.take.apl"},{match:"↓",name:"keyword.operator.drop.apl"},{match:"⊣",name:"keyword.operator.left.apl"},{match:"⊢",name:"keyword.operator.right.apl"},{match:"⊤",name:"keyword.operator.encode.apl"},{match:"⊥",name:"keyword.operator.decode.apl"},{match:"\\/",name:"keyword.operator.slash.apl"},{match:"⌿",name:"keyword.operator.slash-bar.apl"},{match:"\\x5C",name:"keyword.operator.backslash.apl"},{match:"⍀",name:"keyword.operator.backslash-bar.apl"},{match:"⌽",name:"keyword.operator.rotate-last.apl"},{match:"⊖",name:"keyword.operator.rotate-first.apl"},{match:"⍉",name:"keyword.operator.transpose.apl"},{match:"⍋",name:"keyword.operator.grade-up.apl"},{match:"⍒",name:"keyword.operator.grade-down.apl"},{match:"⌹",name:"keyword.operator.quad-divide.apl"},{match:"≡",name:"keyword.operator.identical.apl"},{match:"≢",name:"keyword.operator.not-identical.apl"},{match:"⊂",name:"keyword.operator.enclose.apl"},{match:"⊃",name:"keyword.operator.pick.apl"},{match:"∩",name:"keyword.operator.intersection.apl"},{match:"∪",name:"keyword.operator.union.apl"},{match:"⍎",name:"keyword.operator.hydrant.apl"},{match:"⍕",name:"keyword.operator.thorn.apl"},{match:"⊆",name:"keyword.operator.underbar-shoe-left.apl"},{match:"⍸",name:"keyword.operator.underbar-iota.apl"},{match:"\xa8",name:"keyword.operator.each.apl"},{match:"⍤",name:"keyword.operator.rank.apl"},{match:"⌸",name:"keyword.operator.quad-equal.apl"},{match:"⍨",name:"keyword.operator.commute.apl"},{match:"⍣",name:"keyword.operator.power.apl"},{match:"\\.",name:"keyword.operator.dot.apl"},{match:"∘",name:"keyword.operator.jot.apl"},{match:"⍠",name:"keyword.operator.quad-colon.apl"},{match:"&",name:"keyword.operator.ampersand.apl"},{match:"⌶",name:"keyword.operator.i-beam.apl"},{match:"⌺",name:"keyword.operator.quad-diamond.apl"},{match:"@",name:"keyword.operator.at.apl"},{match:"◊",name:"keyword.operator.lozenge.apl"},{match:";",name:"keyword.operator.semicolon.apl"},{match:"\xaf",name:"keyword.operator.high-minus.apl"},{match:"←",name:"keyword.operator.assignment.apl"},{match:"→",name:"keyword.control.goto.apl"},{match:"⍬",name:"constant.language.zilde.apl"},{match:"⋄",name:"keyword.operator.diamond.apl"},{match:"⍫",name:"keyword.operator.lock.apl"},{match:"⎕",name:"keyword.operator.quad.apl"},{match:"##",name:"constant.language.namespace.parent.apl"},{match:"#",name:"constant.language.namespace.root.apl"},{match:"⌻",name:"keyword.operator.quad-jot.apl"},{match:"⌼",name:"keyword.operator.quad-circle.apl"},{match:"⌾",name:"keyword.operator.circle-jot.apl"},{match:"⍁",name:"keyword.operator.quad-slash.apl"},{match:"⍂",name:"keyword.operator.quad-backslash.apl"},{match:"⍃",name:"keyword.operator.quad-less.apl"},{match:"⍄",name:"keyword.operator.greater.apl"},{match:"⍅",name:"keyword.operator.vane-left.apl"},{match:"⍆",name:"keyword.operator.vane-right.apl"},{match:"⍇",name:"keyword.operator.quad-arrow-left.apl"},{match:"⍈",name:"keyword.operator.quad-arrow-right.apl"},{match:"⍊",name:"keyword.operator.tack-down.apl"},{match:"⍌",name:"keyword.operator.quad-caret-down.apl"},{match:"⍍",name:"keyword.operator.quad-del-up.apl"},{match:"⍏",name:"keyword.operator.vane-up.apl"},{match:"⍐",name:"keyword.operator.quad-arrow-up.apl"},{match:"⍑",name:"keyword.operator.tack-up.apl"},{match:"⍓",name:"keyword.operator.quad-caret-up.apl"},{match:"⍔",name:"keyword.operator.quad-del-down.apl"},{match:"⍖",name:"keyword.operator.vane-down.apl"},{match:"⍗",name:"keyword.operator.quad-arrow-down.apl"},{match:"⍘",name:"keyword.operator.underbar-quote.apl"},{match:"⍚",name:"keyword.operator.underbar-diamond.apl"},{match:"⍛",name:"keyword.operator.underbar-jot.apl"},{match:"⍜",name:"keyword.operator.underbar-circle.apl"},{match:"⍞",name:"keyword.operator.quad-quote.apl"},{match:"⍡",name:"keyword.operator.dotted-tack-up.apl"},{match:"⍢",name:"keyword.operator.dotted-del.apl"},{match:"⍥",name:"keyword.operator.dotted-circle.apl"},{match:"⍦",name:"keyword.operator.stile-shoe-up.apl"},{match:"⍧",name:"keyword.operator.stile-shoe-left.apl"},{match:"⍩",name:"keyword.operator.dotted-greater.apl"},{match:"⍭",name:"keyword.operator.stile-tilde.apl"},{match:"⍮",name:"keyword.operator.underbar-semicolon.apl"},{match:"⍯",name:"keyword.operator.quad-not-equal.apl"},{match:"⍰",name:"keyword.operator.quad-question.apl"}]},sysvars:{patterns:[{captures:{1:{name:"punctuation.definition.quad.apl"},2:{name:"punctuation.definition.quad-quote.apl"}},match:"(?:(⎕)|(⍞))[A-Za-z]*",name:"support.system.variable.apl"}]}},scopeName:"source.apl",embeddedLangs:["html","xml","css","javascript","json"]});var l=[...t.default,...d.default,...o.default,...r.default,...i.default,p]}};