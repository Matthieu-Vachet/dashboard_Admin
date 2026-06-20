import{c as e,i as t}from"./preload-helper-DID7B_--.js";import{a as n}from"./iframe-Cqahbz2Y.js";import{n as r,t as i}from"./storybook-mocks-BzQHFLAp.js";import{i as a,n as o}from"./ui-assets-DnDiq-9x.js";import{n as s,r as c}from"./metric-card-2_SzCU7i.js";var l,u,d,f,p,m,h;t((()=>{l=n(),i(),{MetricCard:u}=(s(),e(c)),{uiAssets:d}=(o(),e(a)),f={title:`Pokémon/Admin/MetricCard`,component:u,parameters:{layout:`centered`,docs:{description:{component:`Carte métrique de l'admin Pokémon. Les pictos d'interface sont éclaircis pour rester lisibles sur fonds sombres et glassmorphism.`}}},tags:[`autodocs`],decorators:[e=>(0,l.jsx)(`div`,{className:`w-[760px] max-w-[calc(100vw-2rem)]`,children:(0,l.jsx)(e,{})}),r]},p={args:{label:`Fiches analysées`,value:1602,icon:d.icons.fiche}},m={render:()=>(0,l.jsxs)(`div`,{className:`grid gap-3 sm:grid-cols-2 xl:grid-cols-4`,children:[(0,l.jsx)(u,{label:`Fiches`,value:1602,icon:d.icons.fiche}),(0,l.jsx)(u,{label:`Terminées`,value:1602,accent:`green`,icon:d.icons.bookSpells}),(0,l.jsx)(u,{label:`Problèmes`,value:0,accent:`amber`,icon:d.icons.problem}),(0,l.jsx)(u,{label:`Assets`,value:1692,accent:`violet`,icon:d.icons.result})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Fiches analysées",
    value: 1602,
    icon: uiAssets.icons.fiche
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Fiches" value={1602} icon={uiAssets.icons.fiche} />
      <MetricCard label="Terminées" value={1602} accent="green" icon={uiAssets.icons.bookSpells} />
      <MetricCard label="Problèmes" value={0} accent="amber" icon={uiAssets.icons.problem} />
      <MetricCard label="Assets" value={1692} accent="violet" icon={uiAssets.icons.result} />
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Single`,`Accents`]}))();export{m as Accents,p as Single,h as __namedExportsOrder,f as default};