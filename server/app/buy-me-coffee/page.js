(()=>{var e={};e.id=591,e.ids=[591],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},49411:e=>{"use strict";e.exports=require("node:path")},97742:e=>{"use strict";e.exports=require("node:process")},41041:e=>{"use strict";e.exports=require("node:url")},22037:e=>{"use strict";e.exports=require("os")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},31173:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>d,pages:()=>u,routeModule:()=>p,tree:()=>c});var n=s(67096),a=s(16132),r=s(37284),i=s.n(r),o=s(32564),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["buy-me-coffee",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,33132)),"/home/runner/work/cafebabe/cafebabe/web/app/buy-me-coffee/page.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,99910)),"/home/runner/work/cafebabe/cafebabe/web/app/buy-me-coffee/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,53135)),"/home/runner/work/cafebabe/cafebabe/web/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"]}],u=["/home/runner/work/cafebabe/cafebabe/web/app/buy-me-coffee/page.tsx"],d="/buy-me-coffee/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/buy-me-coffee/page",pathname:"/buy-me-coffee",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},86839:(e,t,s)=>{Promise.resolve().then(s.bind(s,41748))},35303:()=>{},41748:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>BuyMeCoffeePage});var n,a=s(30784),r=s(9885),i=s(8301),o=s(12510),l=s(14047),c=s(10566),u=s(34626);let markStep=function(e){};var d=s(38323),m=s(22068);let p=(0,m.R)({abi:[{type:"constructor",inputs:[],stateMutability:"nonpayable"},{type:"receive",stateMutability:"payable"},{type:"function",name:"buyCoffee",inputs:[{name:"numCoffees",type:"uint256",internalType:"uint256"},{name:"userName",type:"string",internalType:"string"},{name:"twitterHandle",type:"string",internalType:"string"},{name:"message",type:"string",internalType:"string"}],outputs:[],stateMutability:"payable"},{type:"function",name:"getMemos",inputs:[{name:"index",type:"uint256",internalType:"uint256"},{name:"size",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct Memo[]",components:[{name:"numCoffees",type:"uint256",internalType:"uint256"},{name:"userName",type:"string",internalType:"string"},{name:"twitterHandle",type:"string",internalType:"string"},{name:"message",type:"string",internalType:"string"},{name:"time",type:"uint256",internalType:"uint256"},{name:"userAddress",type:"address",internalType:"address"}]}],stateMutability:"view"},{type:"function",name:"memos",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"numCoffees",type:"uint256",internalType:"uint256"},{name:"userName",type:"string",internalType:"string"},{name:"twitterHandle",type:"string",internalType:"string"},{name:"message",type:"string",internalType:"string"},{name:"time",type:"uint256",internalType:"uint256"},{name:"userAddress",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"modifyMemoMessage",inputs:[{name:"index",type:"uint256",internalType:"uint256"},{name:"message",type:"string",internalType:"string"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address payable"}],stateMutability:"view"},{type:"function",name:"price",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"removeMemo",inputs:[{name:"index",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"withdrawTips",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"BuyMeACoffeeEvent",inputs:[{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"price",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"NewMemo",inputs:[{name:"userAddress",type:"address",indexed:!0,internalType:"address"},{name:"time",type:"uint256",indexed:!1,internalType:"uint256"},{name:"numCoffees",type:"uint256",indexed:!1,internalType:"uint256"},{name:"userName",type:"string",indexed:!1,internalType:"string"},{name:"twitterHandle",type:"string",indexed:!1,internalType:"string"},{name:"message",type:"string",indexed:!1,internalType:"string"}],anonymous:!1},{type:"error",name:"InsufficientFunds",inputs:[]},{type:"error",name:"InvalidArguments",inputs:[{name:"message",type:"string",internalType:"string"}]},{type:"error",name:"OnlyOwner",inputs:[]}],[d.L.id]:{chain:d.L,address:"0xcE0EBD0282e247553eb8fDdeE3281b5EC09ddD16"}}),_hooks_useOnchainCoffeeMemos=function(){let e=p();markStep("useReadContract.refetchMemos");let t=(0,u.u)({address:"ready"===e.status?e.address:void 0,abi:e.abi,functionName:"getMemos",args:[BigInt(0),BigInt(25)]});return markStep("useReadContract.refetchMemos"),(0,r.useMemo)(()=>({memos:"success"===t.status?t.data:[],refetchMemos:t.refetch}),[t])};var f=s(81882),h=s(90226),x=s(75546);function InputText({id:e,placeholder:t,onChange:s,disabled:n,required:r=!1}){return a.jsx("input",{type:"text",id:e,className:(0,c.Z)(["block w-full rounded-lg border border-gray-600 bg-boat-color-gray-900","p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"]),placeholder:t,onChange:s,disabled:n,required:r})}function Label({htmlFor:e,children:t}){return a.jsx("label",{htmlFor:e,className:"mb-2 block text-sm font-medium text-white",children:t})}function TextArea({id:e,placeholder:t,onChange:s,disabled:n,required:r}){return a.jsx("textarea",{id:e,className:(0,c.Z)(["block w-full rounded-lg border border-gray-600 bg-boat-color-gray-900","p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"]),placeholder:t,onChange:s,disabled:n,required:r})}var b=s(79130);function Step({status:e,icon:t,helpText:s,children:n}){return(0,a.jsxs)(a.Fragment,{children:[a.jsx("h2",{className:"mb-5 w-full text-center text-2xl font-semibold text-white",children:e}),a.jsx("div",{className:"text-center text-6xl",children:t}),a.jsx("div",{className:"my-4 text-center text-sm text-gray-400",children:s}),n]})}var g=s(91105),y=s(8225),j=s(58312),w=s(76091),v=s(28219);function TransactionSteps({transactionStep:e,coffeeCount:t,resetContractForms:s,gasCost:r}){if(e===n.START)return a.jsx(Step,{status:"Coffee brewing...",icon:"☕",helpText:"Please confirm transaction in your wallet",children:a.jsx(h.Z,{buttonContent:a.jsx("span",{children:"Transaction pending"}),icon:a.jsx(b.WID,{width:15,height:15}),variant:"secondary"})});if(e===n.COMPLETE)return a.jsx(Step,{status:`You bought ${t} coffee${t>1?"s":""}!`,icon:"\uD83C\uDF81",helpText:"Thank you for supporting this endeavor!",children:a.jsx(h.Z,{buttonContent:"Send another coffee",onClick:s})});if(e===n.OUT_OF_GAS)return a.jsx(Step,{status:"You are out of gas",icon:"⛽",helpText:`Please fund your wallet with at least ${String(r)} ETH and try sending a coffee again.`,children:a.jsx(h.Z,{buttonContent:"Got it",onClick:s})});if(null===e)return null;throw Error("Missing TransactionStates handler")}!function(e){e[e.START=0]="START",e[e.COMPLETE=1]="COMPLETE",e[e.OUT_OF_GAS=2]="OUT_OF_GAS"}(n||(n={}));let C=[1,2,3,4],T={name:"",twitterHandle:"",message:"",coffeeCount:1},_components_FormBuyCoffee=function({refetchMemos:e}){let t=p(),{fields:s,setField:n,resetFields:i}=function(e){let[t,s]=(0,r.useState)(e),n=(0,r.useCallback)(()=>{s(e)},[s,e]),a=(0,r.useCallback)((e,n)=>{s({...t,[e]:n})},[t,s]);return(0,r.useMemo)(()=>({fields:t,setField:a,resetFields:n}),[t,a,n])}(T),o=(0,r.useCallback)(async()=>{i(),await e()},[e,i]),{disabled:l,transactionState:u,resetContractForms:d,onSubmitTransaction:m}=function({gasFee:e,contract:t,name:s,arguments:n,enableSubmit:a,reset:i}){let[o,l]=(0,r.useState)(null),c=(0,v.p)(e),{data:u}=(0,y.G)({address:"ready"===t.status?t.address:void 0,abi:t.abi,functionName:s,args:n,query:{enabled:a&&"ready"===t.status},value:e}),{writeContract:d,data:m,status:p,error:f}=(0,j.S)(),{status:h}=(0,w.A)({hash:m,query:{enabled:!!m}}),x="ready"!==t.status||"pending"===p||!c,b=(0,r.useCallback)(e=>{e.preventDefault();let t=u?.request;t?(d(u?.request),l(0)):l(null)},[u,d]),C=(0,r.useCallback)(()=>{l(null)},[]);return(0,r.useEffect)(()=>{(async function(){""!==m&&("error"===h&&(f instanceof g.mk&&f.message.toLowerCase().includes("out of gas")?l(2):l(null)),"success"===h&&l(1),await i())})()},[m,i,l,h,f]),(0,r.useMemo)(()=>({disabled:x,transactionState:o,resetContractForms:C,onSubmitTransaction:b}),[b,o,x,C])}({gasFee:(0,f.f)(String(1e-4*s.coffeeCount)),contract:t,name:"buyCoffee",arguments:[s.coffeeCount,s.name,s.twitterHandle,s.message],enableSubmit:""!==s.name&&""!==s.message,reset:o});return null!==u?a.jsx(TransactionSteps,{transactionStep:u,coffeeCount:s.coffeeCount,resetContractForms:d,gasCost:1e-4}):(0,a.jsxs)(a.Fragment,{children:[a.jsx("h2",{className:"mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left",children:"Buy Me a Coffee!"}),(0,a.jsxs)("form",{onSubmit:m,className:"w-full",children:[(0,a.jsxs)("div",{className:"my-4 items-center lg:flex lg:gap-4",children:[a.jsx("div",{className:"text-center text-4xl lg:text-left",children:"☕"}),a.jsx("div",{className:"mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left",children:"X"}),a.jsx("div",{className:"mx-auto flex max-w-[300px] gap-3 lg:max-w-max",children:C.map(e=>a.jsx("button",{type:"button",className:(0,c.Z)(`${s.coffeeCount===e?"bg-gradient-2":"border border-boat-color-orange"} block h-[40px] w-full rounded lg:w-[40px]`),onClick:()=>n("coffeeCount",e),children:e},`num-coffee-btn-${e}`))})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"mb-5",children:[a.jsx(Label,{htmlFor:"name",children:"Name"}),a.jsx(InputText,{id:"name",placeholder:"Name",onChange:e=>n("name",e.target.value),disabled:l,required:!0})]}),(0,a.jsxs)("div",{className:"mb-5",children:[a.jsx(Label,{htmlFor:"twitterHandle",children:"Twitter handle (Optional)"}),a.jsx(InputText,{id:"twitterHandle",placeholder:"@",onChange:e=>{n("twitterHandle",e.target.value)},disabled:l})]}),(0,a.jsxs)("div",{className:"mb-5",children:[a.jsx(Label,{htmlFor:"message",children:"Message"}),a.jsx(TextArea,{id:"message",placeholder:"Say something",onChange:e=>n("message",e.target.value),disabled:l,required:!0})]}),a.jsx(x.Z,{contract:t,amount:1e-4}),a.jsx(h.Z,{buttonContent:(0,a.jsxs)(a.Fragment,{children:["Send ",s.coffeeCount," coffee",s.coffeeCount>1?"s":null," for"," ",String((1e-4*s.coffeeCount).toFixed(4))," ETH"]}),type:"submit",disabled:l})]})]})]})};var M=s(23716);let _components_MemoCard=function({numCoffees:e,twitterHandle:t,message:s,userAddress:n,time:r}){let i=new Date(1e3*Number(r)),o=Number(e);return(0,a.jsxs)("li",{className:"flex w-full flex-col items-start gap-4",children:[(0,a.jsxs)("div",{className:"w-full grow items-center justify-between lg:flex",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[a.jsx(M.qE,{address:n}),(0,a.jsxs)("div",{className:"inline-flex items-start gap-1 md:flex",children:[a.jsx("span",{className:"text-3 text-bold truncate text-wrap font-bold text-boat-color-palette-foreground",children:a.jsx(M.VG,{address:n})}),a.jsx("span",{className:"text-3 line-clamp-1 flex-1 truncate text-wrap break-all font-normal text-boat-color-palette-foregroundmuted",children:t?` (@${t})`:null}),(0,a.jsxs)("span",{className:"text-3 whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted",children:["bought ",o," coffee",o>1?"s":null]})]})]}),a.jsx("div",{className:"text-3 ml-[43px] whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted",children:i.toDateString()})]}),a.jsx("div",{className:(0,c.W)(["flex w-full items-center rounded-2xl border-2","border-solid border-[color:var(--boat-color-foregroundMuted,#8A919E)] p-6 backdrop-blur-[20px]"]),children:a.jsx("p",{className:"flex w-[0px] shrink grow items-start gap-1",children:a.jsx("span",{className:(0,c.W)(["truncate whitespace-nowrap text-wrap text-base ","font-normal not-italic leading-6 text-boat-color-palette-foreground"]),children:s})})})]})},_components_Memos=function({memos:e}){return e?a.jsx("ul",{className:"flex w-full flex-col items-center gap-10",children:e.map(e=>a.jsx(_components_MemoCard,{numCoffees:e.numCoffees,userName:e.userName,twitterHandle:e.twitterHandle,message:e.message,userAddress:e.userAddress,time:e.time},e.time.toString())).reverse().slice(0,8)}):null};function BuyMeCoffeeContractDemo(){let{memos:e,refetchMemos:t}=_hooks_useOnchainCoffeeMemos();return(0,a.jsxs)("div",{className:(0,c.W)(["grid grid-cols-1 items-stretch justify-start","md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg"]),children:[(0,a.jsxs)("section",{className:(0,c.W)(["rounded-lg border border-solid border-boat-color-palette-line","bg-boat-color-palette-backgroundalternate p-10"]),children:[a.jsx("h2",{className:"mb-5 w-fit text-2xl font-semibold text-white",children:"Messages from supporters"}),e?.length>0&&a.jsx(_components_Memos,{memos:e})]}),a.jsx("aside",{children:a.jsx("div",{className:(0,c.W)(["mt-10 rounded-lg border border-solid border-boat-color-palette-line","bg-boat-color-palette-backgroundalternate p-10 md:mt-0"]),children:a.jsx(_components_FormBuyCoffee,{refetchMemos:t})})})]})}var N=s(32208),A=s(5732);let _=`\`\`\`solidity
if (msg.value < price * numCoffees) {
  revert InsufficientFunds();
}`,k=`\`\`\`solidity
if (bytes(userName).length == 0 && bytes(message).length == 0) {
  revert InvalidArguments("Invalid userName or message");
}`,S=`\`\`\`solidity
if (bytes(userName).length > 75 || bytes(twitterHandle).length > 75 || bytes(message).length > 1024) {
  revert InvalidArguments("Input parameter exceeds max length");
}
`,P=`\`\`\`solidity
struct Memo {
  uint256 numCoffees;
  string userName;
  string twitterHandle;
  string message;
  uint256 time;
  address userAddress;
}
`,q=`\`\`\`solidity
memos.push(Memo(numCoffees, userName, twitterHandle, message, block.timestamp, msg.sender));
`,L=`\`\`\`solidity
if (memos.length == 0) {
  return memos;
}
`,E=`\`\`\`solidity
if (index >= memos.length) {
  revert InvalidArguments("Invalid index");
}

if (size > 25) {
  revert InvalidArguments("size must be <= 25");
}
`,B=`\`\`\`solidity
uint256 effectiveSize = size;
if (index + size > memos.length) {
    // Adjust the size if it exceeds the array's bounds
    effectiveSize = memos.length - index;
}
`,H=`\`\`\`solidity
Memo[] memory slice = new Memo[](effectiveSize);
for (uint256 i = 0; i < effectiveSize; i++) {
    slice[i] = memos[index + i];
}

return slice;
`;function Guide(){(0,A.Bn)();let e=(0,r.useMemo)(()=>[{href:"#contract-summary",label:"Contract Summary"},{href:"#buyCoffee-explanation",label:(0,a.jsxs)(a.Fragment,{children:[a.jsx("code",{className:"text-xs",children:"buyCoffee"})," Explanation"]})},{href:"#getMemos-explanation",label:(0,a.jsxs)(a.Fragment,{children:[a.jsx("code",{className:"text-xs",children:"getMemos"})," Explanation"]})}],[]);return(0,a.jsxs)("div",{children:[a.jsx(A.H3,{id:"guide",children:"Guide"}),(0,a.jsxs)("div",{className:"gap-16 lg:flex",children:[(0,a.jsxs)("main",{className:"w-full flex-shrink-0 flex-grow xl:max-w-[900px]",children:[a.jsx(A.Hr,{}),(0,a.jsxs)(A.$0,{id:"contract-summary",children:[a.jsx(A.H4,{children:"Contract Summary"}),(0,a.jsxs)(A.P,{children:["The ",a.jsx("code",{children:"BuyMeACoffee.sol"})," smart contract allows users to send ETH donations to the owner of the contract. Users who donate ETH by buying the owner a contract can also submit a message."]})]}),(0,a.jsxs)(A.$0,{id:"buyCoffee-explanation",children:[(0,a.jsxs)(A.H4,{children:[a.jsx("code",{className:"text-xl",children:"buyCoffee"})," Explanation"]}),(0,a.jsxs)(A.P,{children:[a.jsx("code",{children:"buyCoffee"})," is a ",a.jsx("code",{children:"public payable"})," function that allows a user to specify the number of coffees they would like to buy for the owner of the contract. This acts as a donation mechanism, where the user supplies enough ETH to cover the cost of the number of coffees specified. The contract"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L81-L83",children:"ensures"})," ","that enough ETH has been provided in the function call."]}),a.jsx(N.Z,{code:_,language:"solidity"}),(0,a.jsxs)(A.P,{children:["In addition, the user provides their name, twitter handle, and a custom message that can be retrieved form the contract to display later. The ",a.jsx("code",{children:"buyCoffee"})," ","function ensures that a non-empty name and message"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L87-L89",children:"have been provided"}),"."]}),a.jsx(N.Z,{code:k,language:"solidity"}),(0,a.jsxs)(A.P,{children:["There is also a check to make sure the provided name, twitter handle, and message"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L91-L93",children:"do not exceed"})," ","75 bytes."]}),a.jsx(N.Z,{code:S,language:"solidity"}),(0,a.jsxs)(A.P,{children:["The message is then instantiated as a ",a.jsx("code",{children:"Memo"})," struct object, which consists of the following"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L27-L34",children:"fields"}),":"]}),a.jsx(N.Z,{code:P,language:"solidity"}),(0,a.jsxs)(A.P,{children:["The new ",a.jsx("code",{children:"Memo"})," struct is then"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L95",children:"pushed"})," ","into the ",a.jsx("code",{children:"memos"})," storage variable."]}),a.jsx(N.Z,{code:q,language:"solidity"})]}),(0,a.jsxs)(A.$0,{id:"getMemos-explanation",children:[(0,a.jsxs)(A.H4,{children:[a.jsx("code",{className:"text-xl",children:"getMemos"})," Explanation"]}),(0,a.jsxs)(A.P,{children:[a.jsx("code",{children:"getMemos"})," is a ",a.jsx("code",{children:"public view"})," function that returns an array of"," ",a.jsx("code",{children:"Memo"})," elements from the",a.jsx("code",{children:"memos"})," storage variable. The user provides an index and size parameter, which dictate the start position and total number of ",a.jsx("code",{children:"Memo"})," elements to return."]}),(0,a.jsxs)(A.P,{children:["If the total length of the ",a.jsx("code",{children:"memos"})," storage variable is 0, then the"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L164",children:"empty array"})," ","will be returned."]}),a.jsx(N.Z,{code:L,language:"solidity"}),(0,a.jsxs)(A.P,{children:["If the provided index exceeds the total length of the ",a.jsx("code",{children:"memos"})," storage variable, then the call will"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L168",children:"revert"}),". Additionally, if the size specified exceeds 25, the call will",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L172",children:"revert"}),"."]}),a.jsx(N.Z,{code:E,language:"solidity"}),(0,a.jsxs)(A.P,{children:[a.jsx("code",{children:"getMemos"})," then calculates the total number of elements that can be returned given the index and size, as the requested number of elements may exceeds the end of the ",a.jsx("code",{children:"memos"}),"array. If that occurs, the total number of elements to return"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L177-L178",children:"will be truncated"})," ","to the total number of elements remaining in the ",a.jsx("code",{children:"memos"})," storage variable."]}),a.jsx(N.Z,{code:B,language:"solidity"}),(0,a.jsxs)(A.P,{children:["Once the number of elements to return has been calculated, the function will iterate through the ",a.jsx("code",{children:"memos"})," array,"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L181-L184",children:"copying elements"})," ","into the temporary memory array. Once the loop has completed, the temporary memory array"," ",a.jsx(A.A,{href:"https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L186",children:"will be returned"})," ","."]}),a.jsx(N.Z,{code:H,language:"solidity"})]})]}),a.jsx(A.o5,{title:"Guide",contents:e})]})]})}function BuyMeCoffeePage(){let[e,t]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{t(!0)},[]),e)?(0,a.jsxs)(a.Fragment,{children:[a.jsx(o.Z,{}),(0,a.jsxs)(l.Z,{children:[a.jsx(i.Z,{pageName:"Buy Me A Coffee",pageUrl:"buy-me-coffee"}),a.jsx(BuyMeCoffeeContractDemo,{}),a.jsx(Guide,{})]})]}):null}},90226:(e,t,s)=>{"use strict";s.d(t,{Z:()=>Button});var n=s(30784),a=s(10566);function Button({buttonContent:e,type:t="button",className:s,onClick:r,variant:i="primary",disabled:o=!1,icon:l,rounded:c=!0}){return(0,n.jsxs)("button",{type:t,onClick:r,className:(0,a.Z)("flex w-full items-center justify-center","py-4 text-sm","primary"===i?"bg-white":"bg-black","primary"===i?"text-black":"text-white",o&&"primary"===i?"bg-gray-400":null,o&&"secondary"===i?"bg-boat-color-gray-900":null,c?"rounded-full":null,s),disabled:o,children:[l?n.jsx("span",{className:"mr-2",children:l}):null,e]})}},99910:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Layout,metadata:()=>a});var n=s(45629);let a=(0,n.N)({title:"Buy me a coffee - BOAT",description:"Save weeks of initial app setup and the hassle of integrating onchain components with web2 infrastructure.",images:"themes.png",pathname:"buy-me-coffee"});async function Layout({children:e}){return e}},33132:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>l});var n=s(95153);let a=(0,n.createProxy)(String.raw`/home/runner/work/cafebabe/cafebabe/web/app/buy-me-coffee/page.tsx`),{__esModule:r,$$typeof:i}=a,o=a.default,l=o},45629:(e,t,s)=>{"use strict";s.d(t,{N:()=>generateMetadata});let n=process.env.BOAT_DEPLOY_URL??process.env.VERCEL_URL,a=n?`https://${n}`:`http://localhost:${process.env.PORT??3e3}`,generateMetadata=({title:e="Build Onchain Apps",description:t="The easier way to build onchain apps.",frame:s={},images:n,url:r="https://github.com/coinbase/build-onchain-apps",pathname:i})=>{let o=Array.isArray(n)?n:[n];return{metadataBase:new URL(a),title:e,description:t,openGraph:{url:`${r}${i??""}`,title:e,description:t,images:o.map(e=>`${r}/social/${e}`)},other:{...s}}}}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[8998,3196,6158,1940,7228,8461,7856,1440,1771,7351,2510,755,2068,5546],()=>__webpack_exec__(31173));module.exports=s})();