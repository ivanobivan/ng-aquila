!function(){"use strict";function o(e,n){return(o=Object.setPrototypeOf||function(o,e){return o.__proto__=e,o})(e,n)}function e(o){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(o){return!1}}();return function(){var t,i=r(o);if(e){var l=r(this).constructor;t=Reflect.construct(i,arguments,l)}else t=i.apply(this,arguments);return n(this,t)}}function n(o,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(o){if(void 0===o)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}(o):e}function r(o){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function t(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}function i(o,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(o,r.key,r)}}function l(o,e,n){return e&&i(o.prototype,e),n&&i(o,n),o}(self.webpackChunkng_aquila=self.webpackChunkng_aquila||[]).push([[4070],{54070:function(n,r,i){i.r(r),i.d(r,{PopoverExamplesModule:function(){return Q}});var p,a=i(85066),c=i(42677),s=i(79661),u=i(35838),g=i(37716),v=i(90722),f=i(41482),m=i(63066),x=((p=function(){function o(){t(this,o),this.closeOnDocClick=!0,this.popoverManualOpenFlag=!1}return l(o,[{key:"closeOnClickOutside",value:function(){this.closeOnDocClick=!this.closeOnDocClick}}]),o}()).\u0275fac=function(o){return new(o||p)},p.\u0275cmp=g.Xpm({type:p,selectors:[["popover-click-outside-example"]],decls:18,vars:6,consts:[[1,"nx-margin-top-0"],["nxButton","primary small","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs","nx-margin-bottom-s",3,"nxPopoverTriggerFor","closeOnClickOutside"],["popoverClick",""],["nxButton","primary small","nxPopoverDirection","top","nxPopoverTrigger","manual","type","button",1,"nx-margin-bottom-s",3,"nxPopoverTriggerFor","nxPopoverShow","closeOnClickOutside","nxPopoverShowChange","click"],["popoverTrigger","nxPopoverTrigger"],["popoverManual",""],["nxButton","secondary small","type","button",3,"click"]],template:function(o,e){if(1&o&&(g.TgZ(0,"p",0),g._uU(1),g.qZA(),g.TgZ(2,"button",1),g._uU(3," Click\n"),g.qZA(),g.TgZ(4,"nx-popover",null,2),g.TgZ(6,"span"),g._uU(7,"Trigger by click"),g.qZA(),g.qZA(),g.TgZ(8,"button",3,4),g.NdJ("nxPopoverShowChange",function(o){return e.popoverManualOpenFlag=o})("click",function(){return e.popoverManualOpenFlag=!e.popoverManualOpenFlag}),g._uU(10," Manual\n"),g.qZA(),g.TgZ(11,"nx-popover",null,5),g.TgZ(13,"span"),g._uU(14,"Trigger manually"),g.qZA(),g.qZA(),g._UZ(15,"br"),g.TgZ(16,"button",6),g.NdJ("click",function(){return e.closeOnClickOutside()}),g._uU(17,"Toggle closing on click outside"),g.qZA()),2&o){var n=g.MAs(5),r=g.MAs(12);g.xp6(1),g.hij("Close on document click: ",e.closeOnDocClick,""),g.xp6(1),g.Q6J("nxPopoverTriggerFor",n)("closeOnClickOutside",e.closeOnDocClick),g.xp6(6),g.Q6J("nxPopoverTriggerFor",r)("nxPopoverShow",e.popoverManualOpenFlag)("closeOnClickOutside",e.closeOnDocClick)}},directives:[v.X,f.X,m.N],styles:[""]}),p),d=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-custom-example"]],decls:5,vars:1,consts:[["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverCustomContent",""],["src","docs-assets/images/adli-wahid-eagle-unsplash.jpg","alt","An eagle sitting on a branch and thinking. Photo made by Adli Wahid",1,"popover-demo__img"]],template:function(o,e){if(1&o&&(g.TgZ(0,"button",0),g._uU(1," Click\n"),g.qZA(),g.TgZ(2,"nx-popover",null,1),g._UZ(4,"img",2),g.qZA()),2&o){var n=g.MAs(3);g.Q6J("nxPopoverTriggerFor",n)}},directives:[v.X,f.X,m.N],styles:[".popover-demo__img[_ngcontent-%COMP%]{width:200px;height:160px}"]}),o}(),b=i(4765),h=i(90805),y=["hoverTriggerIcon"],T=function(){var o=function(){function o(e){t(this,o),this._focusMonitor=e,this.popoverManualOpenFlag=!1}return l(o,[{key:"ngAfterViewInit",value:function(){this._focusMonitor.monitor(this._hoverTriggerIcon)}},{key:"ngOnDestroy",value:function(){this._focusMonitor.stopMonitoring(this._hoverTriggerIcon)}}]),o}();return o.\u0275fac=function(e){return new(e||o)(g.Y36(b.tE))},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-hover-example"]],viewQuery:function(o,e){var n;(1&o&&g.Gf(y,5),2&o)&&(g.iGM(n=g.CRH())&&(e._hoverTriggerIcon=n.first))},decls:5,vars:1,consts:[["name","refresh","size","s","nxPopoverDirection","top","nxPopoverTrigger","hover","tabindex","0","role","button","aria-label","progress",3,"nxPopoverTriggerFor"],["hoverTriggerIcon",""],["progress",""]],template:function(o,e){if(1&o&&(g._UZ(0,"nx-icon",0,1),g.TgZ(2,"nx-popover",null,2),g._uU(4," Your application status is in progress.\n"),g.qZA()),2&o){var n=g.MAs(3);g.Q6J("nxPopoverTriggerFor",n)}},directives:[h.O,f.X,m.N],styles:["nx-icon.cdk-mouse-focused[_ngcontent-%COMP%]{outline:none}"]}),o}(),k=i(30207);function Z(o,e){1&o&&g._UZ(0,"img",3)}var _=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-lazyload-example"]],decls:5,vars:1,consts:[["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverCustomLazyloadedContent",""],["nxPopoverContent",""],["src","docs-assets/images/adli-wahid-eagle-unsplash-large.jpg","alt","An eagle sitting on a branch and thinking. Photo made by Adli Wahid",1,"popover-demo__img"]],template:function(o,e){if(1&o&&(g.TgZ(0,"button",0),g._uU(1,"click\n"),g.qZA(),g.TgZ(2,"nx-popover",null,1),g.YNc(4,Z,1,0,"ng-template",2),g.qZA()),2&o){var n=g.MAs(3);g.Q6J("nxPopoverTriggerFor",n)}},directives:[v.X,f.X,m.N,k.x],styles:[".popover-demo__img[_ngcontent-%COMP%]{width:200px;height:160px}"]}),o}(),P=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-modal-example"]],decls:6,vars:1,consts:[["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","nxPopoverModal","true",3,"nxPopoverTriggerFor"],["modalPopover",""]],template:function(o,e){if(1&o&&(g.TgZ(0,"button",0),g._uU(1," Modal popover\n"),g.qZA(),g.TgZ(2,"nx-popover",null,1),g.TgZ(4,"span"),g._uU(5,"Modal popover"),g.qZA(),g.qZA()),2&o){var n=g.MAs(3);g.Q6J("nxPopoverTriggerFor",n)}},directives:[v.X,f.X,m.N],styles:[""]}),o}(),A=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-positioning-example"]],decls:24,vars:4,consts:[["nxButton","primary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["popoverTopAnchor",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["popoverRightAnchor",""],["nxButton","primary small","nxPopoverDirection","bottom","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["popoverBottomAnchor",""],["nxButton","primary small","nxPopoverDirection","left","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverLeftAnchor",""]],template:function(o,e){if(1&o&&(g.TgZ(0,"button",0),g._uU(1," Top\n"),g.qZA(),g.TgZ(2,"nx-popover",null,1),g.TgZ(4,"span"),g._uU(5,"A popover pointing to the top side of the target"),g.qZA(),g.qZA(),g.TgZ(6,"button",2),g._uU(7," Right\n"),g.qZA(),g.TgZ(8,"nx-popover",null,3),g.TgZ(10,"span"),g._uU(11,"A popover pointing right side of the target"),g.qZA(),g.qZA(),g.TgZ(12,"button",4),g._uU(13," Bottom\n"),g.qZA(),g.TgZ(14,"nx-popover",null,5),g.TgZ(16,"span"),g._uU(17,"A popover pointing bottom side of the target"),g.qZA(),g.qZA(),g.TgZ(18,"button",6),g._uU(19," Left\n"),g.qZA(),g.TgZ(20,"nx-popover",null,7),g.TgZ(22,"span"),g._uU(23,"A popover pointing bottom side of the target"),g.qZA(),g.qZA()),2&o){var n=g.MAs(3),r=g.MAs(9),t=g.MAs(15),i=g.MAs(21);g.Q6J("nxPopoverTriggerFor",n),g.xp6(6),g.Q6J("nxPopoverTriggerFor",r),g.xp6(6),g.Q6J("nxPopoverTriggerFor",t),g.xp6(6),g.Q6J("nxPopoverTriggerFor",i)}},directives:[v.X,f.X,m.N],styles:[""]}),o}(),q=i(75723),M=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-scroll-example"]],decls:17,vars:2,consts:[["cdkScrollable","",1,"popover-demo__scroll-panel"],["nxButton","primary small","nxPopoverScrollStrategy","close","nxPopoverTrigger","click","type","button",1,"nx-margin-bottom-s",3,"nxPopoverTriggerFor"],["popoverStrategyClose",""],["nxButton","primary small","nxPopoverScrollStrategy","reposition","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverStrategyReposition",""]],template:function(o,e){if(1&o&&(g.TgZ(0,"span",0),g.TgZ(1,"p"),g._uU(2,"sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),g.qZA(),g.TgZ(3,"div"),g.TgZ(4,"button",1),g._uU(5," Click "),g.qZA(),g.TgZ(6,"nx-popover",null,2),g.TgZ(8,"span"),g._uU(9,"Close"),g.qZA(),g.qZA(),g._UZ(10,"br"),g.TgZ(11,"button",3),g._uU(12," Click "),g.qZA(),g.TgZ(13,"nx-popover",null,4),g.TgZ(15,"span"),g._uU(16,"Reposition"),g.qZA(),g.qZA(),g.qZA(),g.qZA()),2&o){var n=g.MAs(7),r=g.MAs(14);g.xp6(4),g.Q6J("nxPopoverTriggerFor",n),g.xp6(7),g.Q6J("nxPopoverTriggerFor",r)}},directives:[q.PQ,v.X,f.X,m.N],styles:[".popover-demo__scroll-panel[_ngcontent-%COMP%]{border:1px solid;overflow:scroll;width:200px;height:150px;display:flex;justify-content:center;align-items:center;padding:10px;margin-right:20px}"]}),o}(),O=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-scrollable-example"]],decls:19,vars:2,consts:[[2,"display","flex"],[1,"popover-demo__scroll-panel"],["nxButton","primary small","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverScroll",""],["cdkScrollable","",1,"popover-demo__scroll-panel"],["popoverScroll2",""]],template:function(o,e){if(1&o&&(g.TgZ(0,"div",0),g.TgZ(1,"span",1),g.TgZ(2,"p"),g._uU(3,"sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),g.qZA(),g.TgZ(4,"button",2),g._uU(5," Click "),g.qZA(),g.TgZ(6,"nx-popover",null,3),g.TgZ(8,"span"),g._uU(9,"Scroll"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(10,"span",4),g.TgZ(11,"p"),g._uU(12,"sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),g.qZA(),g.TgZ(13,"button",2),g._uU(14," Click "),g.qZA(),g.TgZ(15,"nx-popover",null,5),g.TgZ(17,"span"),g._uU(18,"Scroll"),g.qZA(),g.qZA(),g.qZA(),g.qZA()),2&o){var n=g.MAs(7),r=g.MAs(16);g.xp6(4),g.Q6J("nxPopoverTriggerFor",n),g.xp6(9),g.Q6J("nxPopoverTriggerFor",r)}},directives:[v.X,f.X,m.N,q.PQ],styles:[".popover-demo__scroll-panel[_ngcontent-%COMP%]{border:1px solid;overflow:scroll;width:200px;height:150px;display:flex;justify-content:center;align-items:center;padding:10px;margin-right:20px}"]}),o}(),C=i(35491),w=function(){var o=function o(){t(this,o),this.data=[{nxDirection:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxDirection:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxDirection:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxDirection:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxDirection",key:"nxDirection",type:"string"},{title:"fallback\xa01",key:"fallback1",type:"string"},{title:"fallback\xa02",key:"fallback2",type:"string"},{title:"fallback\xa03",key:"fallback3",type:"string"},{title:"fallback\xa04",key:"fallback4",type:"string"},{title:"fallback\xa05",key:"fallback5",type:"string"},{title:"fallback\xa06",key:"fallback6",type:"string"},{title:"fallback\xa07",key:"fallback7",type:"string"}]};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-table-example"]],decls:1,vars:2,consts:[[3,"nxData","nxDisplayedColumns"]],template:function(o,e){1&o&&g._UZ(0,"nx-dynamic-table",0),2&o&&g.Q6J("nxData",e.data)("nxDisplayedColumns",e.displayedColumns)},directives:[C.g],styles:[".nx-table__header-cell,   .nx-table__cell{padding:12px!important}"]}),o}(),F=i(36461),U=["clickTriggerIcon"],D=["manualTriggerIcon"],X=function(){var o=function(){function o(e){t(this,o),this._focusMonitor=e,this.popoverManualOpenFlag=!1}return l(o,[{key:"ngAfterViewInit",value:function(){this._focusMonitor.monitor(this._clickTriggerIcon),this._focusMonitor.monitor(this._manualTriggerIcon)}},{key:"ngOnDestroy",value:function(){this._focusMonitor.stopMonitoring(this._clickTriggerIcon),this._focusMonitor.stopMonitoring(this._manualTriggerIcon)}},{key:"handleKeydown",value:function(o){switch(o.keyCode){case F.L_:case F.K5:this.popoverManualOpenFlag=!this.popoverManualOpenFlag;break;default:return}}}]),o}();return o.\u0275fac=function(e){return new(e||o)(g.Y36(b.tE))},o.\u0275cmp=g.Xpm({type:o,selectors:[["popover-trigger-example"]],viewQuery:function(o,e){var n;(1&o&&(g.Gf(U,5),g.Gf(D,5)),2&o)&&(g.iGM(n=g.CRH())&&(e._clickTriggerIcon=n.first),g.iGM(n=g.CRH())&&(e._manualTriggerIcon=n.first))},decls:17,vars:3,consts:[["aria-label","trigger by click","name","info-circle-o","size","s","nxPopoverTrigger","click","tabindex","0","role","button",3,"nxPopoverTriggerFor"],["clickTriggerIcon",""],["popoverClick",""],["name","info-circle-o","size","s","nxPopoverDirection","top","nxPopoverTrigger","manual","tabindex","0","aria-label","trigger manually","role","button",3,"nxPopoverTriggerFor","nxPopoverShow","nxPopoverShowChange","click","keydown"],["manualTriggerIcon","","popoverTrigger","nxPopoverTrigger"],["popoverManual",""]],template:function(o,e){if(1&o&&(g.TgZ(0,"p"),g._UZ(1,"nx-icon",0,1),g._uU(3," Triggered by click\n"),g.qZA(),g.TgZ(4,"nx-popover",null,2),g.TgZ(6,"span"),g._uU(7,"Trigger by click"),g.qZA(),g.qZA(),g.TgZ(8,"p"),g.TgZ(9,"nx-icon",3,4),g.NdJ("nxPopoverShowChange",function(o){return e.popoverManualOpenFlag=o})("click",function(){return e.popoverManualOpenFlag=!e.popoverManualOpenFlag})("keydown",function(o){return e.handleKeydown(o)}),g.qZA(),g._uU(12," Triggered manually\n"),g.qZA(),g.TgZ(13,"nx-popover",null,5),g.TgZ(15,"span"),g._uU(16,"Trigger manually"),g.qZA(),g.qZA()),2&o){var n=g.MAs(5),r=g.MAs(14);g.xp6(1),g.Q6J("nxPopoverTriggerFor",n),g.xp6(8),g.Q6J("nxPopoverTriggerFor",r)("nxPopoverShow",e.popoverManualOpenFlag)}},directives:[h.O,f.X,m.N],styles:["nx-icon[_ngcontent-%COMP%]{color:#27abd6;color:var(--interactive-primary, #27abd6);vertical-align:middle;cursor:pointer}nx-icon[_ngcontent-%COMP%]:hover{color:#3bb4db;color:var(--hover-primary, #3bb4db)}nx-icon.cdk-mouse-focused[_ngcontent-%COMP%]{outline:none}"]}),o}(),S=function(){var n,r=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&o(e,n)}(i,n);var r=e(i);function i(){var o;return t(this,i),(o=r.apply(this,arguments)).closeIconLabel="Schlie\xdfen",o}return i}(u.iP);return r.\u0275fac=function(o){return(n||(n=g.n5z(r)))(o||r)},r.\u0275prov=g.Yz7({token:r,factory:r.\u0275fac}),r}(),J=function(){var o=function o(){t(this,o)};return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=g.Xpm({type:o,selectors:[["phone-input-i18n-example"]],features:[g._Bn([{provide:u.iP,useClass:S}])],decls:6,vars:1,consts:[["nxButton","primary small","type","button",3,"nxPopoverTriggerFor"],["popover",""]],template:function(o,e){if(1&o&&(g.TgZ(0,"button",0),g._uU(1," Open popover "),g.qZA(),g.TgZ(2,"nx-popover",null,1),g.TgZ(4,"span"),g._uU(5,"A popover"),g.qZA(),g.qZA()),2&o){var n=g.MAs(3);g.Q6J("nxPopoverTriggerFor",n)}},directives:[v.X,f.X,m.N],encapsulation:2}),o}(),Q=function(){var o=function(){function o(){t(this,o)}return l(o,null,[{key:"components",value:function(){return{"popover-click-outside":x,"popover-custom":d,"popover-hover":T,"popover-lazyload":_,"popover-modal":P,"popover-positioning":A,"popover-scroll":M,"popover-scrollable":O,"popover-table":w,"popover-trigger":X,"popover-i18n":J}}}]),o}();return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=g.oAB({type:o}),o.\u0275inj=g.cJS({imports:[[u.Fc,s.ru,c.cf,a.f,q.ZD]]}),o}()}}])}();