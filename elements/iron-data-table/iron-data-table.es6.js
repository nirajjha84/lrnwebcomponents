import{html,Polymer}from"./node_modules/@polymer/polymer/polymer-legacy.js";import{dom}from"./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js";import*as async from"./node_modules/@polymer/polymer/lib/utils/async.js";import{FlattenedNodesObserver}from"./node_modules/@polymer/polymer/lib/utils/flattened-nodes-observer.js";import{IronResizableBehavior}from"./node_modules/@polymer/iron-resizable-behavior/iron-resizable-behavior.js";import"./lib/data-table-column.js";import"./lib/data-table-column-sort.js";import"./lib/data-table-cell.js";import"./lib/data-table-row.js";import"./lib/data-table-checkbox.js";import"./lib/data-table-row-detail.js";import"./lib/array-datasource.js";let IronDataTable=Polymer({_template:html`
    <style is="custom-style">
      :host {
        display: block;
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        /* Default height just to help users get started in making stuff visible.  */
        height: 400px;
        @apply --iron-data-table;
      }

      #container {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
      }

      #header {
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
        transition: box-shadow 200ms;
        -webkit-transition: box-shadow 200ms;
        z-index: 1;
        @apply --iron-data-table-header;
      }

      #header.scrolled {
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06), 0 2px 0 rgba(0, 0, 0, 0.075),
          0 3px 0 rgba(0, 0, 0, 0.05), 0 4px 0 rgba(0, 0, 0, 0.015);
      }

      #list {
        overflow-x: hidden !important;
        overflow-y: auto !important;
        flex: 1;
        transition: opacity 200ms;
        -webkit-transition: opacity 200ms;
      }

      :host([loading]) #list {
        opacity: 0.25;
      }

      :host(:not([loading])) paper-spinner-lite {
        display: none;
      }

      :host([loading]) paper-spinner-lite {
        position: absolute;
        top: 45%;
        left: 50%;
        --paper-spinner-color: var(--default-primary-color);
      }
    </style>
    <div id="container">
      <div id="header">
        <data-table-row header="">
          <data-table-checkbox
            header=""
            hidden\$="[[!multiSelection]]"
            on-tap="_toggleSelectAll"
            checked="[[_isSelectAllChecked(selectedItems.length, selectedItems.inverted, size)]]"
            indeterminate="[[_isSelectAllIndeterminate(selectedItems.length, size)]]"
          ></data-table-checkbox>
          <template is="dom-repeat" items="[[columns]]" as="column">
            <data-table-cell
              header=""
              align-right="[[column.alignRight]]"
              before-bind="[[beforeCellBind]]"
              column="[[column]]"
              flex="[[column.flex]]"
              hidden="[[column.hidden]]"
              order="[[column.order]]"
              table="[[_this]]"
              template="[[column.headerTemplate]]"
              width="[[column.width]]"
            >
              <data-table-column-sort
                sort-order="[[sortOrder]]"
                path="[[column.sortBy]]"
                on-sort-direction-changed="_sortDirectionChanged"
                hidden\$="[[!column.sortBy]]"
              ></data-table-column-sort>
            </data-table-cell>
          </template>
        </data-table-row>
      </div>

      <iron-list
        id="list"
        as="item"
        items="[[_cachedItems]]"
        on-scroll="_onVerticalScroll"
      >
        <template>
          <div class="item">
            <data-table-row
              before-bind="[[beforeRowBind]]"
              even\$="[[!_isEven(index)]]"
              expanded="[[_isExpanded(item, _expandedItems, _expandedItems.*)]]"
              index="[[index]]"
              item="[[item]]"
              tabindex="-1"
              selected="[[_isSelected(item, selectedItems, selectedItems.*)]]"
            >
              <data-table-checkbox
                hidden\$="[[!multiSelection]]"
                tabindex="0"
                checked="[[_isSelected(item, selectedItems, selectedItems.*)]]"
                on-tap="_onCheckBoxTap"
              ></data-table-checkbox>
              <template
                is="dom-repeat"
                items="[[columns]]"
                as="column"
                index-as="colIndex"
              >
                <data-table-cell
                  template="[[column.template]]"
                  table="[[_this]]"
                  align-right="[[column.alignRight]]"
                  column="[[column]]"
                  expanded="[[_isExpanded(item, _expandedItems, _expandedItems.*)]]"
                  flex="[[column.flex]]"
                  hidden="[[column.hidden]]"
                  index="[[index]]"
                  item="[[item]]"
                  on-click="_onCellClick"
                  order="[[column.order]]"
                  selected="[[_isSelected(item, selectedItems, selectedItems.*)]]"
                  width="[[column.width]]"
                  before-bind="[[beforeCellBind]]"
                ></data-table-cell>
              </template>
              <template
                is="dom-if"
                if="[[_isExpanded(item, _expandedItems)]]"
                on-dom-change="_updateSizeForItem"
              >
                <data-table-row-detail
                  index="[[index]]"
                  item="[[item]]"
                  expanded="[[_isExpanded(item, _expandedItems, _expandedItems.*)]]"
                  selected="[[_isSelected(item, selectedItems, selectedItems.*)]]"
                  before-bind="[[beforeDetailsBind]]"
                  table="[[_this]]"
                  template="[[rowDetail]]"
                ></data-table-row-detail>
              </template>
            </data-table-row>
          </div>
        </template>
      </iron-list>
    </div>
    <paper-spinner-lite active=""></paper-spinner-lite>
    <slot name="data-table-column"></slot>
    <slot name="template[is=row-detail]"></slot>
  `,is:"iron-data-table",behaviors:[IronResizableBehavior],listeners:{"column-filter-changed":"_onColumnFilterChanged","iron-resize":"_resizeCellContainers","item-changed":"_itemChanged",scroll:"_onHorizontalScroll"},properties:{autoRefresh:Number,beforeCellBind:Object,beforeDetailsBind:Object,beforeRowBind:Object,items:{type:Array},detailsEnabled:{type:Boolean,value:!1},filter:{type:Array,notify:!0,value:function(){return[]}},multiSelection:{type:Boolean,value:!1},pageSize:{type:Number,value:50},selectionEnabled:{type:Boolean,value:!1},selectedItem:{type:Object,readOnly:!0,notify:!0},selectedItems:{type:Object,notify:!0,readOnly:!0,value:function(){var items=[];items.filters=[];return items}},size:{type:Number,notify:!0,value:0,observer:"_sizeChanged"},sortOrder:{type:Array,notify:!0,value:function(){return[]}},columns:{type:Array,notify:!0,value:function(){return[]},observer:"_columnsChanged"},dataSource:{type:Object,notify:!0},_pagesLoading:{type:Array,value:function(){return[]}},loading:{type:Boolean,notify:!0,reflectToAttribute:!0,value:!1},_cachedItems:{type:Array,value:function(){return[]}},_cachedPages:{type:Array,value:function(){return[]}},_currentPage:{type:Number,value:0},_expandedItems:{type:Array,value:function(){return[]}},_this:{type:Object,value:function(){return this}}},observers:["_itemsChanged(items.*)","_currentPageChanged(dataSource, _currentPage)","_resetData(dataSource, filter.*, sortOrder.*)"],created:function(){this._observer=new FlattenedNodesObserver(this,info=>{var hasColumns=function(node){return node.nodeType===Node.ELEMENT_NODE&&"DATA-TABLE-COLUMN"===node.tagName.toUpperCase()},hasDetails=function(node){return node.nodeType===Node.ELEMENT_NODE&&"TEMPLATE"===node.tagName.toUpperCase()&&node.hasAttribute("is")&&"row-detail"===node.getAttribute("is")};if(0<info.addedNodes.filter(hasColumns).length||0<info.removedNodes.filter(hasColumns).length){this.set("columns",this.shadowRoot.querySelector("[select=data-table-column]").assignedNodes({flatten:!0}).filter(n=>n.nodeType===Node.ELEMENT_NODE));this.notifyResize()}if(0<info.addedNodes.filter(hasDetails).length){this.set("rowDetail",this.shadowRoot.querySelector("[select=\"template[is=row-detail]\"]").assignedNodes({flatten:!0}).filter(n=>n.nodeType===Node.ELEMENT_NODE)[0]);var parent=dom(this.rowDetail).parentNode;this.rowDetail._rootDataHost=parent.dataHost?parent.dataHost._rootDataHost||parent.dataHost:parent}}).bind(this)},_stopPropagation:function(e){e.stopImmediatePropagation()},selectItem:function(item){if("number"===typeof item&&0<=item&&this.items&&this.items.length>item){this._selectItem(this.items[item])}else{this._selectItem(item)}},_selectItem:function(item){this._setSelectedItem(item);if(this.multiSelection){if(this.selectedItems.inverted){var index;if(-1<(index=this.selectedItems.indexOf(item))){this.splice("selectedItems",index,1)}}else{this.push("selectedItems",item)}}else{this.splice("selectedItems",0,this.selectedItems.length,item)}},deselectItem:function(item){if("number"===typeof item&&0<=item&&this.items&&this.items.length>item){this._deselectItem(this.items[item])}else{this._deselectItem(item)}},_deselectItem:function(item){this._setSelectedItem(null);var index=this.selectedItems.indexOf(item);if(this.selectedItems.inverted){if(-1===index){this.push("selectedItems",item)}}else{if(-1<index){this.splice("selectedItems",index,1)}}},_isSelected:function(item,selectedItems){var selected=-1<selectedItems.indexOf(item);return selectedItems.inverted?!selected:selected},selectAll:function(){var selectedItems=[];selectedItems.inverted=!0;selectedItems.filters=this.filter.slice(0)||[];this._setSelectedItems(selectedItems)},clearSelection:function(){var selectedItems=[];selectedItems.inverted=!1;selectedItems.filters=this.filter.slice(0)||[];this._setSelectedItems(selectedItems);if(this.selectedItem!==void 0){this._setSelectedItem(null)}},_toggleSelectAll:function(){if(this._isSelectAllChecked(this.selectedItems.length,this.selectedItems.inverted,this.size)){this._fireEvent("deselecting-all-items",{items:this.selectedItems},this.clearSelection)}else{this._fireEvent("selecting-all-items",{items:this.selectedItems},this.selectAll)}},_isSelectAllChecked:function(selectedItemsLength,inverted,size){return 0<size&&selectedItemsLength===(inverted?0:size)},_isSelectAllIndeterminate:function(length,size){return 0<size&&0<length&&length<size},_isEven:function(index){return 0===index%2},_resetData:function(dataSource,filter,sortOrder){this.clearSelection();this.clearCache();this.$.list.scrollToIndex(0)},_sortDirectionChanged:function(e){for(var i=0;i<this.sortOrder.length;i++){if(this.sortOrder[i].path===e.detail.path){if(e.detail.direction){this.set("sortOrder."+i+".direction",e.detail.direction)}else{this.splice("sortOrder",i,1)}return}}this.push("sortOrder",{path:e.detail.path,direction:e.detail.direction})},_columnsChanged:function(columns,oldColumns){if(oldColumns){oldColumns.forEach(function(column){this.unlisten(column,"filter-value-changed")}.bind(this))}if(columns){columns.forEach(function(column){column.table=this;this.listen(column,"filter-value-changed","_onColumnFilterChanged")}.bind(this))}},_onColumnFilterChanged:function(e){for(var i=0;i<this.filter.length;i++){if(this.filter[i].path===e.detail.filterBy){this.set("filter."+i+".filter",e.detail.value);this.set("selectedItems.filters."+i+".filter",e.detail.value);return}}this.push("filter",{path:e.detail.filterBy,filter:e.detail.value});this.push("selectedItems.filters",{path:e.detail.filterBy,filter:e.detail.value})},_resizeCellContainers:function(){this.$.container.style.width="";async.microTask.run(()=>{this.$.container.style.width=Math.min(this.scrollWidth,this.clientWidth+this.scrollLeft)+"px";this.$.header.style.paddingRight=this.$.list.offsetWidth-this.$.list.clientWidth+"px"})},_onHorizontalScroll:function(){if(!this.isDebouncerActive("scrolling")){this.$.container.style.width=this.scrollWidth+"px";this.debounce("scrolling",function(){this.$.container.style.width=Math.min(this.scrollWidth,this.clientWidth+this.scrollLeft)+"px"},1e3)}},_onVerticalScroll:function(e){this.toggleClass("scrolled",1<=this.$.list.scrollTop,this.$.header);this._currentPage=Math.max(0,Math.floor(this.$.list.scrollTop/this.$.list._physicalAverage/this.pageSize))},_itemsChanged:function(items){if(("items"===items.path||"items.splices"===items.path)&&Array.isArray(items.base)){this.size=items.base.length;this.dataSource=new ArrayDataSource(items.base)}else if(0===items.path.indexOf("items.#")&&Array.isArray(items.base)){var index=items.path.split(".")[1].substring(1),item=this.items[index],cachedIndex=this._cachedItems.indexOf(item);if(0<=cachedIndex){this.set(items.path.replace("items.","_cachedItems.").replace("#"+index,cachedIndex),items.value)}}},_itemChanged:function(e){if(this.items){var index=this.items.indexOf(e.detail.item);if(0<=index){this.set("items."+index+"."+e.detail.path,e.detail.value)}}if(this.autoRefresh!==void 0){this.debounce("auto-refresh",function(){this.refreshPage(this._currentPage)},this.autoRefresh)}},_currentPageChanged:function(dataSource,page){if(!this._isPageCached(page)){this.loading=!0}this.debounce("loading",function(){this._loadPage(dataSource,page);if(page+1<this.size/this.pageSize){this._loadPage(dataSource,page+1)}if(0<page){this._loadPage(dataSource,page-1)}}.bind(this),100)},_isPageLoading:function(page){return-1<this._pagesLoading.indexOf(page)},_addLoadingPage:function(page){if(!this._isPageLoading(page)){this.push("_pagesLoading",page)}this.loading=0<this._pagesLoading.length},_removeLoadingPage:function(page){var index=this._pagesLoading.indexOf(page);if(-1!==index){this.splice("_pagesLoading",index,1)}this.loading=0<this._pagesLoading.length},_isPageCached:function(page){return this._cachedPages&&-1<this._cachedPages.indexOf(page)},_loadPage:function(dataSource,page){if(this._isPageCached(page)){this._removeLoadingPage(page)}else if(!this._isPageLoading(page)){this._addLoadingPage(page);var success=function(items,size){this.push("_cachedPages",page);if(size!==void 0){this.size=size}for(var start=page*this.pageSize,i=0;i<this.pageSize;i++){var index=start+i,item=items[i];this.set("_cachedItems."+index,item);this.$.list._collection.store[index]=item;if(item&&"object"==typeof item){this.$.list._collection.omap.set(item,index)}else{this.$.list._collection.pmap[item]=index}}this.debounce("resizing",function(){this.$.list.notifyResize()}.bind(this),100);this._removeLoadingPage(page)}.bind(this),err=function(){this._removeLoadingPage(page)}.bind(this);dataSource({page:page,pageSize:this.pageSize,filter:this.filter,sortOrder:this.sortOrder},success,err)}},_sizeChanged:function(size,oldSize){if(this._cachedItems&&Math.abs(this._cachedItems.length-size)<2*this.pageSize){while(this._cachedItems.length<size){this.push("_cachedItems",{})}while(this._cachedItems.length>size){this.pop("_cachedItems")}}else{var items=[];while(items.length<size){items.push({})}this.set("_cachedItems",items)}if(size>oldSize){var oldLastPage=Math.floor(oldSize/this.pageSize);if(this._isPageCached(oldLastPage)||0===oldLastPage){this.refreshPage(oldLastPage)}}},clearCache:function(){this._cachedPages=[];this.refreshPage(this._currentPage)},refreshPage:function(page){if(this._cachedPages){var index=this._cachedPages.indexOf(page);if(-1<index){this.splice("_cachedPages",index,1)}}this._currentPageChanged(this.dataSource,page)},_updateSizeForItem:function(event){if(event.model.get("item")){for(var itemSet=[],i=0;i<this.$.list._physicalItems.length;i++){itemSet.push(i)}this.$.list._updateMetrics(itemSet);this.$.list._positionItems()}},expandItem:function(item){if(this.rowDetail&&this._expandedItems&&!this._isExpanded(item,this._expandedItems)){this._expandedItems.push(item);this._expandedItems=this._expandedItems.slice(0)}},collapseItem:function(item){if(this.rowDetail&&this._expandedItems&&this._isExpanded(item,this._expandedItems)){var index=this._expandedItems.indexOf(item);this._expandedItems.splice(index,1);this._expandedItems=this._expandedItems.slice(0)}},_isExpanded:function(item,items){return items&&-1<items.indexOf(item)},_isFocusable:function(target){if((void 0).useNativeShadow){return 0<=target.tabIndex}else{return target.contains(dom(document.activeElement).node)||"A"===target.tagName.toUpperCase()}},_onCellClick:function(e){if(this._isFocusable(dom(e).localTarget)){return}else{if(this.rowDetail&&this.detailsEnabled){if(this._isExpanded(e.model.item,this._expandedItems)){this._fireEvent("collapsing-item",e.model.item,this.collapseItem)}else{this._fireEvent("expanding-item",e.model.item,this.expandItem)}}if(this.selectionEnabled){if(this._isSelected(e.model.item,this.selectedItems)){this._fireEvent("deselecting-item",e.model.item,this.deselectItem)}else{this._fireEvent("selecting-item",e.model.item,this.selectItem)}}}},_fireEvent:function(eventName,item,defaultAction){var e=this.fire(eventName,{item:item},{cancelable:!0});if(!e.defaultPrevented){defaultAction.call(this,item)}},_onCheckBoxTap:function(e){if(this._isSelected(e.model.item,this.selectedItems)){this._fireEvent("deselecting-item",e.model.item,this.deselectItem)}else{this._fireEvent("selecting-item",e.model.item,this.selectItem)}}});export{IronDataTable};