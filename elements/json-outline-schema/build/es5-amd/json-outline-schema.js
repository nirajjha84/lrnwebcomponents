define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.JsonOutlineSchema = void 0;
  function _templateObject_d6ce63c0d6f211e8aa29edf2f5aa5fe2() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_d6ce63c0d6f211e8aa29edf2f5aa5fe2 = function() {
      return data;
    };
    return data;
  }
  var JsonOutlineSchema = (function(_PolymerElement) {
    babelHelpers.inherits(JsonOutlineSchema, _PolymerElement);
    function JsonOutlineSchema() {
      babelHelpers.classCallCheck(this, JsonOutlineSchema);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          JsonOutlineSchema.__proto__ ||
          Object.getPrototypeOf(JsonOutlineSchema)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      JsonOutlineSchema,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                JsonOutlineSchema.prototype.__proto__ ||
                  Object.getPrototypeOf(JsonOutlineSchema.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              JsonOutlineSchema.haxProperties,
              JsonOutlineSchema.tag,
              this
            );
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_d6ce63c0d6f211e8aa29edf2f5aa5fe2()
            );
          }
        },
        {
          key: "haxProperties",
          get: function get() {
            return {
              canScale: !0,
              canPosition: !0,
              canEditSource: !1,
              gizmo: {
                title: "Json outline-schema",
                description: "Automated conversion of json-outline-schema/",
                icon: "icons:android",
                color: "green",
                groups: ["Outline"],
                handles: [{ type: "todo:read-the-docs-for-usage" }],
                meta: {
                  author: "btopro",
                  owner: "The Pennsylvania State University"
                }
              },
              settings: { quick: [], configure: [], advanced: [] }
            };
          }
        },
        {
          key: "properties",
          get: function get() {
            return {};
          }
        },
        {
          key: "tag",
          get: function get() {
            return "json-outline-schema";
          }
        }
      ]
    );
    return JsonOutlineSchema;
  })(_polymerElement.PolymerElement);
  _exports.JsonOutlineSchema = JsonOutlineSchema;
  window.customElements.define(JsonOutlineSchema.tag, JsonOutlineSchema);
});