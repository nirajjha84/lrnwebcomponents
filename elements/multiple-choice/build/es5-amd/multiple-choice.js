define([
  "exports",
  "require",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@polymer/polymer/lib/utils/render-status.js",
  "./node_modules/@polymer/polymer/lib/elements/dom-repeat.js",
  "./node_modules/@polymer/polymer/lib/elements/dom-if.js",
  "./node_modules/@lrnwebcomponents/schema-behaviors/schema-behaviors.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js",
  "./node_modules/@polymer/paper-toast/paper-toast.js",
  "./node_modules/@lrnwebcomponents/simple-colors/simple-colors.js"
], function(
  _exports,
  _require,
  _polymerElement,
  _renderStatus,
  _domRepeat,
  _domIf,
  _schemaBehaviors,
  _HAXWiring,
  _paperToast,
  _simpleColors
) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.MultipleChoice = void 0;
  _require = babelHelpers.interopRequireWildcard(_require);
  function _templateObject_4086d63062b211e9ab1c299d6c9ec638() {
    var data = babelHelpers.taggedTemplateLiteral(
      [
        '\n      <style include="simple-colors">\n        :host {\n          display: block;\n          padding: 16px 16px 54px 16px;\n        }\n        .red {\n          background-color: var(--simple-colors-default-theme-red-8);\n        }\n        .green {\n          background-color: var(--simple-colors-default-theme-green-8);\n        }\n        h3 {\n          margin: 8px;\n        }\n        ul {\n          list-style: none;\n          padding: 0;\n          margin: 0;\n        }\n        ul li {\n          padding: 8px;\n        }\n        paper-radio-button {\n          padding: 8px;\n          display: block;\n        }\n        paper-checkbox {\n          padding: 8px;\n        }\n        iron-icon {\n          display: inline-flex;\n        }\n      </style>\n      <meta property="oer:assessing" content$="[[relatedResource]]" />\n      <h3 hidden$="[[hideTitle]]">\n        <span property="oer:name">[[title]]</span>\n      </h3>\n      <div>[[question]]</div>\n      <template is="dom-if" if="[[singleOption]]" restamp>\n        <paper-radio-group>\n          <template\n            is="dom-repeat"\n            items="[[displayedAnswers]]"\n            as="answer"\n            mutable-data\n          >\n            <paper-radio-button\n              disabled$="[[disabled]]"\n              property="oer:answer"\n              name$="[[index]]"\n              checked="{{answer.userGuess}}"\n              >[[answer.label]]</paper-radio-button\n            >\n          </template>\n        </paper-radio-group>\n      </template>\n      <template is="dom-if" if="[[!singleOption]]" restamp>\n        <ul>\n          <template\n            is="dom-repeat"\n            items="[[displayedAnswers]]"\n            as="answer"\n            mutable-data\n          >\n            <li>\n              <paper-checkbox\n                disabled$="[[disabled]]"\n                property="oer:answer"\n                checked="{{answer.userGuess}}"\n                >[[answer.label]]</paper-checkbox\n              >\n            </li>\n          </template>\n        </ul>\n      </template>\n      <div hidden$="[[hideButtons]]">\n        <paper-button\n          disabled$="[[disabled]]"\n          raised=""\n          on-tap="_verifyAnswers"\n          >[[checkLabel]]</paper-button\n        >\n        <paper-button disabled$="[[disabled]]" raised="" on-tap="resetAnswers"\n          >[[resetLabel]]</paper-button\n        >\n      </div>\n      <paper-toast\n        id="toast"\n        duration="6000"\n        class$="fit-bottom [[__toastColor]]"\n      >\n        [[__toastText]]\n        <iron-icon icon="[[__toastIcon]]" style="margin-left:16px;"></iron-icon>\n      </paper-toast>\n    '
      ],
      [
        '\n      <style include="simple-colors">\n        :host {\n          display: block;\n          padding: 16px 16px 54px 16px;\n        }\n        .red {\n          background-color: var(--simple-colors-default-theme-red-8);\n        }\n        .green {\n          background-color: var(--simple-colors-default-theme-green-8);\n        }\n        h3 {\n          margin: 8px;\n        }\n        ul {\n          list-style: none;\n          padding: 0;\n          margin: 0;\n        }\n        ul li {\n          padding: 8px;\n        }\n        paper-radio-button {\n          padding: 8px;\n          display: block;\n        }\n        paper-checkbox {\n          padding: 8px;\n        }\n        iron-icon {\n          display: inline-flex;\n        }\n      </style>\n      <meta property="oer:assessing" content\\$="[[relatedResource]]" />\n      <h3 hidden\\$="[[hideTitle]]">\n        <span property="oer:name">[[title]]</span>\n      </h3>\n      <div>[[question]]</div>\n      <template is="dom-if" if="[[singleOption]]" restamp>\n        <paper-radio-group>\n          <template\n            is="dom-repeat"\n            items="[[displayedAnswers]]"\n            as="answer"\n            mutable-data\n          >\n            <paper-radio-button\n              disabled\\$="[[disabled]]"\n              property="oer:answer"\n              name$="[[index]]"\n              checked="{{answer.userGuess}}"\n              >[[answer.label]]</paper-radio-button\n            >\n          </template>\n        </paper-radio-group>\n      </template>\n      <template is="dom-if" if="[[!singleOption]]" restamp>\n        <ul>\n          <template\n            is="dom-repeat"\n            items="[[displayedAnswers]]"\n            as="answer"\n            mutable-data\n          >\n            <li>\n              <paper-checkbox\n                disabled\\$="[[disabled]]"\n                property="oer:answer"\n                checked="{{answer.userGuess}}"\n                >[[answer.label]]</paper-checkbox\n              >\n            </li>\n          </template>\n        </ul>\n      </template>\n      <div hidden\\$="[[hideButtons]]">\n        <paper-button\n          disabled\\$="[[disabled]]"\n          raised=""\n          on-tap="_verifyAnswers"\n          >[[checkLabel]]</paper-button\n        >\n        <paper-button disabled\\$="[[disabled]]" raised="" on-tap="resetAnswers"\n          >[[resetLabel]]</paper-button\n        >\n      </div>\n      <paper-toast\n        id="toast"\n        duration="6000"\n        class\\$="fit-bottom [[__toastColor]]"\n      >\n        [[__toastText]]\n        <iron-icon icon="[[__toastIcon]]" style="margin-left:16px;"></iron-icon>\n      </paper-toast>\n    '
      ]
    );
    _templateObject_4086d63062b211e9ab1c299d6c9ec638 = function _templateObject_4086d63062b211e9ab1c299d6c9ec638() {
      return data;
    };
    return data;
  }
  /**
   * `multiple-choice`
   * `Ask the user a question from a set of possible answers.`
   * @demo demo/index.html
   */ var MultipleChoice = /*#__PURE__*/ (function(_SchemaBehaviors) {
    babelHelpers.inherits(MultipleChoice, _SchemaBehaviors);
    babelHelpers.createClass(MultipleChoice, null, [
      {
        key: "tag",
        get: function get() {
          return "multiple-choice";
        }
      }
    ]);
    function MultipleChoice() {
      var _this;
      babelHelpers.classCallCheck(this, MultipleChoice);
      _this = babelHelpers.possibleConstructorReturn(
        this,
        babelHelpers.getPrototypeOf(MultipleChoice).call(this)
      );
      new Promise(function(res, rej) {
        return _require.default(
          ["@polymer/iron-icons/iron-icons.js"],
          res,
          rej
        );
      }).then(function(bundle) {
        return noop();
      });
      new Promise(function(res, rej) {
        return _require.default(["@polymer/iron-icon/iron-icon.js"], res, rej);
      }).then(function(bundle) {
        return noop();
      });
      new Promise(function(res, rej) {
        return _require.default(
          ["@polymer/paper-button/paper-button.js"],
          res,
          rej
        );
      }).then(function(bundle) {
        return noop();
      });
      return _this;
    }
    babelHelpers.createClass(
      MultipleChoice,
      [
        {
          key: "_valueChanged",
          /**
           * Notice an answer has changed and update the DOM.
           */ value: function _valueChanged(e) {
            for (var i in e) {
              for (var j in e[i]) {
                this.notifyPath("displayedAnswers." + i + "." + j);
              }
            }
          }
          /**
           * Reset user answers and shuffle the board again.
           */
        },
        {
          key: "resetAnswers",
          value: function resetAnswers(e) {
            var _this2 = this;
            this.$.toast.hide(); // loop and force all answers to false
            for (var i in this.displayedAnswers) {
              if (this.displayedAnswers[i].userGuess) {
                this.displayedAnswers[i].userGuess = !1;
              }
            }
            setTimeout(function() {
              var answers = _this2.answers;
              _this2.set("answers", []);
              _this2.set("answers", answers);
            }, 100);
          }
          /**
           * Return if the current answers are correct
           */
        },
        {
          key: "checkAnswers",
          value: function checkAnswers() {
            var gotRight = !0; // see that they got them all right
            for (var i in this.displayedAnswers) {
              if (
                !1 != gotRight &&
                this.displayedAnswers[i].correct &&
                this.displayedAnswers[i].userGuess
              ) {
                gotRight = !0;
              } else if (
                this.displayedAnswers[i].correct &&
                !this.displayedAnswers[i].userGuess
              ) {
                gotRight = !1;
              } else if (
                !this.displayedAnswers[i].correct &&
                this.displayedAnswers[i].userGuess
              ) {
                gotRight = !1;
              }
            }
            return gotRight;
          }
          /**
           * Verify the answers of the user based on their saying
           * that they want to see how they did.
           */
        },
        {
          key: "_verifyAnswers",
          value: function _verifyAnswers(e) {
            var gotRight = this.checkAnswers(); // see if they got this correct based on their answers
            if (gotRight) {
              this.$.toast.hide();
              this.__toastColor = "green";
              this.__toastIcon = "thumb-up";
              this.__toastText = this.correctText;
              this.$.toast.show();
            } else {
              this.$.toast.hide();
              this.__toastColor = "red";
              this.__toastIcon = "thumb-down";
              this.__toastText = this.incorrectText;
              this.$.toast.show();
            }
          }
          /**
           * Figure out the order of the answers which will be displayed
           */
        },
        {
          key: "_computeDisplayedAnswers",
          value: function _computeDisplayedAnswers(answers, randomize) {
            if (
              babelHelpers.typeof(answers) !==
                ("undefined" === typeof void 0
                  ? "undefined"
                  : babelHelpers.typeof(void 0)) &&
              null != answers &&
              0 < answers.length &&
              randomize
            ) {
              var random = answers,
                currentIndex = random.length,
                temporaryValue,
                randomIndex; // While there remain elements to shuffle...
              while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1; // And swap it with the current element.
                temporaryValue = random[currentIndex];
                random[currentIndex] = random[randomIndex];
                random[randomIndex] = temporaryValue;
              } // @todo apply a random sort to the answers array
              return random;
            } else {
              return answers;
            }
          }
        },
        {
          key: "connectedCallback",
          /**
           * Attached to the DOM, now fire.
           */ value: function connectedCallback() {
            babelHelpers
              .get(
                babelHelpers.getPrototypeOf(MultipleChoice.prototype),
                "connectedCallback",
                this
              )
              .call(this); // single option implies it's a radio group or if multiple, do check boxes
            if (this.singleOption) {
              new Promise(function(res, rej) {
                return _require.default(
                  ["@polymer/paper-radio-group/paper-radio-group.js"],
                  res,
                  rej
                );
              }).then(function(bundle) {
                return noop();
              });
              new Promise(function(res, rej) {
                return _require.default(
                  ["@polymer/paper-radio-button/paper-radio-button.js"],
                  res,
                  rej
                );
              }).then(function(bundle) {
                return noop();
              });
            } else {
              new Promise(function(res, rej) {
                return _require.default(
                  ["@polymer/paper-checkbox/paper-checkbox.js"],
                  res,
                  rej
                );
              }).then(function(bundle) {
                return noop();
              });
            }
            this.setAttribute("typeof", "oer:Assessment");
            (0, _renderStatus.afterNextRender)(this, function() {
              this.$.toast.fitInto = this;
              this.HAXWiring = new _HAXWiring.HAXWiring();
              this.HAXWiring.setup(
                MultipleChoice.haxProperties,
                MultipleChoice.tag,
                this
              );
            });
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_4086d63062b211e9ab1c299d6c9ec638()
            );
          }
        },
        {
          key: "properties",
          get: function get() {
            return Object.assign(
              {
                /**
                 * Title
                 */ title: { type: String, value: "" },
                /**
                 * Support disabling interaction with the entire board
                 */ disabled: { type: Boolean, value: !1 },
                /**
                 * Simple option, otherwise allow multiple via checkbox
                 */ singleOption: { type: Boolean, value: !1 },
                /**
                 * Text of the label to check your answer
                 */ checkLabel: { type: String, value: "Check answer" },
                /**
                 * Text of the reset button
                 */ resetLabel: { type: String, value: "Reset" },
                /**
                 * Related Resource ID
                 */ relatedResource: { type: String },
                /**
                 * Flag to hide the title
                 */ hideTitle: { type: Boolean, value: !1 },
                /**
                 * Question to ask
                 */ question: { type: String, value: "" },
                /**
                 * Array of possible answers
                 */ answers: { type: Array, value: [], notify: !0 },
                /**
                 * Displayed Answer set.
                 */ displayedAnswers: {
                  type: Array,
                  computed: "_computeDisplayedAnswers(answers, randomize)",
                  observer: "_valueChanged",
                  notify: !0
                },
                /**
                 * Correct answer text to display
                 */ correctText: { type: String, value: "Great job!" },
                /**
                 * Incorrect answer text to display
                 */ incorrectText: {
                  type: String,
                  value: "Better luck next time!"
                },
                /**
                 * Randomize the display of the answers
                 */ randomize: {
                  type: Boolean,
                  value: !1,
                  reflectToAttribute: !0
                },
                /**
                 * flag to hide buttons
                 */ hideButtons: { type: Boolean, value: !1 }
              },
              babelHelpers.get(
                babelHelpers.getPrototypeOf(MultipleChoice),
                "properties",
                this
              )
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
                title: "Multiple choice",
                description: "Multiple choice self check",
                icon: "icons:list",
                color: "purple",
                groups: ["Instructional"],
                handles: [],
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
                    property: "question",
                    title: "Question",
                    description: "Question for users to respond to.",
                    inputMethod: "textfield",
                    icon: "icons:help"
                  }
                ],
                configure: [
                  {
                    property: "title",
                    title: "Title",
                    description: "The title of the element",
                    inputMethod: "textfield"
                  },
                  {
                    property: "hideTitle",
                    title: "Hide title",
                    description: "Whether or not to display the title",
                    inputMethod: "boolean"
                  },
                  {
                    property: "question",
                    title: "Question",
                    description: "Question for users to respond to.",
                    inputMethod: "textfield"
                  },
                  {
                    property: "randomize",
                    title: "Randomize",
                    description: "Randomize the answers dynamically",
                    inputMethod: "boolean"
                  },
                  {
                    property: "answers",
                    title: "Answer set",
                    description: "Answers in a multiple choice",
                    inputMethod: "array",
                    properties: [
                      {
                        property: "correct",
                        title: "Correct",
                        description: "If this is correct or not",
                        inputMethod: "boolean"
                      },
                      {
                        property: "label",
                        title: "Answer",
                        description: "Possible answer to the question",
                        inputMethod: "textfield",
                        required: !0
                      }
                    ]
                  },
                  {
                    property: "correctText",
                    title: "Correct feedback",
                    description: "Feedback when they get it right",
                    inputMethod: "textfield"
                  },
                  {
                    property: "incorrectText",
                    title: "Incorrect feedback",
                    description: "Feedback when they get it wrong",
                    inputMethod: "textfield"
                  }
                ],
                advanced: [
                  {
                    property: "checkLabel",
                    title: "Check answers label",
                    description: "Label for getting solution feedback",
                    inputMethod: "textfield"
                  },
                  {
                    property: "resetLabel",
                    title: "Reset label",
                    description: "label for the reset button",
                    inputMethod: "textfield"
                  }
                ]
              },
              saveOptions: { unsetAttributes: ["displayed-answers"] }
            };
          }
        }
      ]
    );
    return MultipleChoice;
  })((0, _schemaBehaviors.SchemaBehaviors)(_polymerElement.PolymerElement));
  _exports.MultipleChoice = MultipleChoice;
  window.customElements.define("multiple-choice", MultipleChoice);
});
