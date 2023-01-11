"use strict";(self.webpackChunkprivatni_vrtic=self.webpackChunkprivatni_vrtic||[]).push([[737],{6737:(J,l,r)=>{r.r(l),r.d(l,{EmployeeModule:()=>I});var i=r(9808),d=r(7833),s=r(7559),a=r(2268),e=r(5e3),p=r(5216);let g=(()=>{class t{constructor(){this.path="/grids/employee",this.file="all-employee.json"}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-all-employee"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(n,o){1&n&&e._UZ(0,"app-dynamic-grid",0),2&n&&e.Q6J("path",o.path)("file",o.file)},directives:[p.d],styles:[""]}),t})();var _=r(765);let m=(()=>{class t{constructor(){this.path="/tabs/employee",this.file="profile-employee.json"}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-profile-employee"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(n,o){1&n&&e._UZ(0,"app-dynamic-tabs",0),2&n&&e.Q6J("path",o.path)("file",o.file)},directives:[_.r],styles:[""]}),t})();var f=r(4015),u=r(6209),v=r(2590);function y(t,c){1&t&&(e.TgZ(0,"div",2),e._UZ(1,"app-loader"),e.qZA())}function h(t,c){if(1&t&&e._UZ(0,"div",22),2&t){const n=e.oxw(3);e.Q6J("title",n.language.employeeOnline)}}function P(t,c){if(1&t&&e._UZ(0,"div",23),2&t){const n=e.oxw(3);e.Q6J("title",n.language.employeeOffline)}}function C(t,c){if(1&t&&(e.TgZ(0,"p",25),e._uU(1),e.ALo(2,"date"),e.qZA()),2&t){const n=e.oxw(2).$implicit,o=e.oxw(2);e.xp6(1),e.AsE(" ",o.language.employeeSignInWorkDate," ",e.xi3(2,2,o.reportingPresence[n.id].start_date,"dd.MM.yyyy HH:mm")," ")}}function O(t,c){if(1&t&&(e.TgZ(0,"p"),e._uU(1),e.ALo(2,"date"),e.qZA()),2&t){const n=e.oxw(2).$implicit,o=e.oxw(2);e.xp6(1),e.AsE(" ",o.language.employeeSignOutWorkDate," ",e.xi3(2,2,o.reportingPresence[n.id].end_date,"dd.MM.yyyy HH:mm")," ")}}function M(t,c){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,C,3,5,"p",24),e.YNc(2,O,3,5,"p",20),e.qZA()),2&t){const n=e.oxw().$implicit,o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",o.reportingPresence[n.id].start_date),e.xp6(1),e.Q6J("ngIf",o.reportingPresence[n.id].end_date)}}function x(t,c){if(1&t&&(e.TgZ(0,"div",26)(1,"p"),e._uU(2),e.qZA()()),2&t){const n=e.oxw(3);e.xp6(2),e.Oqu(n.language.employeeOffline)}}function Z(t,c){if(1&t&&(e.TgZ(0,"div",8)(1,"div",9)(2,"div",10)(3,"div",11),e._UZ(4,"app-avatar",12),e.TgZ(5,"div",13),e.YNc(6,h,1,1,"div",14),e.YNc(7,P,1,1,"div",15),e.qZA()()(),e.TgZ(8,"div",10)(9,"div",16)(10,"div",17),e._uU(11),e.qZA()()(),e._UZ(12,"div",18),e.TgZ(13,"div",19),e.YNc(14,M,3,2,"div",20),e.YNc(15,x,3,1,"div",21),e.qZA()()()),2&t){const n=c.$implicit,o=e.oxw(2);e.xp6(4),e.Q6J("name",n.firstname+" "+n.lastname),e.xp6(2),e.Q6J("ngIf",o.reportingPresence[n.id]&&!o.reportingPresence[n.id].end_date),e.xp6(1),e.Q6J("ngIf",!o.reportingPresence[n.id]||o.reportingPresence[n.id].end_date),e.xp6(4),e.AsE(" ",n.firstname," ",n.lastname," "),e.xp6(3),e.Q6J("ngIf",o.reportingPresence[n.id]),e.xp6(1),e.Q6J("ngIf",!o.reportingPresence[n.id])}}function T(t,c){if(1&t&&(e.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"h5"),e._uU(4),e.qZA()()(),e.TgZ(5,"div",6),e.YNc(6,Z,16,7,"div",7),e.qZA()()),2&t){const n=e.oxw();e.xp6(4),e.AsE("",n.language.recordsOfArrivalFor," ",n.getTodayDate(),""),e.xp6(2),e.Q6J("ngForOf",n.data)}}let b=(()=>{class t{constructor(n,o,R){this.helpService=n,this.apiService=o,this.router=R,this.reportingPresence=[]}ngOnInit(){this.language=this.helpService.getLanguage(),this.initializeData()}initializeData(){this.apiService.callGetMethod("/api/getEmployees","").subscribe(n=>{this.data=n,this.getReportingPresence()})}getReportingPresence(){this.apiService.callGetMethod("/api/control-panel/getReportingPresenceEmployeeByKindergarden","").subscribe(n=>{this.setReportingPresence(n)})}setReportingPresence(n){for(let o=0;o<n.length;o++)this.reportingPresence[n[o].employee_id]={start_date:n[o].start_date,end_date:n[o].end_date,is_holiday:n[o].is_holiday}}getTodayDate(){return this.helpService.getTodayDate()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(f.s),e.Y36(u.f),e.Y36(a.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-reporting-presence"]],decls:2,vars:2,consts:[["style","height: 70vh",4,"ngIf"],["class","col-lg-12 control-section card-control-section vertical_card_layout mt-3",4,"ngIf"],[2,"height","70vh"],[1,"col-lg-12","control-section","card-control-section","vertical_card_layout","mt-3"],[1,"options","row","mb-3"],[1,"col-xs-12","col-sm-12","col-md-12","text-center"],[1,"row","e-sample-resize-container","e-card-resize-container"],["class","col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-3",4,"ngFor","ngForOf"],[1,"col-xs-12","col-sm-6","col-md-6","col-lg-3","mb-3"],["tabindex","0",1,"e-card","profile",2,"justify-content","flex-start"],[1,"e-card-header"],[1,"e-card-header-image","e-card-corner"],[3,"name"],[1,"status"],["class","online",3,"title",4,"ngIf"],["class","offline",3,"title",4,"ngIf"],[1,"e-card-header-caption","center"],[1,"e-card-header-title"],[1,"e-card-separator"],[1,"text-muted","text-center","status-info"],[4,"ngIf"],["class","mt-3",4,"ngIf"],[1,"online",3,"title"],[1,"offline",3,"title"],["class","mb-0",4,"ngIf"],[1,"mb-0"],[1,"mt-3"]],template:function(n,o){1&n&&(e.YNc(0,y,2,0,"div",0),e.YNc(1,T,7,3,"div",1)),2&n&&(e.Q6J("ngIf",!o.data),e.xp6(1),e.Q6J("ngIf",o.data))},directives:[i.O5,i.sg,v.A],pipes:[i.uU],styles:[".highcontrast[_ngcontent-%COMP%]   .card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-header-image[_ngcontent-%COMP%]{border-color:#fff}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-header-image[_ngcontent-%COMP%]{width:98px;height:93px;background-size:cover;border-style:solid;border-color:#1c2260}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-header-caption.center[_ngcontent-%COMP%], .card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-content[_ngcontent-%COMP%]{text-align:center}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-btn[_ngcontent-%COMP%]{height:45px;width:50px;background-color:transparent;border:none}.e-card.selected[_ngcontent-%COMP%]{border:1px solid #c7c7c7;box-shadow:0 0 2px 2px #1c2260}.e-card.profile[_ngcontent-%COMP%]{cursor:pointer}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-actions[_ngcontent-%COMP%]   button.e-card-btn[_ngcontent-%COMP%]:hover, .card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:first-child:hover, .card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-actions[_ngcontent-%COMP%]   button.e-card-btn[_ngcontent-%COMP%], .card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:first-child{background:#ffff}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card[_ngcontent-%COMP%]   .e-card-actions.center[_ngcontent-%COMP%]{justify-content:center;display:flex}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-actions.center[_ngcontent-%COMP%]{background-color:transparent;border:none}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-header[_ngcontent-%COMP%]   .e-card-header-caption[_ngcontent-%COMP%]   .e-card-sub-title[_ngcontent-%COMP%]{font-size:14px;font-weight:400;color:#000c}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .e-card.profile[_ngcontent-%COMP%]   .e-card-header[_ngcontent-%COMP%]   .e-card-header-caption[_ngcontent-%COMP%]   .e-card-header-title[_ngcontent-%COMP%]{font-size:18px;font-weight:500}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .col-xs-6.col-sm-6.col-lg-6.col-md-6[_ngcontent-%COMP%]{width:100%;padding:10px}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .card-layout[_ngcontent-%COMP%]{margin:auto;max-width:400px}@media (min-width: 870px){.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .col-xs-6.col-sm-6.col-lg-6.col-md-6[_ngcontent-%COMP%]{width:50%}.card-control-section.vertical_card_layout[_ngcontent-%COMP%]   .card-layout[_ngcontent-%COMP%]{max-width:870px}}.e-card[_ngcontent-%COMP%]{box-shadow:0 1px 7px #00000029!important}.status[_ngcontent-%COMP%]{position:absolute}.status[_ngcontent-%COMP%]   .online[_ngcontent-%COMP%]{height:15px;width:15px;background:green;border-radius:50%}.status[_ngcontent-%COMP%]   .offline[_ngcontent-%COMP%]{height:15px;width:15px;background:red;border-radius:50%}.status-info[_ngcontent-%COMP%]{height:70px}"]}),t})();var w=r(2964);const A=[{path:"",redirectTo:"all-employees",pathMatch:"full"},{path:"all-employees",component:g},{path:"profile-employee/:id",component:m},{path:"work-diary",component:(()=>{class t{constructor(){this.path="scheduler/employee",this.file="employee-work-diary.json"}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-work-diary"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(n,o){1&n&&e._UZ(0,"app-dynamic-scheduler",0),2&n&&e.Q6J("path",o.path)("file",o.file)},directives:[w.d],styles:[""]}),t})()},{path:"reporting-presence",component:b}];let E=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[a.Bz.forChild(A)],a.Bz]}),t})(),I=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[],imports:[[i.ez,E,d.I,s.y]]}),t})()}}]);