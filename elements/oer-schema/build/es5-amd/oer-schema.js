define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.OerSchema = void 0;
  function _templateObject_38affe70d70011e8bb379102a3ac9aac() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_38affe70d70011e8bb379102a3ac9aac = function() {
      return data;
    };
    return data;
  }
  var OerSchema = (function(_PolymerElement) {
    babelHelpers.inherits(OerSchema, _PolymerElement);
    function OerSchema() {
      babelHelpers.classCallCheck(this, OerSchema);
      return babelHelpers.possibleConstructorReturn(
        this,
        (OerSchema.__proto__ || Object.getPrototypeOf(OerSchema)).apply(
          this,
          arguments
        )
      );
    }
    babelHelpers.createClass(
      OerSchema,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                OerSchema.prototype.__proto__ ||
                  Object.getPrototypeOf(OerSchema.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              OerSchema.haxProperties,
              OerSchema.tag,
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
              _templateObject_38affe70d70011e8bb379102a3ac9aac()
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
                title: "Oer schema",
                description: "Automated conversion of oer-schema/",
                icon: "icons:android",
                color: "green",
                groups: ["Schema"],
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
            return "oer-schema";
          }
        }
      ]
    );
    return OerSchema;
  })(_polymerElement.PolymerElement);
  _exports.OerSchema = OerSchema;
  window.customElements.define(OerSchema.tag, OerSchema);
});
