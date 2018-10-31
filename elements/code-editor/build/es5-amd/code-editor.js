define([
  "./node_modules/@polymer/polymer/polymer-legacy.js",
  "./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js",
  "./node_modules/@lrnwebcomponents/materializecss-styles/materializecss-styles.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js",
  "./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js",
  "juicy-ace-editor/juicy-ace-editor.js",
  "./lib/code-pen-button.js"
], function(_polymerLegacy, _polymerDom) {
  "use strict";
  function _templateObject_d9063180dbb711e8aeac09c47182c5e8() {
    var data = babelHelpers.taggedTemplateLiteral(
      [
        '\n    <style>\n      :host {\n        display: block;\n        padding: 16px;\n        --code-pen-button-color: #222222;\n        --code-pen-title-color: #222222;\n      }\n      .code-pen-container {\n        width: 100%;\n        display: block;\n        background-color: var(--code-pen-button-color);\n        height: 40px;\n      }\n      code-pen-button {\n        float: right;\n        height: 40px;\n      }\n      h3 {\n        color: var(--code-pen-title-color);\n      }\n    </style>\n    <h3>[[title]]</h3>\n    <juicy-ace-editor id="codeeditor" theme$="[[theme]]" mode$="[[mode]]" font-size$="[[fontSize]]" readonly$="[[readOnly]]"></juicy-ace-editor>\n    <div class="code-pen-container" hidden$="[[!showCodePen]]">\n      <code-pen-button data="[[codePenData]]"></code-pen-button>\n    </div>\n'
      ],
      [
        '\n    <style>\n      :host {\n        display: block;\n        padding: 16px;\n        --code-pen-button-color: #222222;\n        --code-pen-title-color: #222222;\n      }\n      .code-pen-container {\n        width: 100%;\n        display: block;\n        background-color: var(--code-pen-button-color);\n        height: 40px;\n      }\n      code-pen-button {\n        float: right;\n        height: 40px;\n      }\n      h3 {\n        color: var(--code-pen-title-color);\n      }\n    </style>\n    <h3>[[title]]</h3>\n    <juicy-ace-editor id="codeeditor" theme\\$="[[theme]]" mode\\$="[[mode]]" font-size\\$="[[fontSize]]" readonly\\$="[[readOnly]]"></juicy-ace-editor>\n    <div class="code-pen-container" hidden\\$="[[!showCodePen]]">\n      <code-pen-button data="[[codePenData]]"></code-pen-button>\n    </div>\n'
      ]
    );
    _templateObject_d9063180dbb711e8aeac09c47182c5e8 = function() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_d9063180dbb711e8aeac09c47182c5e8()
    ),
    is: "code-editor",
    behaviors: [
      HAXBehaviors.PropertiesBehaviors,
      MaterializeCSSBehaviors.ColorBehaviors,
      SchemaBehaviors.Schema
    ],
    listeners: {
      "codeeditor.change": "_editorDataChanged",
      "codeeditor.editor-ready": "_editorReady"
    },
    properties: {
      title: { type: String, value: "Code sample" },
      showCodePen: { type: Boolean, value: !1, reflectToAttribute: !0 },
      readOnly: { type: Boolean, value: !0, reflectToAttribute: !0 },
      codePenData: {
        type: Object,
        computed: "_computeCodePenData(title, editorValue)"
      },
      editorValue: { type: String, value: "", notify: !0 },
      theme: { type: String, value: "ace/theme/monokai" },
      mode: { type: String, value: "ace/mode/html" },
      fontSize: { type: String, value: "16px" },
      minLines: { type: Number, value: 10 },
      maxLines: { type: Number, value: 25 }
    },
    _computeCodePenData: function _computeCodePenData(title, editorValue) {
      return { title: title, html: editorValue };
    },
    _editorReady: function _editorReady() {
      var _this = this;
      this.__editorReady = !0;
      setTimeout(function() {
        _this.$.codeeditor.editor.setOptions({
          maxLines: _this.maxLines,
          minLines: _this.minLines
        });
        _this.updateEditorValue();
      }, 200);
    },
    _editorDataChanged: function _editorDataChanged() {
      this.editorValue = this.$.codeeditor.value;
    },
    updateEditorValue: function updateEditorValue() {
      var children = this.queryEffectiveChildren("template");
      if (!children) {
        console.warn(
          "code-editor requires a template to be provided in light-dom"
        );
      } else {
        this.$.codeeditor.value = children.innerHTML;
      }
    },
    ready: function ready() {
      this._observer = (0, _polymerDom.dom)(this).observeNodes(function(info) {
        var _this2 = this;
        if (0 < info.addedNodes.length) {
          info.addedNodes.map(function() {
            _this2.updateEditorValue();
          });
        }
        if (0 < info.removedNodes.length) {
          info.removedNodes.map(function() {
            _this2.updateEditorValue();
          });
        }
      });
    },
    attached: function attached() {
      this.setHaxProperties({
        canScale: !0,
        canPosition: !0,
        canEditSource: !1,
        gizmo: {
          title: "Code editor",
          description: "Edit code in the browser with minor HTML validation",
          icon: "icons:code",
          color: "blue",
          groups: ["Code", "Development"],
          handles: [{ type: "code", code: "contents" }],
          meta: { author: "LRNWebComponents" }
        },
        settings: {
          quick: [
            {
              property: "title",
              title: "Title",
              description: "The title of the element",
              inputMethod: "textfield",
              icon: "editor:title"
            },
            {
              property: "showCodePen",
              title: "Code pen button",
              description: "Play with this on code pen",
              inputMethod: "boolean",
              icon: "icons:code"
            }
          ],
          configure: [
            {
              property: "title",
              title: "Title",
              description: "The title of the element",
              inputMethod: "textfield",
              icon: "editor:title"
            },
            {
              property: "showCodePen",
              title: "Code pen button",
              description: "Play with this on code pen",
              inputMethod: "boolean",
              icon: "icons:code"
            },
            {
              slot: "",
              title: "Code",
              description: "The code to present to the user",
              inputMethod: "code-editor",
              icon: "editor:title"
            }
          ],
          advanced: []
        }
      });
    }
  });
});