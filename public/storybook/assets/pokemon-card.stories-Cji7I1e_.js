import{c as e,i as t}from"./preload-helper-DID7B_--.js";import{a as n}from"./iframe-Cqahbz2Y.js";import{c as r,i,l as a,n as o,s,t as c,u as l}from"./storybook-mocks-BzQHFLAp.js";import{n as u,r as d}from"./pokemon-card-dcrnCSdW.js";var f,p,m,h,g,_;t((()=>{f=n(),i(),c(),{PokemonCard:p}=(u(),e(d)),m={title:`Pokémon/Cartes/PokemonCard`,component:p,parameters:{layout:`centered`,docs:{description:{component:`Carte fiche Pokémon utilisée dans l'admin: sprite, score qualité, types, météo, état JSON, assets et action d'ouverture.`}}},tags:[`autodocs`],decorators:[e=>(0,f.jsx)(`div`,{className:`w-[360px] bg-[#050816] p-4`,children:(0,f.jsx)(e,{})}),o]},h={args:{admin:!0,actionLabel:`Ouvrir`,assetChecked:!0,entry:s,typeCatalog:a,weatherCatalog:l,onOpen:()=>{},onAssetChecked:()=>{}}},g={args:{admin:!0,actionLabel:`Ouvrir`,entry:r,typeCatalog:a,weatherCatalog:l,onOpen:()=>{}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    admin: true,
    actionLabel: "Ouvrir",
    assetChecked: true,
    entry: samplePokemonEntry,
    typeCatalog: sampleTypeCatalog,
    weatherCatalog: sampleWeatherCatalog,
    onOpen: () => {},
    onAssetChecked: () => {}
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    admin: true,
    actionLabel: "Ouvrir",
    entry: samplePokemonEntryWithIssues,
    typeCatalog: sampleTypeCatalog,
    weatherCatalog: sampleWeatherCatalog,
    onOpen: () => {}
  }
}`,...g.parameters?.docs?.source}}},_=[`Complete`,`WithIssues`]}))();export{h as Complete,g as WithIssues,_ as __namedExportsOrder,m as default};