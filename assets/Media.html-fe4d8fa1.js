import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as n,c as s,b as e,d as t,e as r}from"./app-4eb9cdc3.js";const d={},c=e("h2",{id:"介质类型",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#介质类型","aria-hidden":"true"},"#"),t(" 介质类型")],-1),l={href:"https://github.com/ClaRaLibrary",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.tlk-thermo.com/index.php/en/tilmedia-suite",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"我们可以开发一个julia Media package。首先物性作为组件，它是有输入输出变量的。也就是说，它是因果关系模型，而非非因果关系模型。借助Modelingtoolkit的变量input和output这样的metadata实现。",-1),_=e("p",null,"建立AbstractMedia， SolidMedia， 等等抽象类型。然后在不同的抽象类型下面建立具体的介质类型。给出物性计算的函数。register这些函数。",-1),p=e("p",null,"拟这么设计：一个介质放在一个module里，在这个module里有一些函数，不同的函数返回不一样的ODESystem。而每个具体的ODESystem里就是对应的方程系统（当然会用到register的外部物性函数）。对应的connector有个mediatype选择器，不同的选择器会导致不一样的media的ODESystem引入。而连接器的这个media和组件的media也要对应上，否则就会出现连接错误。",-1);function u(f,b){const a=i("ExternalLinkIcon");return n(),s("div",null,[c,e("p",null,[t("在流程模拟中，介质是很重要的。我们需要能处理不同的介质。包括水、水蒸气、以及一些常见的化工流股。这在ThermoSysPro中是放在Properties下的。而在TransiEnt Library库中，则是在Basics/Media和Basics/Interfaces下定义了介质和接口。TransiEnt Library使用了TILMedia。而TILMedia是ClaRaLibrary组织开发的，在"),e("a",l,[t("https://github.com/ClaRaLibrary"),r(a)]),t(", 在"),e("a",m,[t("https://www.tlk-thermo.com/index.php/en/tilmedia-suite"),r(a)]),t(" 也有相关信息。在buildings库中，则是在Media下定义了介质。我们主要参照ThermoSysPro。")]),h,_,p])}const M=o(d,[["render",u],["__file","Media.html.vue"]]);export{M as default};
