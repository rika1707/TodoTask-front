import{a as y}from"./chunk-UC4DXIMK.js";import{a as b,b as k}from"./chunk-L2VHDV4I.js";import{H as d,J as u,P as g,Q as x,R as h,S as C,T as v,i as o,k as m,s as n,t as i,u as l,v as f,z as r}from"./chunk-AJP3TOXR.js";var c=class t{_route=o(u);goBack(){this._route.back()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=m({type:t,selectors:[["app-page-not-found"]],decls:11,vars:0,consts:[[1,"grid","min-h-full","place-items-center","bg-white","px-6","py-24","sm:py-32","lg:px-8"],[1,"text-center"],[1,"text-base","font-semibold","text-indigo-600"],[1,"mt-4","text-5xl","font-semibold","tracking-tight","text-balance","text-gray-900","sm:text-7xl"],[1,"mt-6","text-lg","font-medium","text-pretty","text-gray-500","sm:text-xl/8"],[1,"mt-10","flex","items-center","justify-center","gap-x-6"],[1,"rounded-md","bg-indigo-600","px-3.5","py-2.5","text-sm","font-semibold","text-white","shadow-xs","hover:bg-indigo-500","focus-visible:outline-2","focus-visible:outline-offset-2","focus-visible:outline-indigo-600",3,"click"]],template:function(e,p){e&1&&(n(0,"main",0)(1,"div",1)(2,"p",2),r(3,"404"),i(),n(4,"h1",3),r(5,"Pag\xEDna no encontrada"),i(),n(6,"p",4),r(7,"Lo siento, no pudimos encontrar la ruta especifica"),i(),n(8,"div",5)(9,"p",6),f("click",function(){return p.goBack()}),r(10,"Atras"),i()()()())},encapsulation:2})};var M=(t,a)=>{let e=o(b),p=o(C);return e.isAuthenticated()?!0:(p.navigate([""]),!1)};var A=[{path:"",redirectTo:"login",pathMatch:"full"},{path:"tasks",loadChildren:()=>import("./chunk-2J6QJAMV.js").then(t=>t.ListTodosModule),canActivate:[M]},{path:"login",loadChildren:()=>import("./chunk-IXIZDRNP.js").then(t=>t.LoginModule)},{path:"**",component:c}];var P={providers:[d({eventCoalescing:!0}),v(A),g()]};var s=class t{title="TodoTask";static \u0275fac=function(e){return new(e||t)};static \u0275cmp=m({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,p){e&1&&l(0,"router-outlet")},dependencies:[h,k,y],styles:["*[_ngcontent-%COMP%]{padding:0;margin:0;box-sizing:border-box}html[_ngcontent-%COMP%]{--background-color: #ffffff;--text-color: #000000}@media (prefers-color-scheme: dark){html[_ngcontent-%COMP%]{--background-color: #121212;--text-color: #ffffff}}body[_ngcontent-%COMP%]{background-color:var(--background-color);color:var(--text-color);transition:all .3s ease-in-out}"],changeDetection:0})};x(s,P).catch(t=>console.error(t));
