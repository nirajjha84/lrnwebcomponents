import { html, Polymer } from "@polymer/polymer/polymer-legacy.js";
import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/paper-toggle-button/paper-toggle-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-badge/paper-badge.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "@vaadin/vaadin-grid/vaadin-grid.js";
import "@vaadin/vaadin-grid/vaadin-grid-filter.js";
import "@vaadin/vaadin-grid/vaadin-grid-sorter.js";
import "@vaadin/vaadin-grid/vaadin-grid-column-group.js";
import "@vaadin/vaadin-grid/vaadin-grid-selection-column.js";
import "@lrnwebcomponents/elmsln-loading/elmsln-loading.js";
import "@lrnwebcomponents/lrndesign-chart/lib/lrndesign-bar.js";
import "@lrnwebcomponents/lrndesign-chart/lib/lrndesign-line.js";
import "@lrnwebcomponents/lrndesign-chart/lib/lrndesign-pie.js";
import "@lrnwebcomponents/dropdown-select/dropdown-select.js";
import "@lrnwebcomponents/lrnsys-button/lrnsys-button.js";
import "@lrnwebcomponents/lrndesign-avatar/lrndesign-avatar.js";
import "@lrnwebcomponents/lrnsys-layout/lib/lrnsys-dialog.js";
import "@lrnwebcomponents/elmsln-apps/lib/lrnapp-studio-submission/lrnapp-studio-submission.js";
Polymer({
  _template: html`
  <style include="materializecss-styles">
    :host {
      display: block;
      align-content: center;
      padding: .8em;
    }
    vaadin-grid-table-body > vaadin-grid-cell-content {
      height: unset !important;
    }
    lrnsys-dialog-toolbar {
      top: 0;
      position: sticky !important;
      z-index: 1;
    }
    #loading {
      width: 100%;
      z-index: 1000;
      opacity: .8;
      text-align: center;
      align-content: center;
      justify-content: center;
      height: 100vh;
      position: absolute;
      background-color: white;
    }
    .center-data {
      text-align: center;
    }
    vaadin-grid#material {
      height: 75vh;
      font-family: Roboto, sans-serif;
      --divider-color: rgba(0, 0, 0, var(--dark-divider-opacity));

      --vaadin-grid-cell: {
        padding: 0;
      };

      --vaadin-grid-header-cell: {
        height: 3.5em;
        color: rgba(0, 0, 0, var(--dark-secondary-opacity));
        font-size: 1em;
      };

      --vaadin-grid-body-cell: {
        height: 3em;
        color: rgba(0, 0, 0, var(--dark-primary-opacity));
        font-size: .8em;
      };

      --vaadin-grid-body-row-hover-cell: {
        background-color: var(--paper-grey-200);
      };

      --vaadin-grid-body-row-selected-cell: {
        background-color: var(--paper-grey-100);
      };

      --vaadin-grid-focused-cell: {
        box-shadow: none;
        font-weight: bold;
      };
    }

    vaadin-grid#material .cell {
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 56px;
    }

    vaadin-grid#material .cell.last {
      padding-right: 24px;
    }

    vaadin-grid#material .cell.numeric {
      text-align: right;
    }

    vaadin-grid#material paper-checkbox {
      --primary-color: var(--paper-indigo-500);
      margin: 0 24px;
    }

    vaadin-grid#material vaadin-grid-sorter .cell {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    vaadin-grid#material vaadin-grid-sorter iron-icon {
      transform: scale(0.8);
    }

    vaadin-grid#material vaadin-grid-sorter:not([direction]) iron-icon {
      color: rgba(0, 0, 0, var(--dark-disabled-opacity));
    }

    vaadin-grid#material vaadin-grid-sorter[direction] {
      color: rgba(0, 0, 0, var(--dark-primary-opacity));
    }

    vaadin-grid#material vaadin-grid-sorter[direction=desc] iron-icon {
      transform: scale(0.8) rotate(180deg);
    }
    vaadin-grid-sorter {
      text-align: center;
    }

    lrndesign-avatar {
      display: inline-block;
    }
    .avatar-label {
      display: inline-block;
      margin-left: .2em;
    }

    .avatar-button {

    }
    .assignment-button {
      height: 1em;
    }
    .project-button {
      height: 1em;
    }
    paper-badge {
      top: 0 !important;
      left: unset !important;
      right: 0;
      z-index: 1;
    }
    .avatar-link {
      color: black;
    }
    .avatar-link paper-button {
      text-transform: unset;
    }
    #selectedproject {
      display: inline-block;
    }
    #datatype {
      display: inline-block;
      vertical-align: middle;
      --paper-toggle-button-checked-bar-color:  var(--paper-green-500);
      --paper-toggle-button-checked-button-color:  var(--paper-green-500);
      --paper-toggle-button-checked-ink-color: var(--paper-green-500);
      --paper-toggle-button-unchecked-bar-color:  var(--paper-amber-900);
      --paper-toggle-button-unchecked-button-color:  var(--paper-amber-900);
      --paper-toggle-button-unchecked-ink-color: var(--paper-amber-900);
    }
    .comment-list {
      list-style-image: none;
      display: inline-block;
      padding: 0;
      margin: 0;
    }
    .stats-text {
      font-size: .8em;
      font-style: italic;
      line-height: 1em;
      padding: 0 0 0 2em;
      display: inline-block;
      text-align: right;
    }
  </style>
  <app-location route="{{route}}"></app-location>
  <app-route
      route="{{route}}"
      pattern="[[endPoint]]/submissions/:submission"
      data="{{data}}"
      tail="{{tail}}">
  </app-route>
  <iron-ajax auto
    id="projectrequest"
    url="[[sourceProjectPath]]"
    params=""
    handle-as="json"
    last-response="{{_projectData}}"
    on-response="_handleProjectResponse"></iron-ajax>
  <iron-ajax
    id="studentrequest"
    url="[[sourceStudentPath]]"
    params='[[studentParams]]'
    handle-as="json"
    last-response="{{_studentData}}"
    on-response="_handleStudentResponse"></iron-ajax>
  <div id="loading">
    <h3>Loading..</h3>
    <elmsln-loading color="grey-text" size="large"></elmsln-loading>
  </div>
  <div hidden$="[[activeProject]]">Select a project to begin reviewing work</div>
  <dropdown-select id="selectedproject" label="Project">
    <template is="dom-repeat" items="[[_toArray(projects)]]" as="project">
      <paper-item value$="[[project.id]]">[[project.attributes.title]]</paper-item>
    </template>
  </dropdown-select>
  <paper-toggle-button id="datatype" checked="{{dataType}}" disabled>
    [[dataTypeText]]
  </paper-toggle-button>
  <lrnsys-dialog id="statsdialog" disabled>
    <span slot="button"><iron-icon icon="editor:show-chart"></iron-icon> Statistics (beta)</span>
    <span slot="toolbar-primary">
      [[stats.header]]
    </span>
  <span slot="content">
      <div style="padding: 2em 4em;">
        <span class="stats-text">[[stats.overview]]</span>
        <dropdown-select id="selectedchart" label="Graph style">
          <paper-item value="byassignment-submissions">Submissions by Assignment</paper-item>
          <paper-item value="byassignment-comments">Comments by Assignment</paper-item>
          <paper-item value="byassignment-commenters">Commenters by Assignment</paper-item>
        </dropdown-select>
        <lrndesign-bar chart-title="[[activeChart.title]]" chart-desc="[[activeChart.description]]" data="[[activeChart.data]]"></lrndesign-bar>
      </div>
    </span>
  </lrnsys-dialog>
  <vaadin-grid hidden$="[[!students]]" id="material" aria-label="Student project list" items="[[_toArray(students)]]">
    <vaadin-grid-column resizable>
      <template class="header">
        <vaadin-grid-sorter id="sorter" path="sis.sortable_name">Student</vaadin-grid-sorter>
      </template>
      <template>
        <a href$="[[basePath]]lrnapp-open-studio/projects?author=[[item.id]]&project=[[activeProject]]" tabindex="-1" target="_blank" class="avatar-link ferpa-protect">
          <paper-button class="avatar-button">
            <lrndesign-avatar label="[[item.name]]" src="[[item.avatar]]"></lrndesign-avatar>
            <span class="avatar-label">[[item.sis.sortable_name]]</span>
          </paper-button>
        </a>
      </template>
      <template class="footer">
        <vaadin-grid-filter aria-label="Student" path="sis.sortable_name" value="[[_filterName]]">
          <paper-input slot="filter" label="Student" value="{{_filterName::input}}" focus-target></paper-input>
        </vaadin-grid-filter>
      </template>
    </vaadin-grid-column>
    <template is="dom-repeat" items="[[_toArray(assignments)]]" as="assignment">
      <vaadin-grid-column resizable>
        <template class="header">
          <span>[[assignment.title]]</span>
        </template>
        <template>
          <template is="dom-if" if="[[_submissionStatus(item, assignment, dataType)]]">
            <template is="dom-if" if="[[!dataType]]">
              <lrnsys-button icon="[[_submissionPiece(item, assignment, 'icon')]]" id$="student-[[item.id]]-assignment-[[assignment.id]]-submission-[[_submissionID(item, assignment)]]" label="[[_submissionPiece(item, assignment, 'title')]]" on-tap="_setActiveSubmission">
              </lrnsys-button>
            </template>
            <template is="dom-if" if="[[dataType]]">
              <ul class="comment-list">
              <template is="dom-repeat" items="[[_submissionPiece(item, assignment, 'comments')]]" as="commented">
                <li>
                  <lrnsys-button icon="communication:comment" id$="student-[[item.id]]-assignment-[[assignment.id]]-submission-[[commented]]" label="#[[_commentIndex(index)]]" on-tap="_setActiveComment">
                  </lrnsys-button>
                </li>
              </template>
              </ul>
            </template>
          </template>
          <template is="dom-if" if="[[!_submissionStatus(item, assignment, dataType)]]">
            <paper-button disabled class="project-button" id$="student-[[item.id]]-assignment-[[assignment.id]]-submission-null">X</paper-button>
          </template>
          <template is="dom-if" if="[[_commentCount(item, assignment, dataType)]]">
            <paper-badge id$="student-[[item.id]]-assignment-[[assignment.id]]-tip" for="student-[[item.id]]-assignment-[[assignment.id]]" label="[[_commentCount(item, assignment, dataType)]]"></paper-badge>
            <paper-tooltip for="student-[[item.id]]-assignment-[[assignment.id]]-tip">Comments left on classmates [[assignment.title]]</paper-badge>
          </template>
        </template>
      </vaadin-grid-column>
    </template>
  </vaadin-grid>
  <lrnsys-dialog id="dialog" style="overflow: visible;">
    <span slot="toolbar-primary">
      <span style="width:15em;">
        <paper-icon-button on-tap="_changeActiveItem" id="prevstudent" icon="arrow-upward" title="previous student"></paper-icon-button>
        <paper-icon-button on-tap="_changeActiveItem" id="nextstudent" icon="arrow-downward" title="next student"></paper-icon-button>
        <lrndesign-avatar class="ferpa-protect" label="[[activeData.student.name]]" src="[[activeData.student.avatar]]" style="display:inline-block;vertical-align:middle;"></lrndesign-avatar>
        <span class="avatar-label ferpa-protect" style="margin-left:1em;">[[activeData.student.sis.sortable_name]]</span>
      </span>
      <paper-icon-button on-tap="_changeActiveItem" id="prevassignment" icon="arrow-back" title="previous assignment" style="margin-left:1em;"></paper-icon-button>
      <paper-icon-button on-tap="_changeActiveItem" id="nextassignment" icon="arrow-forward" title="next assignment"></paper-icon-button>
      <span style="font-weight:bold;">Assignment: [[activeData.assignment.title]]</span>
    </span>
    <span slot="content">
      <template is="dom-if" if="[[activeData.submission]]">
        <lrnapp-studio-submission-page base-path="[[basePath]]" route="{{tail}}" id="[[data.submission]]" end-point="[[basePath]]lrnapp-studio-submission" csrf-token="[[csrfToken]]" data="[[data]]" hide-menu-bar></lrnapp-studio-submission-page>
      </template>
      <template is="dom-if" if="[[!activeData.submission]]">
        <div>
          <h3>No submission for this assignment</h3>
          <p>This student has not submitted anything for this assignment at this time.</p>
        </div>
      </template>
    </span>
  </lrnsys-dialog>  
`,
  is: "lrnapp-studio-instructor",
  observers: [
    "_routeChanged(route, endPoint)",
    "_activeDataChanged(activeData.student, activeData.assignment)"
  ],
  properties: {
    /**
     * Type of data to display, either submission centric or comment centric.
     * False = submission, true = comment
     */
    dataType: {
      type: Boolean,
      value: false,
      observer: "_dataTypeChanged"
    },
    dataTypeText: {
      type: String,
      value: "Submissions"
    },
    /**
     * The projects to render
     */
    projects: {
      type: Object,
      notify: true
    },
    /**
     * The assignments to render
     */
    assignments: {
      type: Object,
      notify: true
    },
    /**
     * The submissions to render
     */
    students: {
      type: Object,
      notify: true,
      value: false
    },
    /**
     * Internal value for mapping the raw response data.
     */
    _projectData: {
      type: Object,
      value: {}
    },
    /**
     * studentParams for the request
     */
    studentParams: {
      type: Object,
      value: {
        projectId: null,
        type: "submission"
      }
    },
    /**
     * Internal value for mapping the raw response data.
     */
    _studentData: {
      type: Object
    },
    /**
     * Internal width so they are all unified from editing this
     */
    _numWidth: {
      type: String,
      value: "2.25em"
    },
    /**
     * Endpoint for submission data.
     */
    sourcePath: {
      type: String,
      notify: true
    },
    /**
     * base path for the app
     */
    basePath: {
      type: String,
      notify: true
    },
    /**
     * routing variable for url
     */
    route: {
      type: String
    },
    /**
     * Security token
     */
    csrfToken: {
      type: String
    },
    /**
     * course
     */
    elmslnCourse: {
      type: String
    },
    /**
     * section
     */
    elmslnSection: {
      type: String
    },
    /**
     * Data binding object for the submission render
     */
    data: {
      type: Object
    },
    /**
     * Internal ID for active project
     */
    activeProject: {
      type: Number,
      value: false
    },
    /**
     * Active Data based on selection
     */
    activeData: {
      type: Object,
      value: {
        student: {},
        assignment: {},
        submission: {}
      }
    },
    /**
     * raw Stats data from backend.
     */
    stats: {
      type: Object,
      value: {}
    },
    /**
     * Selected chart with data cleaned up to match formatting.
     */
    activeChart: {
      type: Object,
      value: {}
    }
  },
  /**
   * Rebuild the chart whenever the select list is changed.
   */
  _chartChanged: function(e) {
    this.set("activeChart.title", e.detail.value);
    this.notifyPath("activeChart.title");
    this.set(
      "activeChart.description",
      "Chart of values relative to " + e.detail.value
    );
    this.notifyPath("activeChart.description");
    // calculate the valid charting options relative to selected chart style
    this.set("activeChart.data", this._formatChartData(e.detail.value));
    this.notifyPath("activeChart.data");
  },
  /**
   * Format data in a way that chartist likes and that matches
   * the currently active display mechanism
   */
  _formatChartData: function(type) {
    var labels = [];
    var series = [[]];
    const stats = this.stats.stats;
    const assignments = this._toArray(this.assignments);
    let parts = type.split("-");
    if (
      typeof stats[parts[0]] !== typeof undefined &&
      typeof stats[parts[0]][parts[1]] !== typeof undefined
    ) {
      // make sure the data aligns now w/ the IDs in question
      // or we'll start mixing up our data.
      for (var i in assignments) {
        let title = assignments[i].title;
        if (
          typeof stats[parts[0]][parts[1]][assignments[i].id] !==
          typeof undefined
        ) {
          series[0].push(stats[parts[0]][parts[1]][assignments[i].id]);
          title += ` (${stats[parts[0]][parts[1]][assignments[i].id]})`;
        } else {
          series[0].push(0);
          title += " (0)";
        }
        labels.push(title);
      }
    }
    return {
      labels: labels,
      series: series
    };
  },
  /**
   * When type changes, make sure we adjust what the request going
   * out the door will be. For simplicity, false / true for the two
   * modes are binded to submission (default) and comment methods
   * of data return. This allows us to leverage the same endpoint
   * and render things more or less using much of the same code
   * and event
   */
  _dataTypeChanged: function(newValue, oldValue) {
    // if type changes values and not from undefined to defined
    // then we should execute the request for data after setting type
    if (typeof oldValue !== typeof undefined) {
      if (newValue) {
        this.dataTypeText = "Comments (beta)";
      } else {
        this.dataTypeText = "Submissions";
      }
    }
  },
  /**
   * Stupid thing to make it go from array position 0 to 1.
   */
  _commentIndex: function(index) {
    return index + 1;
  },
  /**
   * If the current route is outside the scope of our app
   * then allow the website to break out of the single page
   * application routing
   */
  _routeChanged: function(route, endPoint) {
    if (typeof route.path === "string") {
      if (typeof endPoint === "string") {
        if (route.path.startsWith(endPoint)) {
          return;
        }
      }
      // reload the page which since route changed will load that page
      window.location.reload();
    }
  },
  /**
   * Test if buttons should be visible or not
   */
  _activeDataChanged: function(student, assignment) {
    if (typeof student.id !== typeof undefined) {
      if (this._getObjectByPosition(this.students, student.id, -1) == -1) {
        this.$.prevstudent.disabled = true;
      } else {
        this.$.prevstudent.disabled = false;
      }
      if (this._getObjectByPosition(this.students, student.id, 1) == -1) {
        this.$.nextstudent.disabled = true;
      } else {
        this.$.nextstudent.disabled = false;
      }
      if (
        this._getObjectByPosition(this.assignments, assignment.id, -1) == -1
      ) {
        this.$.prevassignment.disabled = true;
      } else {
        this.$.prevassignment.disabled = false;
      }
      if (this._getObjectByPosition(this.assignments, assignment.id, 1) == -1) {
        this.$.nextassignment.disabled = true;
      } else {
        this.$.nextassignment.disabled = false;
      }
    }
  },
  /**
   * Project updated
   */
  _projectChanged: function(e) {
    this.$.loading.hidden = false;
    // default a11y positioning back to the stats dialog
    this.__rememberClick = this.$.statsdialog;
    this.$.statsdialog.disabled = false;
    this.$.datatype.disabled = false;
    this.activeProject = e.detail.value;
    // this should fire off the new request
    this.studentParams.projectId = this.activeProject;
    this.$.studentrequest.generateRequest();
  },
  /**
   * attached life cycle
   */
  attached: function() {
    // listen for focus event to have fired
    document.body.addEventListener(
      "lrnsys-dialog-modal-closed",
      this._accessibleFocus.bind(this)
    );
    this.$.selectedproject.addEventListener(
      "change",
      this._projectChanged.bind(this)
    );
    this.$.selectedchart.addEventListener(
      "change",
      this._chartChanged.bind(this)
    );
  },
  /**
   * detached life cycle
   */
  detached: function() {
    // listen for focus event to have fired
    document.body.removeEventListener(
      "lrnsys-dialog-modal-closed",
      this._accessibleFocus.bind(this)
    );
    this.$.selectedproject.removeEventListener(
      "change",
      this._projectChanged.bind(this)
    );
    this.$.selectedchart.removeEventListener(
      "change",
      this._chartChanged.bind(this)
    );
  },
  /**
   * Set ourselves as having focus after the modal closes.
   */
  _accessibleFocus: function(e) {
    document.body.classList.remove("scroll-disabled");
    // focus on our dialog triggering button
    this.__rememberClick.focus();
  },
  /**
   * Handle response for the whole projects object.
   */
  _handleProjectResponse: function(event) {
    this.$.loading.hidden = true;
    this.set("projects", this._projectData.data.projects);
  },
  /**
   * Handle response for the whole projects object.
   */
  _handleStudentResponse: function(event) {
    this.$.loading.hidden = true;
    this.set("students", []);
    this.set("students", this._studentData.data.students);
    this.set("assignments", []);
    this.set("assignments", this._studentData.data.assignments);
    this.stats = this._studentData.data.stats;
    this.set(
      "stats.header",
      "Statistics for " +
        this.projects["project-" + this.activeProject].attributes.title
    );
    // make sure default is asc data
    setTimeout(() => {
      this.shadowRoot.querySelector("#sorter").direction = "asc";
    }, 200);
  },
  /**
   * Pie menu operation handler based on which was clicked.
   */
  _changeActiveItem: function(e) {
    document.body.classList.add("scroll-disabled");
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    var newstudent;
    var newassignment;
    // use button id in order to move around in the grid as far as active
    switch (local.id) {
      case "prevstudent":
        newstudent = this._getObjectByPosition(
          this.students,
          this.activeData.student.id,
          -1
        );
        if (
          newstudent != -1 &&
          typeof newstudent.assignments[this.activeData.assignment.id] !==
            typeof undefined
        ) {
          this.set("activeData.student", {});
          this.set("activeData.student", newstudent);
          this.set("activeData.submission", {});
          this.set(
            "activeData.submission",
            newstudent.assignments[this.activeData.assignment.id]
          );
          this.set(
            "route.path",
            this.endPoint + "/submissions/" + this.activeData.submission.id
          );
        }
        break;
      case "nextstudent":
        newstudent = this._getObjectByPosition(
          this.students,
          this.activeData.student.id,
          1
        );
        if (
          newstudent != -1 &&
          typeof newstudent.assignments[this.activeData.assignment.id] !==
            typeof undefined
        ) {
          this.set("activeData.student", {});
          this.set("activeData.student", newstudent);
          this.set("activeData.submission", {});
          this.set(
            "activeData.submission",
            newstudent.assignments[this.activeData.assignment.id]
          );
          this.set(
            "route.path",
            this.endPoint + "/submissions/" + this.activeData.submission.id
          );
        }
        break;
      case "prevassignment":
        newassignment = this._getObjectByPosition(
          this.assignments,
          this.activeData.assignment.id,
          -1
        );
        if (newassignment != -1) {
          this.set("activeData.assignment", {});
          this.set("activeData.assignment", newassignment);
          if (
            typeof this.activeData.student.assignments[newassignment.id].id !==
            typeof undefined
          ) {
            this.set(
              "activeData.submission",
              this.activeData.student.assignments[newassignment.id]
            );
            this.set("activeData.submission", {});
            this.set(
              "route.path",
              this.endPoint +
                "/submissions/" +
                this.activeData.student.assignments[newassignment.id].id
            );
          } else {
            this.set("activeData.submission", false);
          }
        }
        break;
      case "nextassignment":
        newassignment = this._getObjectByPosition(
          this.assignments,
          this.activeData.assignment.id,
          1
        );
        if (newassignment != -1) {
          this.set("activeData.assignment", {});
          this.set("activeData.assignment", newassignment);
          if (
            typeof this.activeData.student.assignments[newassignment.id].id !==
            typeof undefined
          ) {
            this.set("activeData.submission", {});
            this.set(
              "activeData.submission",
              this.activeData.student.assignments[newassignment.id]
            );
            this.set(
              "route.path",
              this.endPoint +
                "/submissions/" +
                this.activeData.student.assignments[newassignment.id].id
            );
          } else {
            this.set("activeData.submission", false);
          }
        }
        break;
    }
  },
  /**
   * Helper to move back and forth in an object like you can an array
   */
  _getObjectByPosition: function(items, key, i) {
    var keys = Object.keys(items).sort(function(a, b) {
      if (typeof items[a].sis !== typeof undefined) {
        if (items[a].sis.sortable_name > items[b].sis.sortable_name) {
          return 1;
        } else if (items[a].sis.sortable_name < items[b].sis.sortable_name) {
          return -1;
        }
        return 0;
      } else {
        return a - b;
      }
    });
    if (key !== undefined) {
      key = key.toString();
    }
    var index = keys.indexOf(key);
    // try fallback for type issues
    if (index == -1) {
      index = keys.indexOf(parseInt(key));
    }
    if ((i == -1 && index > 0) || (i == 1 && index < keys.length - 1)) {
      return items[keys[index + i]];
    } else {
      return -1;
    }
  },
  /**
   * Test student submission status relative to assignments
   */
  _submissionStatus: function(student, assignment, dataType) {
    if (student != null) {
      if (
        !dataType &&
        typeof student.assignments[assignment.id] !== typeof undefined &&
        typeof student.assignments[assignment.id].id !== typeof undefined
      ) {
        return true;
      } else if (
        dataType &&
        typeof student.assignmentComments[assignment.id] !== typeof undefined &&
        this._toArray(student.assignmentComments[assignment.id]).length > 0
      ) {
        return true;
      }
    }
    return false;
  },
  /**
   * Test student submission status relative to assignments
   */
  _submissionID: function(student, assignment) {
    if (
      student != null &&
      typeof student.assignments[assignment.id] !== typeof undefined &&
      typeof student.assignments[assignment.id].id !== typeof undefined
    ) {
      return student.assignments[assignment.id].id;
    }
    return false;
  },
  /**
   * Return a piece of the submission needed for visualization bc of template scope
   */
  _submissionPiece: function(student, assignment, piece) {
    if (
      student != null &&
      typeof student.assignments[assignment.id] !== typeof undefined &&
      typeof student.assignments[assignment.id].id !== typeof undefined
    ) {
      var submission = student.assignments[assignment.id];
      switch (piece) {
        case "url":
          return (
            this.basePath +
            "lrnapp-studio-submission/submissions/" +
            submission.id
          );
          break;
        case "title":
          return submission.attributes.title;
          break;
        case "icon":
          return submission.meta.state_icon;
          break;
        case "color":
          return submission.meta.state_color;
          break;
        case "comments":
          return this._toArray(student.assignmentComments[assignment.id]);
          break;
      }
    }
    return "";
  },
  /**
   * Return number of comments on an assignment for display.
   */
  _commentCount: function(student, assignment, dataType) {
    if (
      !dataType &&
      student != null &&
      typeof student.assignmentComments[assignment.id] !== typeof undefined
    ) {
      return this._toArray(student.assignmentComments[assignment.id]).length;
    }
    return false;
  },
  /**
   * Set route for active submission to load
   */
  _setActiveSubmission: function(e) {
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    this.__rememberClick = local;
    var item = local.id.split("-");
    // find the active elements
    this.set("activeData.student", this.students[item[1]]);
    this.set("activeData.assignment", this.assignments[item[3]]);
    this.set(
      "activeData.submission",
      this.students[item[1]].assignments[item[3]]
    );
    this.set(
      "route.path",
      this.endPoint + "/submissions/" + item[item.length - 1]
    );
    document.body.classList.add("scroll-disabled");
    this.$.dialog.toggleDialog();
  },
  /**
   * Set route for active submission via comment click
   */
  _setActiveComment: function(e) {
    // disable all buttons for in modal nav
    this.$.nextassignment.disabled = true;
    this.$.prevassignment.disabled = true;
    this.$.nextstudent.disabled = true;
    this.$.prevstudent.disabled = true;
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    this.__rememberClick = local;
    var item = local.id.split("-");
    // find the active elements
    this.set("activeData.student", this.students[item[1]]);
    this.set("activeData.assignment", this.assignments[item[3]]);
    this.set(
      "activeData.submission",
      this.students[item[1]].assignments[item[3]]
    );
    this.set(
      "route.path",
      this.endPoint + "/submissions/" + item[item.length - 1]
    );
    document.body.classList.add("scroll-disabled");
    this.$.dialog.toggleDialog();
  },
  /**
   * Simple way to convert from object to array.
   */
  _toArray: function(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }
});
