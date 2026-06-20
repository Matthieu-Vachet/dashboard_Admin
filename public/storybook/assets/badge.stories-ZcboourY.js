import{i as e}from"./preload-helper-DID7B_--.js";import{a as t}from"./iframe-Cqahbz2Y.js";import{n,t as r}from"./badge-Buha3czT.js";var i,a,o,s,c;e((()=>{i=t(),n(),a={title:`Design System/Badge`,component:r,parameters:{layout:`centered`,docs:{description:{component:`Badge de statut compact. Utilisé pour les états live, synchronisation, priorité, catégories et santé API.`}}},tags:[`autodocs`],argTypes:{tone:{control:`select`,options:[`cyan`,`violet`,`green`,`amber`,`red`,`neutral`]}}},o={args:{children:`Live`,tone:`green`}},s={render:()=>(0,i.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:[`cyan`,`violet`,`green`,`amber`,`red`,`neutral`].map(e=>(0,i.jsx)(r,{tone:e,children:e},e))})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Live",
    tone: "green"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      {(["cyan", "violet", "green", "amber", "red", "neutral"] as const).map(tone => <Badge key={tone} tone={tone}>
          {tone}
        </Badge>)}
    </div>
}`,...s.parameters?.docs?.source}}},c=[`Status`,`Palette`]}))();export{s as Palette,o as Status,c as __namedExportsOrder,a as default};