(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{54638:function(e,s,t){Promise.resolve().then(t.bind(t,2986))},2986:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return HomePage}});var n=t(57437),l=t(18269),a=t(46522);function HomePage(){let e=(0,l.m)();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.Z,{}),(0,n.jsx)("main",{className:"container mx-auto flex flex-col px-8 py-16",children:(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{className:"text-xl",children:"Developer information"}),(0,n.jsx)("br",{}),(0,n.jsx)("h3",{className:"text-lg",children:"Account"}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("b",{children:"status"}),": ",e.status]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("b",{children:"addresses"}),": ",JSON.stringify(e.addresses)]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("b",{children:"chainId"}),": ",e.chainId]})]})]})})]})}},79801:function(e,s,t){"use strict";t.d(s,{Z:function(){return header_AccountConnect}});var n=t(57437),l=t(99334),a=t(87923),r=t(18269),i=t(81973),c=t(41684),d=t(6613),o=t(47331),x=t(91355),h=t(57042),u=t(2265),f=t(69394);function AccountInfoPanel(){let{address:e}=(0,r.m)(),{disconnect:s}=(0,c.q)(),t=(0,u.useCallback)(()=>{s()},[s]);return e?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"mb-4 inline-flex items-center justify-start gap-2",children:[(0,n.jsx)(o.qE,{address:e,className:"h-10 w-10 rounded-full"}),(0,n.jsxs)("div",{className:"inline-flex flex-col items-start justify-center gap-1",children:[(0,n.jsx)("div",{className:"font-inter w-32 text-base font-medium text-white",children:(0,n.jsx)(o.VG,{address:e})}),(0,n.jsx)("span",{className:"font-inter w-32 text-sm font-medium text-zinc-400",children:(0,n.jsx)(o.VG,{address:e,showAddress:!0})})]})]}),(0,n.jsx)("hr",{className:"h-px self-stretch border-transparent bg-zinc-400 bg-opacity-20"}),(0,n.jsxs)("button",{type:"button","aria-label":"Disconnect",className:"my-4 inline-flex items-center justify-between self-stretch",onClick:t,children:[(0,n.jsx)("span",{className:"font-inter w-32 text-left text-base font-medium text-white",children:"Log out"}),(0,n.jsx)(f.iz5,{className:"relative h-4 w-4"})]})]}):null}let j={marginTop:"-22px"};function AccountDropdown(){let{address:e}=(0,r.m)();return(0,n.jsxs)(x.fC,{children:[(0,n.jsx)(x.xz,{asChild:!0,children:(0,n.jsx)("div",{className:"flex h-8 w-8 items-center justify-center",children:e&&(0,n.jsx)("button",{type:"button","aria-label":"Disconnect",children:(0,n.jsx)(o.qE,{address:e})})})}),(0,n.jsx)(x.Uv,{children:(0,n.jsx)(x.VY,{align:"end",sideOffset:40,className:(0,h.W)("h-42 inline-flex w-60 flex-col items-start justify-start","rounded-lg bg-neutral-900 bg-opacity-90 px-6 pb-2 pt-6 shadow backdrop-blur-2xl"),style:j,children:(0,n.jsx)(AccountInfoPanel,{})})})]})}var header_AccountConnect=function(){let e=(0,r.m)(),{status:s}=(0,i.$)(),{disconnect:t}=(0,c.q)(),o=(0,d.x)();return(0,n.jsx)("div",{className:"flex flex-grow",..."pending"===s&&{"aria-hidden":!0,style:{opacity:0,pointerEvents:"none",userSelect:"none"}},children:"disconnected"===e.status?(0,n.jsx)(l.XB,{}):"connected"===e.status&&o!==a.L.id?(0,n.jsx)("button",{onClick:()=>t(),type:"button",children:"Wrong network"}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"flex flex-grow flex-col md:hidden",children:(0,n.jsx)(AccountInfoPanel,{})}),(0,n.jsx)("div",{className:"flex hidden md:block",children:(0,n.jsx)(AccountDropdown,{})})]})})}},46522:function(e,s,t){"use strict";t.d(s,{Z:function(){return header_Header}});var n=t(57437),l=t(2265),a=t(57042),r=t(61396),i=t.n(r),c=t(79801);function NavbarLink(e){let{href:s,children:t,target:l,ariaLabel:a}=e;return(0,n.jsx)(i(),{href:s,className:"font-robotoMono px-0 text-center text-base font-normal text-white no-underline",target:l,"aria-label":a,children:t})}function NavbarTitle(){return(0,n.jsxs)("div",{className:"flex h-8 items-center justify-start gap-4 text-2xl",children:[(0,n.jsx)(i(),{href:"/",passHref:!0,className:"relative h-6 w-6","aria-label":"Home page",children:(0,n.jsx)("div",{className:"absolute size-6 rounded-full bg-white"})}),"cafebabe"]})}var header_Navbar=function(){return(0,n.jsx)("nav",{className:(0,a.W)("flex flex-1 flex-grow items-center justify-between","rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl"),children:(0,n.jsxs)("div",{className:"flex h-8 grow items-center justify-between gap-4",children:[(0,n.jsx)(NavbarTitle,{}),(0,n.jsx)("div",{className:"flex items-center justify-start gap-8",children:(0,n.jsx)(c.Z,{})})]})})},d=t(69394),o=t(59164);function NavbarMobile(){let[e,s]=(0,l.useState)(!1),t=(0,l.useCallback)(()=>s(e=>!e),[]);return e?(0,n.jsxs)("nav",{className:"sm:max-h-300 mx-2 flex flex-col gap-4 rounded-[25px] bg-black bg-opacity-50 p-2 backdrop-blur-2xl",children:[(0,n.jsx)("div",{className:"flex flex-1 flex-grow items-center justify-between rounded-[50px] border border-stone-300 bg-opacity-10 p-4 backdrop-blur-2xl",children:(0,n.jsxs)("div",{className:"h-38 flex grow items-center justify-between gap-4",children:[(0,n.jsx)(NavbarTitle,{}),(0,n.jsx)("button",{type:"button","aria-label":"Menu","data-state":"open",onClick:t,children:(0,n.jsx)(d.ypG,{width:"24",height:"24"})})]})}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("ul",{className:"mx-2 flex flex-col gap-4",children:[(0,n.jsx)("li",{className:"flex",children:(0,n.jsx)(NavbarLink,{href:"https://github.com/coinbase/build-onchain-apps",target:"_blank",children:(0,n.jsx)(d.wGg,{width:"24",height:"24"})})}),(0,n.jsx)("li",{className:"flex",children:(0,n.jsx)(NavbarLink,{href:"/#get-started",children:"Get Started"})}),(0,n.jsx)("li",{className:"flex",children:(0,n.jsxs)(o.fC,{className:"relative flex flex-grow flex-col",children:[(0,n.jsx)(o.aV,{className:(0,a.W)("flex flex-row space-x-2"),children:(0,n.jsxs)(o.ck,{children:[(0,n.jsxs)(o.xz,{className:"group flex items-center justify-start gap-1",children:[(0,n.jsx)("span",{className:"font-robotoMono text-center text-base font-normal text-white",children:"Experiences"}),(0,n.jsx)(d.v4q,{className:"transform transition duration-200 ease-in-out group-data-[state=open]:rotate-180",width:"16",height:"16"})]}),(0,n.jsx)(o.VY,{className:(0,a.W)("h-38 inline-flex flex-grow flex-col items-start justify-start gap-6","mt-4 rounded-lg p-6 shadow backdrop-blur-2xl")})]})}),(0,n.jsx)(o.l_,{className:(0,a.W)("flex flex-col justify-center")})]})})]}),(0,n.jsx)("div",{className:"mx-2 mt-4",children:(0,n.jsx)(c.Z,{})})]})]}):(0,n.jsx)("nav",{className:"flex flex-1 flex-grow items-center justify-between rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl mx-4",children:(0,n.jsxs)("div",{className:"flex h-8 grow items-center justify-between gap-4",children:[(0,n.jsx)(NavbarTitle,{}),(0,n.jsx)("button",{type:"button","aria-label":"Menu","data-state":"closed",onClick:t,children:(0,n.jsx)(d.RYk,{width:"24",height:"24"})})]})})}var header_Menu=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"fixed z-10 h-[72px] md:hidden",children:(0,n.jsx)(NavbarMobile,{})}),(0,n.jsx)("div",{className:"container fixed z-10 hidden h-[72px] md:block",children:(0,n.jsx)(header_Navbar,{})})]})},header_Header=function(e){let{ghost:s}=e,[t,a]=(0,l.useState)("at-top");return(0,l.useEffect)(()=>{let e=window.scrollY,handleScroll=()=>{let s=e<window.scrollY?"scrolling-down":"scrolling-up",t=window.scrollY<30?"at-top":s;e=window.scrollY,a(t)};return s?addEventListener("scroll",handleScroll,{passive:!0}):removeEventListener("scroll",handleScroll),handleScroll(),()=>removeEventListener("scroll",handleScroll)},[s]),(0,n.jsx)("header",{"data-scroll-state":t,className:"flex h-[120px] justify-center pt-8",children:(0,n.jsx)(header_Menu,{})})}}},function(e){e.O(0,[8310,2483,9971,2971,2472,1744],function(){return e(e.s=54638)}),_N_E=e.O()}]);