define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.GrafittoFilter = void 0;
  function _templateObject_5232c090d7f411e8b2cb35ffb2793c04() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_5232c090d7f411e8b2cb35ffb2793c04 = function() {
      return data;
    };
    return data;
  }
  var GrafittoFilter = (function(_PolymerElement) {
    babelHelpers.inherits(GrafittoFilter, _PolymerElement);
    function GrafittoFilter() {
      babelHelpers.classCallCheck(this, GrafittoFilter);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          GrafittoFilter.__proto__ || Object.getPrototypeOf(GrafittoFilter)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      GrafittoFilter,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                GrafittoFilter.prototype.__proto__ ||
                  Object.getPrototypeOf(GrafittoFilter.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              GrafittoFilter.haxProperties,
              GrafittoFilter.tag,
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
              _templateObject_5232c090d7f411e8b2cb35ffb2793c04()
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
                title: "Grafitto filter",
                description: "Start of grafitto-filter fork",
                icon: "icons:android",
                color: "green",
                groups: ["Filter"],
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
            return "grafitto-filter";
          }
        }
      ]
    );
    return GrafittoFilter;
  })(_polymerElement.PolymerElement);
  _exports.GrafittoFilter = GrafittoFilter;
  window.customElements.define(GrafittoFilter.tag, GrafittoFilter);
});
