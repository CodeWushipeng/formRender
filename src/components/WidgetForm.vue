<template>
  <div class="widget-form-container">
    <div v-if="data.list.length == 0" class="form-empty">
      {{ $t('fm.description.containerEmpty') }}
    </div>
    <el-form
      :size="data.config.size"
      label-suffix=":"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <draggable
        class
        v-model="data.list"
        v-bind="{
          group: 'people',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-widget',
        }"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
        @update="handleWidgetUpdate"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <template v-if="element && element.key">
              <widget-col-item
                v-if="element.type == 'grid'"
                :key="element.key"
                :element="element"
                :select.sync="selectWidget"
                :index="index"
                :data="data"
                @select-change="handleSelectChange"
              >
              </widget-col-item>
              <widget-tab-item
                v-else-if="element.type === 'tabs'"
                :key="element.key"
                :element="element"
                :select.sync="selectWidget"
                :index="index"
                :data="data"
                @select-change="handleSelectChange"
              >
              </widget-tab-item>
              <widget-form-item
                v-else
                :key="element.key"
                :element="element"
                :select.sync="selectWidget"
                :index="index"
                :data="data"
                @select-change="handleSelectChange"
              ></widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import WidgetColItem from './WidgetColItem';
import WidgetFormItem from './WidgetFormItem';
import WidgetTabItem from './WidgetTabItem'
import { EventBus } from '../util/event-bus.js';
import _ from 'lodash';

export default {
  components: {
    Draggable,
    WidgetFormItem,
    WidgetColItem,
    WidgetTabItem
  },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select,
    };
  },
  mounted() {
    (document.body.ondrop = function(event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) {
        event.preventDefault();
        event.stopPropagation();
      }
    }),
      EventBus.$on('on-field-add', item => {
        console.log('.....');
        console.log(item, this.data, this.select);

        const key = new Date().getTime() + '';
        let widgetItem = _.cloneDeep({
          ...item,
          options: {
            ...item.options,
          },
          key,
          model: item.model ? item.model : 'object',
          tableName: '',
          tableCode: '',
          rules: [],
        });

        if (widgetItem.type == 'report') {
          widgetItem.rows = generateKeyToTD(widgetItem.rows);
        }
        this.data.list.push(widgetItem);
        this.selectWidget = this.data.list[this.data.list.length - 1];
        this._addWidget(this.data.list, widgetItem);
        EventBus.$emit('on-history-add');
      });
  },
  methods: {
    _addWidget(list, widget, isTable = false) {
      if (
        isTable &&
        (widget.type == 'grid' ||
          widget.type == 'table' ||
          widget.type == 'tabs' ||
          widget.type == 'divider' ||
          widget.type == 'report')
      ) {
        this.$message.warning(this.$t('fm.message.noPut'));
        return false;
      }

      if (this.selectWidget && this.selectWidget.key) {
        const index = list.findIndex(item => item.key == this.selectWidget.key);

        if (index >= 0) {
          list.splice(index + 1, 0, widget);

          this.selectWidget = list[index + 1];
        } else {
          list.forEach(item => {
            if (item.type === 'grid') {
              item.columns.forEach(column => {
                this._addWidget(column.list, widget);
              });
            }
            if (item.type === 'table') {
              this._addWidget(item.tableColumns, widget, true);
            }
            if (item.type === 'tabs') {
              item.tabs.forEach(tab => {
                this._addWidget(tab.list, widget);
              });
            }
            if (item.type === 'report') {
              for (let i = 0; i < item.rows.length; i++) {
                for (let j = 0; j < item.rows[i].columns.length; j++) {
                  if (
                    !this._addWidget(item.rows[i].columns[j].list, widget, true)
                  ) {
                    return false;
                  }
                }
              }
            }
          });
        }
      } else {
        list.push(widget);

        this.selectWidget = list[list.length - 1];
      }
    },
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex);
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index];
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex;
      const to = evt.to;
      console.log(to);

      //为拖拽到容器的元素添加唯一 key
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].model
          ? this.data.list[newIndex].model
          : 'object',
        tableName: '',
        tableCode: '',
        rules: [],
      });

      if (
        this.data.list[newIndex].type === 'radio' ||
        this.data.list[newIndex].type === 'checkbox' ||
        this.data.list[newIndex].type === 'select'
      ) {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item,
            })),
          },
        });
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({
            ...item,
          })),
        });
      }

      this.selectWidget = this.data.list[newIndex];
      this.$nextTick(() => {
        EventBus.$emit('on-history-add');
      });
    },
    handleWidgetUpdate(evt) {
      this.$nextTick(() => {
        EventBus.$emit('on-history-add');
      });
    },
    handleSelectChange(index) {
      console.log('select-change', index);
      setTimeout(() => {
        index >= 0
          ? (this.selectWidget = this.data.list[index])
          : (this.selectWidget = {});
      });
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex);
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;

      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' &&
          this.data.list.splice(
            oldIndex,
            0,
            row.columns[colIndex].list[newIndex]
          );

        row.columns[colIndex].list.splice(newIndex, 1);

        return false;
      }

      console.log('from', item);

      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].model
          ? row.columns[colIndex].list[newIndex].model
          : 'object',
        tableName: '',
        tableCode: '',
        rules: [],
      });

      if (
        row.columns[colIndex].list[newIndex].type === 'radio' ||
        row.columns[colIndex].list[newIndex].type === 'checkbox' ||
        row.columns[colIndex].list[newIndex].type === 'select'
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(
              item => ({
                ...item,
              })
            ),
          },
        });
      }

      this.selectWidget = row.columns[colIndex].list[newIndex];
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1);
        this.$nextTick(() => {
          EventBus.$emit('on-history-add');
        });
      });
    },
  },
  watch: {
    select: {
      deep: true,
      handler(val, oldval) {
        this.selectWidget = val;
      },
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val);
      },
      deep: true,
    },
  },
};
</script>
