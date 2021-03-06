/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "@polymer/neon-animation/neon-animation.js";

/**
 * `chemical-element-visualisation`
 * `A Visualisation of chemical Elements`
 *
 * @demo demo/index.html
 */
class ChemicalElementVisualisation extends PolymerElement {
  static get template() {
    return html`
      <custom-style>
        <style>
          .alkali-metal {
            fill: var(--alkali-metal-primary-color, #ff8a65);
          }
          .alkaline-earth-metal {
            fill: var(--alkaline-earth-metal-primary-color, #ffb74d);
          }
          .transition-metal {
            fill: var(--transition-metal-primary-color, #ffd54f);
          }
          .post-transition-metal {
            fill: var(--post-transition-metal-primary-color, #dce775);
          }
          .metalloid {
            fill: var(--metalloid-primary-color, #aed581);
          }
          .other-nonmetal {
            fill: var(--other-nonmetal-primary-color, #4db6ac);
          }
          .halogen {
            fill: var(--halogen-primary-color, #4dd0e1);
          }
          .noble-gas {
            fill: var(--noble-gas-primary-color, #4fc3f7);
          }
          .lanthanide {
            fill: var(--lanthanide-primary-color, #9575cd);
          }
          .actinide {
            fill: var(--actinide-primary-color, #f06292);
          }

          .ring {
            fill: none;
            stroke: #ddd;
          }

          .electron {
            fill: #888;
          }

          .electron-background {
            fill: #fff;
          }

          .s-group-electron {
            fill: var(--s-group-electron-color, #2196f3);
          }
          .p-group-electron {
            fill: var(--p-group-electron-color, #ff9800);
          }
          .d-group-electron {
            fill: var(--d-group-electron-color, #4caf50);
          }
          .f-group-electron {
            fill: var(--f-group-electron-color, #e91e63);
          }
        </style>
      </custom-style>
      <svg id="element" version="1.1" viewBox="0 0 500 500">
        <title>An animation of the chemical element [[_element.name]].</title>
        <circle
          cx\$="[[_divide(500, 2)]]"
          cy\$="[[_divide(500, 2)]]"
          r\$="[[_divide(500, 10)]]"
          class\$="[[_element.group]]"
        ></circle>
        <g id="ring-group"></g>
        <g id="electron-group"></g>
      </svg>
      <paper-tooltip for="element" position="bottom" animation-delay="0">
        [[_element.name]]
      </paper-tooltip>
    `;
  }
  static get is() {
    return "chemical-element-visualisation";
  }

