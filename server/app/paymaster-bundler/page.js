(()=>{var e={};e.id=2398,e.ids=[2398],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},49411:e=>{"use strict";e.exports=require("node:path")},97742:e=>{"use strict";e.exports=require("node:process")},41041:e=>{"use strict";e.exports=require("node:url")},22037:e=>{"use strict";e.exports=require("os")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},29687:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var r=a(67096),s=a(16132),i=a(37284),o=a.n(i),n=a(32564),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);a.d(t,l);let c=["",{children:["paymaster-bundler",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,49821)),"/home/runner/work/cafebabe/cafebabe/web/app/paymaster-bundler/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,53135)),"/home/runner/work/cafebabe/cafebabe/web/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,9291,23)),"next/dist/client/components/not-found-error"]}],d=["/home/runner/work/cafebabe/cafebabe/web/app/paymaster-bundler/page.tsx"],u="/paymaster-bundler/page",p={require:a,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/paymaster-bundler/page",pathname:"/paymaster-bundler",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},37731:(e,t,a)=>{Promise.resolve().then(a.bind(a,60276))},60276:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>PaymasterBundlerPage});var r=a(30784),s=a(8301),i=a(12510),o=a(14047),n=a(9885),l=a(32208),c=a(5732);let d=`\`\`\`javascript
import { ENTRYPOINT_ADDRESS_V06, UserOperation } from "permissionless";
import {
  Address,
  BlockTag,
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
} from "viem";
import { baseSepolia } from "viem/chains";
import {client} from "./config"
import {
  coinbaseSmartWalletABI,
  coinbaseSmartWalletProxyBytecode,
  coinbaseSmartWalletV1Implementation,
  erc1967ProxyImplementationSlot,
  magicSpendAddress
} from "./constants"
import { myNFTABI, myNFTAddress } from "./myNFT";
 
export async function willSponsor({
  chainId,
  entrypoint,
  userOp,
}: { chainId: number; entrypoint: string; userOp: UserOperation<"v0.6"> }) {
  // check chain id
  if (chainId !== baseSepolia.id) return false;
  // check entrypoint
  // not strictly needed given below check on implementation address, but leaving as example
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase())
    return false;
 
  try {
    // check the userOp.sender is a proxy with the expected bytecode
    const code = await client.getBytecode({ address: userOp.sender });
    if (code != coinbaseSmartWalletProxyBytecode) return false;
 
    // check that userOp.sender proxies to expected implementation
    const implementation = await client.request<{
      Parameters: [Address, Hex, BlockTag];
      ReturnType: Hex;
    }>({
      method: "eth_getStorageAt",
      params: [userOp.sender, erc1967ProxyImplementationSlot, "latest"],
    });
    const implementationAddress = decodeAbiParameters(
      [{ type: "address" }],
      implementation,
    )[0];
    if (implementationAddress != coinbaseSmartWalletV1Implementation)
      return false;
 
    // check that userOp.callData is making a call we want to sponsor
    const calldata = decodeFunctionData({
      abi: coinbaseSmartWalletABI,
      data: userOp.callData,
    });
 
    // keys.coinbase.com always uses executeBatch
    if (calldata.functionName !== "executeBatch") return false;
    if (!calldata.args || calldata.args.length == 0) return false;
 
    const calls = calldata.args[0] as {
      target: Address;
      value: bigint;
      data: Hex;
    }[];
    // modify if want to allow batch calls to your contract
    if (calls.length > 2) return false;
 
    let callToCheckIndex = 0;
    if (calls.length > 1) {
      // if there is more than one call, check if the first is a magic spend call
      if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase())
        return false;
      callToCheckIndex = 1;
    }
 
    if (
      calls[callToCheckIndex].target.toLowerCase() !==
      myNFTAddress.toLowerCase()
    )
      return false;
 
    const innerCalldata = decodeFunctionData({
      abi: myNFTABI,
      data: calls[callToCheckIndex].data,
    });
    if (innerCalldata.functionName !== "safeMint") return false;
 
    return true;
  } catch (e) {
    console.error(\`willSponsor check failed: \${e}\`);
    return false;
  }
}
\`\`\``,u=`\`\`\`javascript
import { paymasterClient } from "./config";
import { willSponsor } from "./utils";
 
export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;
  console.log(req.params);
  if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
    return Response.json({ error: "Not a sponsorable operation" });
  }
 
  if (method === "pm_getPaymasterStubData") {
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}
\`\`\``,p=`\`\`\`javascript
import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useMemo, useState } from "react";
import { CallStatus } from "./CallStatus";
import { myNFTABI, myNFTAddress } from "./myNFT";
 
export function App() {
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: \`\${document.location.origin}/api/paymaster\`,
        },
      };
    }
    return {};
  }, [availableCapabilities]);
 
  return (
    <div>
      <h2>Transact With Paymaster</h2>
      <p>{JSON.stringify
        <p>{JSON.stringify(capabilities)}</p>
(capabilities)}</p>
      <div>
        <button
          onClick={() => {
            writeContracts({
              contracts: [
                {
                  address: myNFTAddress,
                  abi: myNFTABI,
                  functionName: "safeMint",
                  args: [account.address],
                },
              ],
              capabilities,
            });
          }}
        >
          Mint
        </button>
        {id && <CallStatus id={id} />}
      </div>
    </div>
  );
}
\`\`\``;function NewGuide(){(0,c.Bn)();let e=(0,n.useMemo)(()=>[{href:"#introduction",label:"Paymasters (Sponsored Transactions)"},{href:"#choosing-paymaster",label:"Choose a paymaster service provider"},{href:"#setting-proxy",label:"(Recommended) Setup your paymaster proxy"},{href:"#send-eip-5792-requests",label:"Send EIP-5792 Requests"}],[]);return(0,r.jsxs)("div",{children:[r.jsx(c.H3,{id:"guide",children:"Guide to Using Smart Wallets with Sponsored Transactions"}),(0,r.jsxs)("div",{className:"gap-16 lg:flex",children:[(0,r.jsxs)("main",{className:"w-full flex-shrink-0 flex-grow xl:max-w-[900px]",children:[r.jsx(c.Hr,{}),(0,r.jsxs)(c.$0,{id:"introduction",children:[r.jsx(c.H4,{children:"Paymasters (Sponsored Transactions)"}),(0,r.jsxs)(c.P,{children:["One of the biggest UX enhancements unlocked by Smart Wallet is the ability for app developers to sponsor their users' transactions. If your app supports Smart Wallet, you can start sponsoring your users' transactions by using"," ",r.jsx(c.A,{href:"https://www.erc7677.xyz/introduction",children:"standardized paymaster service communication"}),r.jsx(c.A,{href:"https://www.eip5792.xyz/introduction",children:"enabled by new wallet RPC methods"}),". This code is also in our"," ",r.jsx(c.A,{href:"https://github.com/wilsoncusack/wagmi-scw/",children:"Wagmi Smart Wallet template"}),"."]})]}),(0,r.jsxs)(c.$0,{id:"choosing-paymaster",children:[r.jsx(c.H4,{children:"1. Choose a Paymaster Service Provider"}),r.jsx(c.P,{children:"As a prerequisite, you'll need to obtain a paymaster service URL from a paymaster service provider. To be compatible with Smart Wallet, the paymaster provider you choose must be ERC-7677-compliant."}),(0,r.jsxs)(c.P,{children:["We recommend the ",r.jsx(c.A,{href:"https://login.coinbase.com",children:"Coinbase Developer Platform"})," ","paymaster. You can find a full list of ERC-7677-compliant paymaster services"," ",r.jsx(c.A,{href:"https://www.erc7677.xyz/ecosystem/paymasters",children:"here"}),"."]}),r.jsx(c.P,{children:"Once you choose a paymaster service provider and obtain a paymaster service URL, you can proceed to integration."})]}),(0,r.jsxs)(c.$0,{id:"setting-proxy",children:[r.jsx(c.H4,{children:"2. (Recommended) Set Up Your Paymaster Proxy"}),r.jsx(c.P,{children:"Creating an API to proxy calls to your paymaster service is important for two reasons:"}),(0,r.jsxs)(c.Ul,{children:[r.jsx(c.Li,{children:"It allows you to protect any API secret."}),r.jsx(c.Li,{children:"It allows you to add extra validation on what requests you want to sponsor."})]}),r.jsx(c.H4,{children:"Validate UserOperation"}),(0,r.jsxs)(c.P,{children:['Before we write our proxy, let\'s write a willSponsor function to add some extra validation. The policies on many paymaster services are quite simple and limited. As your API will be exposed on the web, you want to make sure it cannot be abused: called to sponsor transactions you do not want to fund. The checks below are a bit tedious, but highly recommended to be safe. See "Trust and Validation"'," ",r.jsx(c.A,{href:"https://hackmd.io/@AhweV9sISeevhvrtVPCGDw/BynRsX7Ca#Trust-and-Validation",children:"here"})," ","for more on this. The code below is built specifically for Smart Wallets; it would need to be updated to support other smart accounts."]}),r.jsx(l.Z,{code:d,language:"javascript"})]}),(0,r.jsxs)(c.$0,{id:"setting-proxy",children:[r.jsx(c.H4,{children:"Create Proxy"}),r.jsx(c.P,{children:"The proxy you create will need to handle the pm_getPaymasterStubData and pm_getPaymasterData JSON-RPC requests specified by ERC-7677."}),r.jsx(l.Z,{code:u,language:"javascript"})]}),(0,r.jsxs)(c.$0,{id:"send-eip-5792-requests",children:[r.jsx(c.H4,{children:"3. Send EIP-5792 Requests with a Paymaster Service Capability"}),r.jsx(c.P,{children:"Once you have your paymaster service set up, you can now pass its URL along to Wagmi's useWriteContracts hook. If you set up a proxy in your app's backend as recommended in step (2) above, you'll want to pass in the proxy URL you created."}),r.jsx(l.Z,{code:p,language:"javascript"}),r.jsx(c.P,{children:"That's it! Smart Wallet will handle the rest. If your paymaster service is able to sponsor the transaction, Smart Wallet will indicate to your user that the transaction is sponsored."})]})]}),r.jsx(c.o5,{title:"Guide to Sponsored Transactions",contents:e})]}),(0,r.jsxs)(c.P,{children:[r.jsx("strong",{children:"See full documentation here:"})," ",r.jsx(c.A,{href:"https://www.smartwallet.dev/",children:"Smart Wallet Documentation"})," "]})]})}var m=a(10566),h=a(31004),x=a(9883),y=a(75546),b=a(32268),f=a(38323),g=a(22068);let w=(0,g.R)({abi:[{stateMutability:"nonpayable",type:"function",inputs:[{name:"to",type:"address"}],name:"safeMint",outputs:[]}],[f.L.id]:{chain:f.L,address:"0x119Ea671030FBf79AB93b436D2E20af6ea469a19"}});var j=a(2031);function CallStatus({id:e}){let{data:t}=(0,j.Q)({id:e,query:{refetchInterval:e=>e.state.data?.status!=="CONFIRMED"&&1e3}});return(0,r.jsxs)("div",{children:[r.jsx("br",{}),r.jsx("strong",{children:"Status:"})," ",t?.status??"loading"]})}let v=function(){let e=(0,b._F)();return e===b.qA.localhost}(),P=v?process.env.NEXT_PUBLIC_PAYMASTER_URL:`https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/paymaster-proxy`;function PaymasterBundlerDemo(){let{address:e}=(0,h.m)(),{data:t,writeContracts:a}=(0,x.h)(),s=w();return"ready"!==s.status?(console.error("Contract is not ready"),null):(0,r.jsxs)("div",{className:(0,m.Z)("flex w-full flex-col items-center justify-center text-white"),children:[(0,r.jsxs)("section",{className:(0,m.Z)("mb-5 w-full max-w-3xl rounded-lg bg-gray-900 p-6 shadow-md"),children:[r.jsx("header",{children:r.jsx("h2",{className:(0,m.Z)("border-b-2 border-gray-700 pb-2 text-xl font-semibold"),children:"Account Details"})}),e&&(0,r.jsxs)("div",{className:(0,m.Z)("mt-2 text-lg"),children:[r.jsx("strong",{children:"Smart Wallet Address:"})," ",e]})]}),(0,r.jsxs)("section",{className:(0,m.Z)("w-full max-w-3xl rounded-lg bg-gray-900 p-6 shadow-md"),children:[r.jsx("header",{children:r.jsx("h1",{className:(0,m.Z)("border-b-2 border-gray-700 pb-2 text-center text-2xl font-bold"),children:"Mint NFTs with Coinbase Paymaster"})}),!e&&r.jsx(y.G,{children:"Please connect your wallet to continue."}),r.jsx("button",{type:"button",className:(0,m.Z)("mt-4 block w-full rounded-full py-3.5 text-lg font-bold text-white transition duration-300",e?"cursor-pointer bg-blue-600 hover:bg-blue-700":"cursor-not-allowed bg-gray-600"),onClick:e?()=>{a({contracts:[{address:s.address,abi:s.abi,functionName:"safeMint",args:[e]}],capabilities:{paymasterService:{url:P}}})}:void 0,disabled:!e,children:"Mint NFT"}),t&&r.jsx(CallStatus,{id:t})]})]})}function PaymasterBundlerPage(){return(0,r.jsxs)(r.Fragment,{children:[r.jsx(i.Z,{}),(0,r.jsxs)(o.Z,{children:[r.jsx(s.Z,{pageName:"Paymaster Bundler",pageUrl:"paymaster-bundler",wip:!0}),r.jsx("div",{className:"rounded-lg bg-gray-900 px-4 py-6 text-white",children:r.jsx(PaymasterBundlerDemo,{})}),r.jsx(NewGuide,{})]})]})}},49821:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>o,__esModule:()=>i,default:()=>l});var r=a(95153);let s=(0,r.createProxy)(String.raw`/home/runner/work/cafebabe/cafebabe/web/app/paymaster-bundler/page.tsx`),{__esModule:i,$$typeof:o}=s,n=s.default,l=n}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),a=t.X(0,[8998,3196,6158,1940,7228,8461,1440,7194,7351,2510,755,2068,5546],()=>__webpack_exec__(29687));module.exports=a})();