(()=>{var o=class{constructor(t){this.config=t}Process(){console.debug("Dynamic attributes processed.",this.config);var t=document.querySelectorAll("*");t.forEach(function(i){for(var n=0;n<i.attributes.length;n++){var s=i.attributes[n];if(s.name.startsWith("x-")){var c=s.name.slice(2);i.setAttribute(c,s.value)}}})}};var e=class{constructor(t){this.config=t}Process(){this.config.dynamicAttributes&&new o({}).Process()}};var a=()=>{new e({dynamicAttributes:!0}).Process()};document.addEventListener("DOMContentLoaded",a);})();
//# sourceMappingURL=webflow-html.js.map
