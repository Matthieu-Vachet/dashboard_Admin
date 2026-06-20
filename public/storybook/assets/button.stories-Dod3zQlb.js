import{i as e}from"./preload-helper-DID7B_--.js";import{a as t}from"./iframe-Cqahbz2Y.js";import{A as n,B as r,t as i}from"./lucide-react-A-gVFcX7.js";import{n as a,t as o}from"./button-BlZTfIq5.js";var s,c,l,u,d,f,p;e((()=>{s=t(),i(),a(),c={title:`Design System/Button`,component:o,parameters:{layout:`centered`,docs:{description:{component:"Bouton principal du design system. Utiliser `primary` pour une action forte, `secondary` pour les actions courantes, `ghost` pour navigation, `danger` pour suppression."}}},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`ghost`,`danger`]},size:{control:`select`,options:[`sm`,`md`,`lg`,`icon`]}}},l={args:{children:`Créer un projet`,variant:`primary`,icon:(0,s.jsx)(r,{size:16})}},u={args:{children:`Sauvegarder`,variant:`secondary`,icon:(0,s.jsx)(n,{size:16})}},d={args:{children:(0,s.jsx)(r,{size:16}),size:`icon`,"aria-label":`Ajouter`}},f={render:()=>(0,s.jsxs)(`div`,{className:`grid gap-3`,children:[(0,s.jsx)(o,{variant:`primary`,icon:(0,s.jsx)(r,{size:16}),children:`Créer`}),(0,s.jsx)(o,{variant:`secondary`,icon:(0,s.jsx)(n,{size:16}),children:`Sauvegarder`}),(0,s.jsx)(o,{variant:`ghost`,children:`Navigation discrète`}),(0,s.jsx)(o,{variant:`danger`,children:`Supprimer`}),(0,s.jsx)(o,{disabled:!0,children:`Indisponible`})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Créer un projet",
    variant: "primary",
    icon: <Plus size={16} />
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Sauvegarder",
    variant: "secondary",
    icon: <Save size={16} />
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: <Plus size={16} />,
    size: "icon",
    "aria-label": "Ajouter"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-3">
      <Button variant="primary" icon={<Plus size={16} />}>Créer</Button>
      <Button variant="secondary" icon={<Save size={16} />}>Sauvegarder</Button>
      <Button variant="ghost">Navigation discrète</Button>
      <Button variant="danger">Supprimer</Button>
      <Button disabled>Indisponible</Button>
    </div>
}`,...f.parameters?.docs?.source}}},p=[`Primary`,`Secondary`,`IconOnly`,`AllVariants`]}))();export{f as AllVariants,d as IconOnly,l as Primary,u as Secondary,p as __namedExportsOrder,c as default};