  static get properties() {
    return {
      symbol: String,
      _elements: {
        type: Object,
        value: {
          h: {
            symbol: "H",
            name: "Hydrogen",
            group: "other-nonmetal",
            "atomic-number": 1,
            "electron-configuration": [{ s: 1, p: 0, d: 0, f: 0 }],
            electronegativity: 2.2,
            "atomic-weight": 1.0079,
            "melting-point": 13.99,
            "boiling-point": 20.271
          },
          he: {
            symbol: "He",
            name: "Helium",
            group: "noble-gas",
            "atomic-number": 2,
            "electron-configuration": [{ s: 2, p: 0, d: 0, f: 0 }],
            electronegativity: "no data",
            "atomic-weight": 4.0026,
            "melting-point": 0.95,
            "boiling-point": 4.222
          },

          li: {
            symbol: "Li",
            name: "Lithium",
            group: "alkali-metal",
            "atomic-number": 3,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.98,
            "atomic-weight": 6.94,
            "melting-point": 453.65,
            "boiling-point": 1603
          },
          be: {
            symbol: "Be",
            name: "Beryllium",
            group: "alkaline-earth-metal",
            "atomic-number": 4,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.57,
            "atomic-weight": 9.0121831,
            "melting-point": 1560,
            "boiling-point": 2742
          },
          b: {
            symbol: "B",
            name: "Boron",
            group: "metalloid",
            "atomic-number": 5,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 1, d: 0, f: 0 }
            ],
            electronegativity: 2.04,
            "atomic-weight": 10.81,
            "melting-point": 2349,
            "boiling-point": 4200
          },
          c: {
            symbol: "C",
            name: "Carbon",
            group: "other-nonmetal",
            "atomic-number": 6,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 2, d: 0, f: 0 }
            ],
            electronegativity: 2.55,
            "atomic-weight": 12.011,
            "melting-point": "-",
            "boiling-point": "-"
          },
          n: {
            symbol: "N",
            name: "Nitrogen",
            group: "other-nonmetal",
            "atomic-number": 7,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 3, d: 0, f: 0 }
            ],
            electronegativity: 3.04,
            "atomic-weight": 14.007,
            "melting-point": 63.15,
            "boiling-point": 77.355
          },
          o: {
            symbol: "O",
            name: "Oxygen",
            group: "other-nonmetal",
            "atomic-number": 8,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 4, d: 0, f: 0 }
            ],
            electronegativity: 3.44,
            "atomic-weight": 15.999,
            "melting-point": 54.36,
            "boiling-point": 90.188
          },
          f: {
            symbol: "F",
            name: "Fluorine",
            group: "halogen",
            "atomic-number": 9,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 5, d: 0, f: 0 }
            ],
            electronegativity: 3.98,
            "atomic-weight": 18.998403163,
            "melting-point": 53.48,
            "boiling-point": 85.03
          },
          ne: {
            symbol: "Ne",
            name: "Neon",
            group: "noble-gas",
            "atomic-number": 10,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 }
            ],
            electronegativity: "no data",
            "atomic-weight": 20.1797,
            "melting-point": 24.56,
            "boiling-point": 27.104
          },

          na: {
            symbol: "Na",
            name: "Sodium",
            group: "alkali-metal",
            "atomic-number": 11,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.93,
            "atomic-weight": 22.98976928,
            "melting-point": 370.944,
            "boiling-point": 208.029
          },
          mg: {
            symbol: "Mg",
            name: "Magnesium",
            group: "alkaline-earth-metal",
            "atomic-number": 12,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.31,
            "atomic-weight": 24.305,
            "melting-point": 923,
            "boiling-point": 1363
          },
          al: {
            symbol: "Al",
            name: "Aluminium",
            group: "post-transition-metal",
            "atomic-number": 13,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 1, d: 0, f: 0 }
            ],
            electronegativity: 1.61,
            "atomic-weight": 26.9815385,
            "melting-point": 933.47,
            "boiling-point": 2743
          },
          si: {
            symbol: "Si",
            name: "Silicon",
            group: "metalloid",
            "atomic-number": 14,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 2, d: 0, f: 0 }
            ],
            electronegativity: 1.9,
            "atomic-weight": 28.085,
            "melting-point": 1687,
            "boiling-point": 3538
          },
          p: {
            symbol: "P",
            name: "Phosphorus",
            group: "other-nonmetal",
            "atomic-number": 15,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 3, d: 0, f: 0 }
            ],
            electronegativity: 2.19,
            "atomic-weight": 30.973761998,
            "melting-point": "-",
            "boiling-point": "-"
          },
          s: {
            symbol: "S",
            name: "Sulfur",
            group: "other-nonmetal",
            "atomic-number": 16,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 4, d: 0, f: 0 }
            ],
            electronegativity: "2.58",
            "atomic-weight": 32.06,
            "melting-point": "388.36",
            "boiling-point": "717.8"
          },
          cl: {
            symbol: "Cl",
            name: "Chlorine",
            group: "halogen",
            "atomic-number": 17,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 5, d: 0, f: 0 }
            ],
            electronegativity: 3.16,
            "atomic-weight": 35.45,
            "melting-point": 171.6,
            "boiling-point": 239.11
          },
          ar: {
            symbol: "Ar",
            name: "Argon",
            group: "noble-gas",
            "atomic-number": 18,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 }
            ],
            electronegativity: "no data",
            "atomic-weight": 39.948,
            "melting-point": 83.81,
            "boiling-point": 87.302
          },

          k: {
            symbol: "K",
            name: "Potasium",
            group: "alkali-metal",
            "atomic-number": 19,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.82,
            "atomic-weight": 39.0983,
            "melting-point": 336.7,
            "boiling-point": 1032
          },
          ca: {
            symbol: "Ca",
            name: "Calcium",
            group: "alkaline-earth-metal",
            "atomic-number": 20,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.0,
            "atomic-weight": 40.078,
            "melting-point": 1115,
            "boiling-point": 1757
          },
          sc: {
            symbol: "Sc",
            name: "Scandium",
            group: "transition-metal",
            "atomic-number": 21,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.36,
            "atomic-weight": 44.955908,
            "melting-point": 1814,
            "boiling-point": 3109
          },
          ti: {
            symbol: "Ti",
            name: "Titanium",
            group: "transition-metal",
            "atomic-number": 22,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 2, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.54,
            "atomic-weight": 47.867,
            "melting-point": 1941,
            "boiling-point": 3560
          },
          v: {
            symbol: "V",
            name: "Vanadium",
            group: "transition-metal",
            "atomic-number": 23,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 3, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.63,
            "atomic-weight": 50.9415,
            "melting-point": 2183,
            "boiling-point": 3680
          },
          cr: {
            symbol: "Cr",
            name: "Chromium",
            group: "transition-metal",
            "atomic-number": 24,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 5, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.66,
            "atomic-weight": 51.9961,
            "melting-point": 2180,
            "boiling-point": 2944
          },
          mn: {
            symbol: "Mn",
            name: "Manganese",
            group: "transition-metal",
            "atomic-number": 25,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 5, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.55,
            "atomic-weight": 54.938044,
            "melting-point": 1519,
            "boiling-point": 2334
          },
          fe: {
            symbol: "Fe",
            name: "Iron",
            group: "transition-metal",
            "atomic-number": 26,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 6, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.83,
            "atomic-weight": 55.845,
            "melting-point": 1811,
            "boiling-point": 3134
          },
          co: {
            symbol: "Co",
            name: "Cobalt",
            group: "transition-metal",
            "atomic-number": 27,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 7, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.88,
            "atomic-weight": 58.933194,
            "melting-point": 1768,
            "boiling-point": 3200
          },
          ni: {
            symbol: "Ni",
            name: "Nickel",
            group: "transition-metal",
            "atomic-number": 28,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 8, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.91,
            "atomic-weight": 58.6934,
            "melting-point": 1728,
            "boiling-point": 3003
          },
          cu: {
            symbol: "Cu",
            name: "Copper",
            group: "transition-metal",
            "atomic-number": 29,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.9,
            "atomic-weight": 63.546,
            "melting-point": 1357.77,
            "boiling-point": 2835
          },
          zn: {
            symbol: "Zn",
            name: "Zinc",
            group: "transition-metal",
            "atomic-number": 30,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.65,
            "atomic-weight": 65.38,
            "melting-point": 692.68,
            "boiling-point": 1180
          },
          ga: {
            symbol: "Ga",
            name: "Gallium",
            group: "post-transition-metal",
            "atomic-number": 31,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 1, d: 0, f: 0 }
            ],
            electronegativity: 1.81,
            "atomic-weight": 69.723,
            "melting-point": 302.9146,
            "boiling-point": 2673
          },
          ge: {
            symbol: "Ge",
            name: "Germanium",
            group: "metalloid",
            "atomic-number": 32,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 2, d: 0, f: 0 }
            ],
            electronegativity: 2.01,
            "atomic-weight": 72.63,
            "melting-point": 1211.4,
            "boiling-point": 3106
          },
          as: {
            symbol: "As",
            name: "Arsenic",
            group: "metalloid",
            "atomic-number": 33,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 3, d: 0, f: 0 }
            ],
            electronegativity: 2.18,
            "atomic-weight": 74.921595,
            "melting-point": "-",
            "boiling-point": "-"
          },
          se: {
            symbol: "Se",
            name: "Selenium",
            group: "other-nonmetal",
            "atomic-number": 34,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 4, d: 0, f: 0 }
            ],
            electronegativity: 2.55,
            "atomic-weight": 78.971,
            "melting-point": 494,
            "boiling-point": 958
          },
          br: {
            symbol: "Br",
            name: "Bromine",
            group: "halogen",
            "atomic-number": 35,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 5, d: 0, f: 0 }
            ],
            electronegativity: 2.96,
            "atomic-weight": 79.904,
            "melting-point": 265.8,
            "boiling-point": 332.0
          },
          kr: {
            symbol: "Kr",
            name: "Krypton",
            group: "noble-gas",
            "atomic-number": 36,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 }
            ],
            electronegativity: 3.0,
            "atomic-weight": 83.798,
            "melting-point": 115.78,
            "boiling-point": 119.93
          },

          rb: {
            symbol: "Rb",
            name: "Rubidium",
            group: "alkali-metal",
            "atomic-number": 37,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.82,
            "atomic-weight": 85.4678,
            "melting-point": 312.45,
            "boiling-point": 961
          },
          sr: {
            symbol: "Sr",
            name: "Strontium",
            group: "alkaline-earth-metal",
            "atomic-number": 38,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.95,
            "atomic-weight": 87.62,
            "melting-point": 1050,
            "boiling-point": 1650
          },
          y: {
            symbol: "Y",
            name: "Yttrium",
            group: "transition-metal",
            "atomic-number": 39,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.22,
            "atomic-weight": 88.90584,
            "melting-point": 1799,
            "boiling-point": 3203
          },
          zr: {
            symbol: "Zr",
            name: "Zirconium",
            group: "transition-metal",
            "atomic-number": 40,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 2, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.33,
            "atomic-weight": 91.224,
            "melting-point": 2128,
            "boiling-point": 4650
          },
          nb: {
            symbol: "Nb",
            name: "Niobium",
            group: "transition-metal",
            "atomic-number": 41,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 4, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.6,
            "atomic-weight": 92.90637,
            "melting-point": 2750,
            "boiling-point": 5017
          },
          mo: {
            symbol: "Mo",
            name: "Molybdenum",
            group: "transition-metal",
            "atomic-number": 42,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 5, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.16,
            "atomic-weight": 95.95,
            "melting-point": 2896,
            "boiling-point": 4912
          },
          tc: {
            symbol: "Tc",
            name: "Technetium",
            group: "transition-metal",
            "atomic-number": 43,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 5, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.9,
            "atomic-weight": "?",
            "melting-point": 2430,
            "boiling-point": 4538
          },
          ru: {
            symbol: "Ru",
            name: "Ruthenium",
            group: "transition-metal",
            "atomic-number": 44,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 7, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.2,
            "atomic-weight": 101.07,
            "melting-point": 2607,
            "boiling-point": 4423
          },

          rh: {
            symbol: "Rh",
            name: "Rhodium",
            group: "transition-metal",
            "atomic-number": 45,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 8, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.28,
            "atomic-weight": 102.9055,
            "melting-point": 2237,
            "boiling-point": 3968
          },
          pd: {
            symbol: "Pd",
            name: "Palladium",
            group: "transition-metal",
            "atomic-number": 46,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 0, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.2,
            "atomic-weight": 106.42,
            "melting-point": 1828.05,
            "boiling-point": 3236
          },
          ag: {
            symbol: "Ag",
            name: "Silver",
            group: "transition-metal",
            "atomic-number": 47,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.93,
            "atomic-weight": 107.8682,
            "melting-point": 1234.93,
            "boiling-point": 2435
          },
          cd: {
            symbol: "Cd",
            name: "Cadmium",
            group: "transition-metal",
            "atomic-number": 48,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.69,
            "atomic-weight": 112.414,
            "melting-point": 594.22,
            "boiling-point": 1040
          },
          in: {
            symbol: "In",
            name: "Indium",
            group: "post-transition-metal",
            "atomic-number": 49,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 1, d: 0, f: 0 }
            ],
            electronegativity: 1.78,
            "atomic-weight": 114.818,
            "melting-point": 429.7485,
            "boiling-point": 2345
          },
          sn: {
            symbol: "Sn",
            name: "Tin",
            group: "post-transition-metal",
            "atomic-number": 50,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 2, d: 0, f: 0 }
            ],
            electronegativity: 1.96,
            "atomic-weight": 118.71,
            "melting-point": 505.08,
            "boiling-point": 2875
          },
          sb: {
            symbol: "Sb",
            name: "Antimony",
            group: "metalloid",
            "atomic-number": 51,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 3, d: 0, f: 0 }
            ],
            electronegativity: 2.05,
            "atomic-weight": 121.76,
            "melting-point": 903.78,
            "boiling-point": 1908
          },
          te: {
            symbol: "Te",
            name: "Tellurium",
            group: "metalloid",
            "atomic-number": 52,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 4, d: 0, f: 0 }
            ],
            electronegativity: 2.1,
            "atomic-weight": 127.6,
            "melting-point": 722.66,
            "boiling-point": 1261
          },
          i: {
            symbol: "I",
            name: "Iodine",
            group: "halogen",
            "atomic-number": 53,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 5, d: 0, f: 0 }
            ],
            electronegativity: 2.66,
            "atomic-weight": 126.90447,
            "melting-point": 386.85,
            "boiling-point": 457.4
          },
          xe: {
            symbol: "Xe",
            name: "Xenon",
            group: "noble-gas",
            "atomic-number": 54,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 }
            ],
            electronegativity: 2.6,
            "atomic-weight": 131.293,
            "melting-point": 161.4,
            "boiling-point": 165.051
          },

          cs: {
            symbol: "Cs",
            name: "Caesium",
            group: "alkali-metal",
            "atomic-number": 55,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.79,
            "atomic-weight": 132.90545196,
            "melting-point": 301.7,
            "boiling-point": 944
          },
          ba: {
            symbol: "Ba",
            name: "Barium",
            group: "alkaline-earth-metal",
            "atomic-number": 56,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: "?",
            "atomic-weight": 137.327,
            "melting-point": 1000,
            "boiling-point": 2118
          },
          hf: {
            symbol: "Hf",
            name: "Hafnium",
            group: "transition-metal",
            "atomic-number": 72,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 2, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 178.49,
            "melting-point": 2506,
            "boiling-point": 4876
          },
          ta: {
            symbol: "Ta",
            name: "Tantalium",
            group: "transition-metal",
            "atomic-number": 73,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 3, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.5,
            "atomic-weight": 180.94788,
            "melting-point": 3290,
            "boiling-point": 5731
          },
          w: {
            symbol: "W",
            name: "Tungsten",
            group: "transition-metal",
            "atomic-number": 74,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 4, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.36,
            "atomic-weight": 183.84,
            "melting-point": 3695,
            "boiling-point": 6203
          },
          re: {
            symbol: "Re",
            name: "Rhenium",
            group: "transition-metal",
            "atomic-number": 75,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 5, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.9,
            "atomic-weight": 186.207,
            "melting-point": 3459,
            "boiling-point": 5903
          },
          os: {
            symbol: "Os",
            name: "Osmium",
            group: "transition-metal",
            "atomic-number": 76,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 6, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.2,
            "atomic-weight": 190.23,
            "melting-point": 3306,
            "boiling-point": 5285
          },
          ir: {
            symbol: "Ir",
            name: "Iridium",
            group: "transition-metal",
            "atomic-number": 77,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 7, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.2,
            "atomic-weight": 192.217,
            "melting-point": 2719,
            "boiling-point": 4403
          },
          pt: {
            symbol: "Pt",
            name: "Platinium",
            group: "transition-metal",
            "atomic-number": 78,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 9, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.28,
            "atomic-weight": 195.084,
            "melting-point": 2041.4,
            "boiling-point": 4098
          },
          au: {
            symbol: "Au",
            name: "Gold",
            group: "transition-metal",
            "atomic-number": 79,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.54,
            "atomic-weight": 196.966569,
            "melting-point": 1337.33,
            "boiling-point": 3243
          },
          hg: {
            symbol: "Hg",
            name: "Mercury",
            group: "transition-metal",
            "atomic-number": 80,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 2.0,
            "atomic-weight": 200.592,
            "melting-point": 234.321,
            "boiling-point": 629.88
          },
          tl: {
            symbol: "Tl",
            name: "Thallium",
            group: "post-transition-metal",
            "atomic-number": 81,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 1, d: 0, f: 0 }
            ],
            electronegativity: 1.62,
            "atomic-weight": 204.38,
            "melting-point": 577,
            "boiling-point": 1746
          },
          pb: {
            symbol: "Pb",
            name: "Lead",
            group: "post-transition-metal",
            "atomic-number": 82,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 2, d: 0, f: 0 }
            ],
            electronegativity: 1.87,
            "atomic-weight": 207.2,
            "melting-point": 600.61,
            "boiling-point": 2022
          },
          bi: {
            symbol: "Bi",
            name: "Bismuth",
            group: "post-transition-metal",
            "atomic-number": 83,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 3, d: 0, f: 0 }
            ],
            electronegativity: 2.02,
            "atomic-weight": 208.9804,
            "melting-point": 544.7,
            "boiling-point": 1837
          },
          po: {
            symbol: "Po",
            name: "Polonium",
            group: "metalloid",
            "atomic-number": 84,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 4, d: 0, f: 0 }
            ],
            electronegativity: 2.0,
            "atomic-weight": 209,
            "melting-point": 527,
            "boiling-point": 1235
          },
          at: {
            symbol: "At",
            name: "Astatine",
            group: "halogen",
            "atomic-number": 85,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 5, d: 0, f: 0 }
            ],
            electronegativity: 2.2,
            "atomic-weight": 210,
            "melting-point": 575,
            "boiling-point": 610
          },
          rn: {
            symbol: "Rn",
            name: "Radon",
            group: "noble-gas",
            "atomic-number": 86,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 }
            ],
            electronegativity: 2.2,
            "atomic-weight": 222,
            "melting-point": 202,
            "boiling-point": 211.5
          },

          fr: {
            symbol: "Fr",
            name: "Francium",
            group: "alkali-metal",
            "atomic-number": 87,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 1, p: 0, d: 0, f: 0 }
            ],
            electronegativity: "> 0.79",
            "atomic-weight": 223,
            "melting-point": "300 (?)",
            "boiling-point": "950 (?)"
          },
          ra: {
            symbol: "Ra",
            name: "Radium",
            group: "alkaline-earth-metal",
            "atomic-number": 88,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 0.9,
            "atomic-weight": 226,
            "melting-point": 973,
            "boiling-point": 2010
          },
          rf: {
            symbol: "Rf",
            name: "Rutherfordium",
            group: "transition-metal",
            "atomic-number": 104,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          db: {
            symbol: "Db",
            name: "Dubnium",
            group: "transition-metal",
            "atomic-number": 105,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          sg: {
            symbol: "Sg",
            name: "Seaborgium",
            group: "transition-metal",
            "atomic-number": 106,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          bh: {
            symbol: "Bh",
            name: "Bohrium",
            group: "transition-metal",
            "atomic-number": 107,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          hs: {
            symbol: "Hs",
            name: "Hassium",
            group: "transition-metal",
            "atomic-number": 108,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          mt: {
            symbol: "Mt",
            name: "Meitnerium",
            group: "transition-metal",
            "atomic-number": 109,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          ds: {
            symbol: "Ds",
            name: "Darmstadtium",
            group: "transition-metal",
            "atomic-number": 110,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          rg: {
            symbol: "Rg",
            name: "Roentgenium",
            group: "transition-metal",
            "atomic-number": 111,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          cn: {
            symbol: "Cn",
            name: "Copernium",
            group: "transition-metal",
            "atomic-number": 112,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          nh: {
            symbol: "Nh",
            name: "Nihonium",
            group: "post-transition-metal",
            "atomic-number": 113,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          fl: {
            symbol: "Fl",
            name: "Flerovium",
            group: "post-transition-metal",
            "atomic-number": 114,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          mc: {
            symbol: "Mc",
            name: "Moscovium",
            group: "post-transition-metal",
            "atomic-number": 115,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          lv: {
            symbol: "Lv",
            name: "Livermorium",
            group: "post-transition-metal",
            "atomic-number": 116,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          ts: {
            symbol: "Ts",
            name: "Tennessine",
            group: "halogen",
            "atomic-number": 117,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },
          og: {
            symbol: "Og",
            name: "Oganesson",
            group: "noble-gas",
            "atomic-number": 118,
            "electron-configuration": "2",
            electronegativity: "?",
            "atomic-weight": 4.0026,
            "melting-point": "?",
            "boiling-point": "?"
          },

          la: {
            symbol: "La",
            name: "Lanthanum",
            group: "lanthanide",
            "atomic-number": 57,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.1,
            "atomic-weight": 138.90547,
            "melting-point": 1193,
            "boiling-point": 3737
          },
          ce: {
            symbol: "Ce",
            name: "Cerium",
            group: "lanthanide",
            "atomic-number": 58,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 1 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.12,
            "atomic-weight": 140.116,
            "melting-point": 1068,
            "boiling-point": 3716
          },
          pr: {
            symbol: "Pr",
            name: "Praseodymium",
            group: "lanthanide",
            "atomic-number": 59,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 3 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.13,
            "atomic-weight": 140.90766,
            "melting-point": 1208,
            "boiling-point": 3403
          },
          nd: {
            symbol: "Nd",
            name: "Neodymium",
            group: "lanthanide",
            "atomic-number": 60,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 4 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.14,
            "atomic-weight": 144.242,
            "melting-point": 1297,
            "boiling-point": 3347
          },
          pm: {
            symbol: "Pm",
            name: "Promethium",
            group: "lanthanide",
            "atomic-number": 61,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 5 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: "1.13 (?)",
            "atomic-weight": 145,
            "melting-point": 1315,
            "boiling-point": 3273
          },
          sm: {
            symbol: "Sm",
            name: "Samarium",
            group: "lanthanide",
            "atomic-number": 62,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 6 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.17,
            "atomic-weight": 150.36,
            "melting-point": 1345,
            "boiling-point": 2173
          },
          eu: {
            symbol: "Eu",
            name: "Europium",
            group: "lanthanide",
            "atomic-number": 63,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 7 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.2,
            "atomic-weight": 151.964,
            "melting-point": 1099,
            "boiling-point": 1802
          },
          gd: {
            symbol: "Gd",
            name: "Gadolinium",
            group: "lanthanide",
            "atomic-number": 64,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 7 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.2,
            "atomic-weight": 157.25,
            "melting-point": 1585,
            "boiling-point": 3273
          },
          tb: {
            symbol: "Tb",
            name: "Terbium",
            group: "lanthanide",
            "atomic-number": 65,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 9 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: "1.2 (?)",
            "atomic-weight": 158.92535,
            "melting-point": 1629,
            "boiling-point": 3396
          },
          dy: {
            symbol: "Dy",
            name: "Dysprosium",
            group: "lanthanide",
            "atomic-number": 66,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 10 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.22,
            "atomic-weight": 162.5,
            "melting-point": 1680,
            "boiling-point": 2840
          },
          ho: {
            symbol: "Ho",
            name: "Holmium",
            group: "lanthanide",
            "atomic-number": 67,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 11 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.23,
            "atomic-weight": 164.93033,
            "melting-point": 1734,
            "boiling-point": 2873
          },
          er: {
            symbol: "Er",
            name: "Erbium",
            group: "lanthanide",
            "atomic-number": 68,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 12 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.24,
            "atomic-weight": 167.259,
            "melting-point": 1802,
            "boiling-point": 3141
          },
          tm: {
            symbol: "Tm",
            name: "Thulium",
            group: "lanthanide",
            "atomic-number": 69,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 13 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.25,
            "atomic-weight": 168.93422,
            "melting-point": 1818,
            "boiling-point": 2223
          },
          yb: {
            symbol: "Yb",
            name: "Ytterbium",
            group: "lanthanide",
            "atomic-number": 70,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: "1.1 (?)",
            "atomic-weight": 173.045,
            "melting-point": 1097,
            "boiling-point": 1469
          },
          lu: {
            symbol: "Lu",
            name: "Lutetium",
            group: "lanthanide",
            "atomic-number": 71,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.27,
            "atomic-weight": 174.9668,
            "melting-point": 1925,
            "boiling-point": 3675
          },

          ac: {
            symbol: "Ac",
            name: "Actinium",
            group: "actinide",
            "atomic-number": 89,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.1,
            "atomic-weight": 227,
            "melting-point": 1500,
            "boiling-point": 3500
          },
          th: {
            symbol: "Th",
            name: "Thorium",
            group: "actinide",
            "atomic-number": 90,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 2, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 232.0377,
            "melting-point": 2023,
            "boiling-point": 5061
          },
          pa: {
            symbol: "Pa",
            name: "Protactinium",
            group: "actinide",
            "atomic-number": 91,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 2 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.5,
            "atomic-weight": 231.03588,
            "melting-point": 1841,
            "boiling-point": 4300
          },
          u: {
            symbol: "U",
            name: "Uranium",
            group: "actinide",
            "atomic-number": 92,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 3 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.38,
            "atomic-weight": 238.02891,
            "melting-point": 1405.3,
            "boiling-point": 4404
          },
          np: {
            symbol: "Np",
            name: "Neptunium",
            group: "actinide",
            "atomic-number": 93,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 4 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.36,
            "atomic-weight": 237,
            "melting-point": 912,
            "boiling-point": 4447
          },
          pu: {
            symbol: "Pu",
            name: "Plutonium",
            group: "actinide",
            "atomic-number": 94,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 6 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.28,
            "atomic-weight": 244,
            "melting-point": 912.5,
            "boiling-point": 3505
          },
          am: {
            symbol: "Am",
            name: "Americum",
            group: "actinide",
            "atomic-number": 95,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 7 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 243,
            "melting-point": 1449,
            "boiling-point": 2880
          },
          cm: {
            symbol: "Cm",
            name: "Curium",
            group: "actinide",
            "atomic-number": 96,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 7 },
              { s: 2, p: 6, d: 1, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: "1.3",
            "atomic-weight": 247,
            "melting-point": "1613",
            "boiling-point": "3383"
          },
          bk: {
            symbol: "Bk",
            name: "Berkelium",
            group: "actinide",
            "atomic-number": 97,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 9 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 247,
            "melting-point": 1259,
            "boiling-point": 2900
          },
          cf: {
            symbol: "Cf",
            name: "Californium",
            group: "actinide",
            "atomic-number": 98,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 10 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 251,
            "melting-point": 1173,
            "boiling-point": 1743
          },
          es: {
            symbol: "Es",
            name: "Einsteinium",
            group: "actinide",
            "atomic-number": 99,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 11 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 252,
            "melting-point": 1133,
            "boiling-point": 1269
          },
          fm: {
            symbol: "Fm",
            name: "Fermium",
            group: "actinide",
            "atomic-number": 100,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 12 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 257,
            "melting-point": 1800,
            "boiling-point": "-"
          },
          md: {
            symbol: "Md",
            name: "Mendelevium",
            group: "actinide",
            "atomic-number": 101,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 13 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 258,
            "melting-point": 1100,
            "boiling-point": "-"
          },
          no: {
            symbol: "No",
            name: "Nobelium",
            group: "actinide",
            "atomic-number": 102,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 0, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 259,
            "melting-point": 1100,
            "boiling-point": "-"
          },
          lr: {
            symbol: "Lr",
            name: "Lawrencium",
            group: "actinide",
            "atomic-number": 103,
            "electron-configuration": [
              { s: 2, p: 0, d: 0, f: 0 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 6, d: 10, f: 0 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 10, f: 14 },
              { s: 2, p: 6, d: 0, f: 0 },
              { s: 2, p: 1, d: 0, f: 0 }
            ],
            electronegativity: 1.3,
            "atomic-weight": 266,
            "melting-point": 1900,
            "boiling-point": "-"
          }
        }
      },
      _element: Object
    };
  }

  static get observers() {
    return ["_onSymbolChange(symbol)", "_onElementChange(_element)"];
  }

  constructor() {
    super();
  }

  _onSymbolChange() {
    this._element = this._elements[this.symbol];
  }

  _onElementChange() {
    const SIZE = 500;

    let dynamicallyAddedElements = this.shadowRoot.querySelectorAll(
      ".added-dynamically"
    );
    dynamicallyAddedElements.forEach(element => element.remove());

    if (this._element) {
      let electronConfiguration = this._element["electron-configuration"];
      let electronGroup = this.$["electron-group"];
      let ringGroup = this.$["ring-group"];

      let minimumRadius = SIZE / 6;
      let maximumRadius = SIZE / 2;

      for (let i = 0; i < electronConfiguration.length; i++) {
        let ring = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        let radius =
          minimumRadius +
          ((i + 1) * (maximumRadius - minimumRadius)) /
            (electronConfiguration.length + 1);

        ring.setAttribute("cx", SIZE / 2);
        ring.setAttribute("cy", SIZE / 2);
        ring.setAttribute("r", radius);
        ring.classList.add("ring");
        ring.classList.add("added-dynamically");

        if (i !== electronConfiguration.length - 1) {
          ring.setAttribute("opacity", "0.3");
        }

        ringGroup.appendChild(ring);
      }

      let outerShell = electronConfiguration[electronConfiguration.length - 1];
      let secondOuterShell =
        electronConfiguration[electronConfiguration.length - 2];

      let electrons = [];
      let electronBackgrounds = [];

      for (let i = 0; i < electronConfiguration.length; i++) {
        let configuration = electronConfiguration[i];
        let totalValenceElectrons =
          configuration.s + configuration.p + configuration.d + configuration.f;

        for (let j = 0; j < totalValenceElectrons; j++) {
          let electron = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          let electronBackground = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

          let ringRadius =
            minimumRadius +
            ((i + 1) * (maximumRadius - minimumRadius)) /
              (electronConfiguration.length + 1);
          let phaseShift = (i * Math.PI) / 8;

          let cx =
            Math.sin(2 * Math.PI * (j / totalValenceElectrons) + phaseShift) *
            ringRadius;
          let cy =
            Math.cos(2 * Math.PI * (j / totalValenceElectrons) + phaseShift) *
            ringRadius;
          let radius = SIZE / 50;

          electron.setAttribute("cx", cx);
          electron.setAttribute("cy", cy);
          electron.setAttribute("r", radius);
          electron.setAttribute("opacity", "0.3");
          electron.classList.add("electron");
          electron.classList.add("added-dynamically");

          electronBackground.setAttribute("cx", cx);
          electronBackground.setAttribute("cy", cy);
          electronBackground.setAttribute("r", radius + SIZE / 75);
          electronBackground.classList.add("electron-background");
          electronBackground.classList.add("added-dynamically");

          if (j >= configuration.s) {
            if (j >= configuration.p + configuration.s) {
              if (j >= configuration.d + configuration.p + configuration.s) {
                electron.classList.add("f-group-electron");

                if (
                  secondOuterShell.d <= 1 &&
                  electronConfiguration.length - i == 3
                )
                  electron.setAttribute("opacity", "1");
              } else {
                electron.classList.add("d-group-electron");

                if (outerShell.p <= 0 && electronConfiguration.length - i == 2)
                  electron.setAttribute("opacity", "1");
              }
            } else {
              electron.classList.add("p-group-electron");
            }
          } else {
            electron.classList.add("s-group-electron");
          }

          if (i === electronConfiguration.length - 1) {
            electron.setAttribute("opacity", "1");
          }

          electronBackgrounds.push(electronBackground);
          electrons.push(electron);
        }
      }

      electronBackgrounds.forEach(electronBackground =>
        electronGroup.appendChild(electronBackground)
      );
      electrons.forEach(electron => electronGroup.appendChild(electron));

      electronGroup.animate(
        [
          {
            transform:
              "translate(" + SIZE / 2 + "px, " + SIZE / 2 + "px) rotate(0deg)"
          },
          {
            transform:
              "translate(" + SIZE / 2 + "px, " + SIZE / 2 + "px) rotate(360deg)"
          }
        ],
        {
          duration: 10000,
          iterations: Infinity
        }
      );
    }
  }

  _divide(divident, divisor) {
    return divident / divisor;
  }
}

customElements.define(
  ChemicalElementVisualisation.is,
  ChemicalElementVisualisation
);
