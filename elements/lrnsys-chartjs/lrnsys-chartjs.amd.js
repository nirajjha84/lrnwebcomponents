define(["exports","./node_modules/@polymer/polymer/polymer-legacy.js","./node_modules/@vowo/chart-elements/chart-elements.js"],function(_exports,_polymerLegacy,_chartElements){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.LrnsysChartjs=void 0;function _templateObject_f77f49e034da11e99193e59d4f60a101(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <div>\n      <!--\n        Use the logic from the logic of the template dom-if's to allow for abstraction for all the chart types\n      -->\n      <chart-line labels=\"{{labels}}\" data=\"[[data]]\"></chart-line>\n    </div>\n  "]);_templateObject_f77f49e034da11e99193e59d4f60a101=function _templateObject_f77f49e034da11e99193e59d4f60a101(){return data};return data}var LrnsysChartjs=(0,_polymerLegacy.Polymer)({_template:(0,_polymerLegacy.html)(_templateObject_f77f49e034da11e99193e59d4f60a101()),is:"lrnsys-chartjs",properties:{labels:{type:Array,value:["January","February","March","April","May","June","July"]},data:{type:Object,value:{}}},ready:function ready(){this.data={labels:this.labels,datasets:[{label:"My First dataset",backgroundColor:"rgba(220,220,220,0.2)",borderColor:"rgba(220,220,220,1)",borderWidth:1,pointBackgroundColor:"rgba(220,220,220,1)",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"rgba(220,220,220,1)",data:[65,59,80,81,56,55,40]},{label:"My Second dataset",backgroundColor:"rgba(151,187,205,0.2)",borderColor:"rgba(151,187,205,1)",borderWidth:1,pointBackgroundColor:"rgba(151,187,205,1)",pointBorderColor:"#fff",pointHighlightFill:"#fff",pointHoverBorderColor:"rgba(151,187,205,1)",data:[28,48,40,19,86,27,90]}]};console.log(this.data)}});_exports.LrnsysChartjs=LrnsysChartjs});