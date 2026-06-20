import{i as e}from"./preload-helper-DID7B_--.js";import{a as t}from"./iframe-Cqahbz2Y.js";import{Q as n,gn as r,mn as i,t as a}from"./lucide-react-A-gVFcX7.js";import{n as o,t as s}from"./cn-D1CVgcPL.js";import{a as c,t as l}from"./card-B3J5LTqr.js";function u({label:e,value:t,delta:n,trend:a=`up`,icon:o,accent:c=`cyan`}){let u=a===`up`?i:r;return(0,d.jsxs)(l,{className:`motion-border p-4`,children:[(0,d.jsxs)(`div`,{className:`relative z-10 flex items-start justify-between gap-3`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`p`,{className:`text-xs font-black uppercase tracking-[0.16em] text-muted`,children:e}),(0,d.jsx)(`p`,{className:`mt-3 font-mono text-3xl font-black leading-none`,children:t})]}),(0,d.jsx)(`div`,{className:s(`grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br to-white/[0.04]`,f[c]),children:(0,d.jsx)(o,{size:20})})]}),(0,d.jsxs)(`div`,{className:`relative z-10 mt-5 flex items-center gap-2 text-xs font-black text-muted`,children:[(0,d.jsx)(u,{size:15,className:a===`up`?`text-brand-3`:`text-danger`}),(0,d.jsx)(`span`,{children:n})]})]})}var d,f,p=e((()=>{d=t(),a(),c(),o(),f={cyan:`from-brand-2/24 text-brand-2`,violet:`from-brand/24 text-brand`,green:`from-brand-3/24 text-brand-3`,amber:`from-warning/24 text-warning`},u.__docgenInfo={description:``,methods:[],displayName:`StatCard`,props:{label:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`string`},description:``},delta:{required:!0,tsType:{name:`string`},description:``},trend:{required:!1,tsType:{name:`union`,raw:`"up" | "down"`,elements:[{name:`literal`,value:`"up"`},{name:`literal`,value:`"down"`}]},description:``,defaultValue:{value:`"up"`,computed:!1}},icon:{required:!0,tsType:{name:`LucideIcon`},description:``},accent:{required:!1,tsType:{name:`union`,raw:`"cyan" | "violet" | "green" | "amber"`,elements:[{name:`literal`,value:`"cyan"`},{name:`literal`,value:`"violet"`},{name:`literal`,value:`"green"`},{name:`literal`,value:`"amber"`}]},description:``,defaultValue:{value:`"cyan"`,computed:!1}}}}})),m,h,g,_,v;e((()=>{m=t(),a(),p(),h={title:`Dashboard/StatCard`,component:u,parameters:{layout:`centered`,docs:{description:{component:`Carte statistique animée du dashboard. À utiliser pour les compteurs réels: notes, tâches, projets, API, qualité.`}}},tags:[`autodocs`],decorators:[e=>(0,m.jsx)(`div`,{className:`w-[320px]`,children:(0,m.jsx)(e,{})})]},g={args:{label:`Notes actives`,value:`24`,delta:`+6 cette semaine`,icon:n,accent:`cyan`}},_={args:{label:`Notes`,value:`12`,delta:`4 notes projet`,icon:n,accent:`cyan`},render:()=>(0,m.jsxs)(`div`,{className:`grid w-[720px] grid-cols-2 gap-4`,children:[(0,m.jsx)(u,{label:`Notes`,value:`12`,delta:`4 notes projet`,icon:n,accent:`cyan`}),(0,m.jsx)(u,{label:`Qualité`,value:`100%`,delta:`API connectée`,icon:n,accent:`green`}),(0,m.jsx)(u,{label:`Projets`,value:`4`,delta:`2 live`,icon:n,accent:`violet`}),(0,m.jsx)(u,{label:`Alertes`,value:`0`,delta:`Rien à corriger`,icon:n,accent:`amber`})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Notes actives",
    value: "24",
    delta: "+6 cette semaine",
    icon: NotebookPen,
    accent: "cyan"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Notes",
    value: "12",
    delta: "4 notes projet",
    icon: NotebookPen,
    accent: "cyan"
  },
  render: () => <div className="grid w-[720px] grid-cols-2 gap-4">
      <StatCard label="Notes" value="12" delta="4 notes projet" icon={NotebookPen} accent="cyan" />
      <StatCard label="Qualité" value="100%" delta="API connectée" icon={NotebookPen} accent="green" />
      <StatCard label="Projets" value="4" delta="2 live" icon={NotebookPen} accent="violet" />
      <StatCard label="Alertes" value="0" delta="Rien à corriger" icon={NotebookPen} accent="amber" />
    </div>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Variants`]}))();export{g as Default,_ as Variants,v as __namedExportsOrder,h as default};