import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";

import "./data-table-icons.js";
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        margin: 4px;
      }

      :host([hidden]) {
        display: none;
      }

      paper-icon-button {
        position: relative;
        opacity: 0.84;
        transition: all 0.2s;
      }

      paper-icon-button:hover,
      paper-icon-button[focused] {
        color: var(--default-primary-color);
      }

      paper-icon-button:not([direction]) {
        opacity: 0.16;
      }

      paper-icon-button[direction="desc"] {
        transform: rotate(-180deg);
      }

      paper-icon-button[hidden] {
        display: none;
      }

      .order {
        font-size: 9px;
        font-weight: bold;
        position: absolute;
        right: 4px;
        bottom: 8px;
      }
    </style>

    <div style="position: relative">
      <paper-icon-button
        id="sortIcon"
        on-tap="_sort"
        icon="data-table:arrow-upward"
        direction\$="[[direction]]"
      >
      </paper-icon-button>
      <div class="order">[[order]]</div>
    </div>
  `,

  is: "data-table-column-sort",

  properties: {
    direction: {
      type: String,
      notify: true
    },
    path: String,
    order: {
      type: Number,
      computed: "_order(path, sortOrder, sortOrder.length)"
    },
    sortOrder: Array
  },

  observers: ["_sortOrderChanged(sortOrder.*)"],

  _order: function(path, sortOrder, length) {
    if (length <= 1) {
      return "";
    }

    for (var i = 0; i < length; i++) {
      if (sortOrder[i].path === path) {
        return i + 1;
      }
    }
  },

  _sortOrderChanged: function(sortOrder) {
    // TODO: if sortOrder for this column has been removed from outside, direction is not updated.
    if (sortOrder.base) {
      sortOrder.base.forEach(
        function(sort) {
          if (sort.path === this.path) {
            this.direction = sort.direction;
            return;
          }
        }.bind(this)
      );
    }
  },

  _sort: function() {
    switch (this.direction) {
      case "asc":
        this.direction = "desc";
        break;

      case "desc":
        this.direction = null;
        break;

      default:
        this.direction = "asc";
        break;
    }

    this.fire("sort-direction-changed", {
      path: this.path,
      direction: this.direction
    });
  }
});
