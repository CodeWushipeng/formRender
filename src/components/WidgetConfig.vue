<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item :label="$t('fm.config.widget.model')" v-if="data.type!='grid'">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.name')" v-if="data.type!='grid'">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.width')" v-if="Object.keys(data.options).indexOf('width')>=0">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.height')" v-if="Object.keys(data.options).indexOf('height')>=0">
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.size')" v-if="Object.keys(data.options).indexOf('size')>=0">
        {{$t('fm.config.widget.width')}} <el-input style="width: 90px;" type="number" v-model.number="data.options.size.width"></el-input>
        {{$t('fm.config.widget.height')}} <el-input style="width: 90px;" type="number" v-model.number="data.options.size.height"></el-input>
      </el-form-item>
       <el-form-item :label="$t('fm.config.widget.labelWidth')" v-if="Object.keys(data.options).indexOf('labelWidth')>=0 && !data.options.tableColumn">
        <el-checkbox v-model="data.options.isLabelWidth" style="margin-right: 5px;">{{$t('fm.config.widget.custom')}}</el-checkbox>
        <el-input-number v-model="data.options.labelWidth" :disabled="!data.options.isLabelWidth" :min="0" :max="99999" :step="10"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.hideLabel')" v-if="data.type !='grid' && data.type != 'tabs' && data.type != 'report' && data.type != 'divider' && data.type != 'td'">
        <el-switch v-model="data.options.hideLabel"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.placeholder')" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.layout')" v-if="Object.keys(data.options).indexOf('inline')>=0">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">{{$t('fm.config.widget.block')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.config.widget.inline')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.contentPosition')" v-if="Object.keys(data.options).indexOf('contentPosition') >= 0">
        <el-radio-group v-model="data.options.contentPosition">
          <el-radio-button label="left">{{$t('fm.config.widget.left')}}</el-radio-button>
          <el-radio-button label="center">{{$t('fm.config.widget.center')}}</el-radio-button>
          <el-radio-button label="right">{{$t('fm.config.widget.right')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.showInput')" v-if="Object.keys(data.options).indexOf('showInput')>=0">
        <el-switch v-model="data.options.showInput" ></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.min')" v-if="Object.keys(data.options).indexOf('min')>=0">
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.max')" v-if="Object.keys(data.options).indexOf('max')>=0">
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.step')" v-if="Object.keys(data.options).indexOf('step')>=0">
        <el-input-number v-model="data.options.step" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.multiple')" v-if="data.type=='select' || data.type=='imgupload' | data.type=='imageupload' |data.type=='fileupload' |data.type=='videoupload'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.filterable')" v-if="data.type=='select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>

      <el-form-item v-if="data.type=='idencard' | data.type == 'readcard'">
        <!--是否支持外设-->
        <div v-if="data.type=='idencard' | data.type == 'readcard'">
          <el-checkbox v-model="data.options.ifperipheral">{{$t('fm.config.widget.ifperipheral')}}</el-checkbox>
        </div>
        <!--卡类型-->
        <div v-if="data.type=='readcard'">
            <el-select v-model="data.options.cardType">
                <el-option value="01" :label="$t('fm.config.widget.iccard')"></el-option>
                <el-option value="02" :label="$t('fm.config.widget.magnetismcard')"></el-option>
            </el-select>
            <label>{{$t('fm.config.widget.cardType')}}</label>
        </div>
      </el-form-item>

      <!--按钮相关属性-->
      <el-form-item v-if="data.type=='buttonCom' | data.type=='alink'">
          {{$t('fm.config.widget.buttontext')}}<el-input v-model="data.options.buttontext"></el-input>
          <div v-if="data.type=='buttonCom'">
            {{$t('fm.config.widget.buttonicon')}}<el-input v-model="data.options.buttonicon"></el-input>
          </div>
          {{$t('fm.config.widget.buttonfun')}}
          <el-input
                  style="text-overflow: ellipsis;"
                  readonly
                  @focus="handelMirror"
                  v-model="data.options.buttonfun"
                  placeholder="调用函数"
          >
          </el-input>
          {{$t('fm.config.widget.buttonurl')}}<el-input v-model="data.options.buttonurl"></el-input>
      </el-form-item>

      <!--密码相关属性-->
      <el-form-item v-if="data.type=='password' | data.type=='againpassword'">
        <el-switch
          v-model="data.options.peripheral"
          :inactive-text="$t('fm.config.widget.peripheral')">
        </el-switch>
      </el-form-item>

      <!--图片属性-->
      <el-form-item v-if="data.type=='imageshow'">
        <el-form-item :label="$t('fm.config.widget.imagesrc')">
          <el-input v-model="data.options.imagesrc"></el-input>
        </el-form-item>
      </el-form-item>

      <el-form-item label="$t('fm.config.widget.allowHalf')" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch
            v-model="data.options.allowHalf"
          >
          </el-switch>
      </el-form-item>
      
      <el-form-item :label="$t('fm.config.widget.showAlpha')" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch
            v-model="data.options.showAlpha"
          >
          </el-switch>
      </el-form-item>
      <!-- 下拉选择框是否用作级联选择器 -->
      <el-form-item label="是否用作级联选择器" v-if="data.type=='select'">
        <el-switch
            v-model="data.isCascader"
          >
        </el-switch>
      </el-form-item>
      <el-form-item v-if="data.isCascader">
        <el-input placeholder="请输入URL" v-model="data.cascaderUrl">
           <template slot="prepend">URL</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="data.isCascader">
        <el-input placeholder="请输入当前选择框父级model" v-model="data.fatherModel">
           <template slot="prepend">父级Model</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="data.isCascader">
        <el-input placeholder="请输入入口数据" @focus="handelMirror" readonly="readonly" v-model="data.requestData">
           <template slot="prepend">入口数据</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="data.isCascader">
        <el-input placeholder="请输入出口数据" @focus="handelMirror" readonly="readonly" v-model="data.responseData">
           <template slot="prepend">出口数据</template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.showLabel')" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch
            v-model="data.options.showLabel"
          >
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.option')" v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">{{$t('fm.config.widget.staticData')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.config.widget.remoteData')}}</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style="" v-model="data.options.remoteFunc">
              <template slot="prepend">{{$t('fm.config.widget.remoteFunc')}}</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.value">
              <template slot="prepend">{{$t('fm.config.widget.value')}}</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.label">
              <template slot="prepend">{{$t('fm.config.widget.label')}}</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">{{$t('fm.actions.addOption')}}</el-button>
          </div>
        </template>

      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.remoteData')" v-if="data.type=='cascader'">
        <div>
          <el-input size="mini" style="" v-model="data.options.remoteFunc">
            <template slot="prepend">{{$t('fm.config.widget.remoteFunc')}}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.value">
            <template slot="prepend">{{$t('fm.config.widget.value')}}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.label">
            <template slot="prepend">{{$t('fm.config.widget.label')}}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.children">
            <template slot="prepend">{{$t('fm.config.widget.childrenOption')}}</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item v-if="data.type=='textarea' | data.type=='singletext'">
        <!--高度自适应-->
        <div v-if="data.type=='textarea' | data.type=='singletext'">
          <el-checkbox v-model="data.options.textareaautosize">{{$t('fm.config.widget.textareaautosize')}}</el-checkbox>
        </div>
        <!--最大字数-->
        <template v-if="(data.type=='textarea' | data.type=='singletext') && data.options.textareaautosize==true" >
          <div style="display: inline-block;width: 49%;">
            <el-input type="number" v-model="data.options.textarealength"></el-input>
          </div>
          <span> {{$t('fm.config.widget.textarealength')}}</span>
        </template>
        <!--最小行数-->
        <template v-if="data.type=='textarea'">
          <div>
            <el-input-number v-model="data.options.textarearowmin" :min="2" size="mini" ></el-input-number>
            <span> {{$t('fm.config.widget.textarearowmin')}}</span>
          </div>
        </template>
        <!--最大行数-->
        <template v-if="data.type=='textarea'">
          <div>
            <el-input-number v-model="data.options.textarearowmax" :min="3" :max="10" size="mini" ></el-input-number>
            <span> {{$t('fm.config.widget.textarearowmax')}}</span>
          </div>
        </template>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.defaultValue')" v-if="Object.keys(data.options).indexOf('defaultValue')>=0">
        <el-input v-if="data.type=='textarea'" type="textarea" :rows="data.options.textarearows" v-model="data.options.defaultValue"></el-input>
        <el-rate v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf" v-model="data.options.defaultValue"></el-rate>
        <el-button type="text" v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">{{$t('fm.actions.clear')}}</el-button>
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="data.type=='switch'" v-model="data.options.defaultValue"></el-switch>
        <el-input v-else v-model="data.options.defaultValue"></el-input>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item :label="$t('fm.config.widget.showType')" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isRange')" v-if="data.type == 'time'">
          <el-switch
            v-model="data.options.isRange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isTimestamp')" v-if="data.type == 'date'">
          <el-switch
            v-model="data.options.timestamp"
          >
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.placeholder')" v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')">
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.startPlaceholder')" v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.endPlaceholder')" v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.format')">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.defaultValue')" v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0">
          <el-time-picker
            key="1"
            style="width: 100%;"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%;"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type=='imgupload' | data.type=='imageupload' |data.type=='fileupload' |data.type=='videoupload'">

        <el-form-item :label="$t('fm.config.widget.limit')">
          <el-input type="number" v-model.number="data.options.length"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isQiniu')" v-if="data.type == 'imgupload'">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu && data.type == 'imgupload'">
          <el-form-item label="Domain" :required="true">
          <el-input v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item :label="$t('fm.config.widget.tokenFunc')" :required="true">
            <el-input v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('fm.config.widget.imageAction')" :required="true" v-if="data.type == 'imgupload'">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type=='blank'">
        <el-form-item :label="$t('fm.config.widget.defaultType')">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" :label="$t('fm.config.widget.string')"></el-option>
            <el-option value="Object" :label="$t('fm.config.widget.object')"></el-option>
            <el-option value="Array" :label="$t('fm.config.widget.array')"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item :label="$t('fm.config.widget.gutter')">
          <el-input type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columnOption')">
          <draggable tag="ul" :list="data.columns"
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input :placeholder="$t('fm.config.widget.span')" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">{{$t('fm.actions.addColumn')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.justify')">
          <el-select v-model="data.options.justify">
            <el-option value="start" :label="$t('fm.config.widget.justifyStart')"></el-option>
            <el-option value="end" :label="$t('fm.config.widget.justifyEnd')"></el-option>
            <el-option value="center" :label="$t('fm.config.widget.justifyCenter')"></el-option>
            <el-option value="space-around" :label="$t('fm.config.widget.justifySpaceAround')"></el-option>
            <el-option value="space-between" :label="$t('fm.config.widget.justifySpaceBetween')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.align')">
          <el-select v-model="data.options.align">
            <el-option value="top" :label="$t('fm.config.widget.alignTop')"></el-option>
            <el-option value="middle" :label="$t('fm.config.widget.alignMiddle')"></el-option>
            <el-option value="bottom" :label="$t('fm.config.widget.alignBottom')"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-if="data.type == 'tabs'">
        <el-form-item :label="$t('fm.config.widget.type')">
          <el-radio-group v-model="data.options.type">
            <el-radio-button label="">{{$t('fm.config.widget.default')}}</el-radio-button>
            <el-radio-button label="card">{{$t('fm.config.widget.card')}}</el-radio-button>
            <el-radio-button label="border-card">{{$t('fm.config.widget.borderCard')}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.tabPosition')">
          <el-radio-group v-model="data.options.tabPosition">
            <el-radio-button label="top">{{$t('fm.config.widget.top')}}</el-radio-button>
            <el-radio-button label="left">{{$t('fm.config.widget.left')}}</el-radio-button>
            <el-radio-button label="right">{{$t('fm.config.widget.right')}}</el-radio-button>
            <el-radio-button label="bottom">{{$t('fm.config.widget.bottom')}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.tabOption')">
          <draggable tag="ul" :list="data.tabs" 
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.tabs" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input :placeholder="$t('fm.config.widget.tabName')" size="mini" style="width: 200px;" v-model="item.label"></el-input>
              
              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>
              
            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddTab">{{$t('fm.actions.addTab')}}</el-button>
          </div>
        </el-form-item>
      </template>
      <template v-if="data.type != 'grid'">
        <el-form-item :label="$t('fm.config.widget.attribute')">
          <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly')>=0">{{$t('fm.config.widget.readonly')}}</el-checkbox>
          <el-checkbox v-model="data.options.hidden" v-if="Object.keys(data.options).indexOf('hidden')>=0">{{$t('fm.config.widget.hidden')}}</el-checkbox>
          <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled')>=0">{{$t('fm.config.widget.disabled')}}	</el-checkbox>
          <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')>=0">{{$t('fm.config.widget.editable')}}</el-checkbox>
          <el-checkbox v-model="data.options.clearable" v-if="Object.keys(data.options).indexOf('clearable')>=0">{{$t('fm.config.widget.clearable')}} </el-checkbox>
          <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')>=0">{{$t('fm.config.widget.arrowControl')}}</el-checkbox>
          <el-checkbox v-model="data.options.isDelete" v-if="Object.keys(data.options).indexOf('isDelete')>=0">{{$t('fm.config.widget.isDelete')}}</el-checkbox>
          <el-checkbox v-model="data.options.isEdit" v-if="Object.keys(data.options).indexOf('isEdit')>=0">{{$t('fm.config.widget.isEdit')}}</el-checkbox>
          <el-checkbox v-model="data.options.showPassword" v-if="Object.keys(data.options).indexOf('showPassword')>=0">{{$t('fm.config.widget.showPassword')}} </el-checkbox>
        </el-form-item>
        <!-- 提示信息 -->
      <!-- <el-form-item v-if="data.type !='grid'" :label="$t('fm.config.widget.showTips')"> -->
        <!-- <span style="color: red">注意：设置只读属性不可以设置提示信息</span> -->
        <!-- <el-input v-if="data.options.disabled" :disabled="data.options.disabled" placeholder="不可配置"></el-input> -->
        <!-- <el-input placeholder="输入提示信息" v-model="data.options.tips"></el-input> -->
      <!-- </el-form-item> -->
        <el-form-item :label="$t('fm.config.widget.validate')">
          <div v-if="Object.keys(data.options).indexOf('required')>=0">
            <el-checkbox v-model="data.options.required">{{$t('fm.config.widget.required')}}</el-checkbox>
          </div>
          <el-select v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType" size="mini" >
            <el-option value="password" :label="$t('fm.config.widget.password')"></el-option>
            <el-option value="againpassword" :label="$t('fm.config.widget.againpassword')"></el-option>
            <el-option value="string" :label="$t('fm.config.widget.string')"></el-option>
            <el-option value="number" :label="$t('fm.config.widget.number')"></el-option>
            <el-option value="boolean" :label="$t('fm.config.widget.boolean')"></el-option>
            <el-option value="integer" :label="$t('fm.config.widget.integer')"></el-option>
            <el-option value="float" :label="$t('fm.config.widget.float')"></el-option>
            <el-option value="url" :label="$t('fm.config.widget.url')"></el-option>
            <el-option value="email" :label="$t('fm.config.widget.email')"></el-option>
            <el-option value="hex" :label="$t('fm.config.widget.hex')"></el-option>
          </el-select>

          <!--todo 整数自定义属性-->
          <el-select v-if="data.options.dataType=='integer'" v-model="patternpara" size="mini" >
            <el-option value="//" :label="$t('fm.config.integerpara.all')"></el-option>
            <el-option value="/^[0-9]*[1-9][0-9]*$/" :label="$t('fm.config.integerpara.pinteger')"></el-option>
            <el-option value="/^\d+$/" :label="$t('fm.config.integerpara.pzinteger')"></el-option>
            <el-option value="/^-[0-9]*[1-9][0-9]*$/" :label="$t('fm.config.integerpara.einteger')"></el-option>
            <el-option value="/^((-\d+)|(0+))$/" :label="$t('fm.config.integerpara.ezinteger')"></el-option>
          </el-select>
          <!--todo 整数位位数-->
          <template v-if="data.options.dataType=='integer' | data.options.dataType=='float'">
              <el-input-number v-model="data.options.integerbits" :min="1" :max="17" size="mini" :step="1">{{$t('fm.config.integerpara.integerbits')}}</el-input-number>
              <label>{{$t('fm.config.integerpara.integerbits')}}</label>
          </template>
          <!--todo 小数位位数-->
          <template v-if="data.options.dataType=='integer' | data.options.dataType=='float'">
              <el-input-number v-model="data.options.decimalbits" :min="0" :max="3" value="1" size="mini" :step="1"></el-input-number>
              <label>{{$t('fm.config.integerpara.decimalbits')}}</label>
          </template>

          <!--todo 金额精度-->
          <template v-if="data.options.amountmoney==true">
            <el-form-item :label="$t('fm.config.widget.point')">
              <el-input-number v-model="data.options.decimal" :min="0" :max="3" size="mini" >{{$t('fm.config.widget.decimal')}}</el-input-number>
            </el-form-item>
          </template>

          <!--todo 确认密码字段-->
          <el-form-item :label="$t('fm.config.widget.confirm_field')" v-if="data.options.confirm_field || data.options.dataType=='againpassword'">
            <el-input v-model="data.options.confirm_field"></el-input>
          </el-form-item>



          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input size="mini" v-model.lazy="data.options.pattern"  style=" width: 240px;" :placeholder="$t('fm.config.widget.patternPlaceholder')"></el-input>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: ['data'],
  data () {
    return {
      patternpara:'',
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    }
  },
    created () {
        /*this.$nextTick(()=>{
            this.valiatePattern("/^\\d+$/" )
        })*/
    },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    // codeMirror弹出函数
    handelMirror(e){
      console.log(this.data)
      this.$emit("mirror", this.data,e.target.placeholder)
    },
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else if (this.data.type === 'tabs') {
        this.data.tabs.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }

    },
    handleAddOption () {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: this.$t('fm.config.widget.newOption'),
          label: this.$t('fm.config.widget.newOption')
        })
      } else {
        this.data.options.options.push({
          value: this.$t('fm.config.widget.newOption')
        })
      }

    },
    handleAddColumn () {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    handleAddTab () {
      let length = this.data.tabs.length

      this.data.tabs.push({
        label: this.$t('fm.config.widget.tab') + (length + 1),
        name: 'tab_' + new Date().getTime(),
        list: []
      })
    },
    handleAddHeader () {
      if ('headers' in this.data.options) {
        this.data.options.headers.push({
          key: '',
          value: ''
        })
      } else {

        this.$set(this.data.options, 'headers', [{key: '', value: ''}])
      }
      
    },
    generateRule () {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple (value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }

      } else {
        if (this.data.options.defaultValue.length>0){
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }

      }
    },

    validateRequired (val) {
      if (val) {
        this.validator.required = {required: true, message: `${this.data.name}${this.$t('fm.config.widget.validatorRequired')}`,trigger: "enter"}
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },

    validateDataType (val) {
      if (!this.show) {
        return false
      }

      // todo 排除密码和确认密码 (单独自定义校验方法)
        if (val && val !== "password" && val !== "againpassword" && val !== "text" && val !== "integer" && val !== "float") {
        this.validator.type = {type: val, message: this.data.name + this.$t('fm.config.widget.validatorType'),trigger: "enter"}
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    valiatePattern (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = {pattern: val, message: this.data.name + this.$t('fm.config.widget.validatorPattern'),trigger: "enter"}
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    }
  },
  watch: {
    'patternpara': function(val) {
        this.data.options.pattern = val
    },
    'data.options.isRange': function(val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null
        } else {
          if (Object.keys(this.data.options).indexOf('defaultValue')>=0)
            this.data.options.defaultValue = ''
        }
      }
    },
    'data.options.required': function(val) {
      this.validateRequired(val)
    },
    'data.options.dataType': function (val) {
      this.validateDataType(val)
    },
    'data.options.pattern': function (val) {
      this.valiatePattern(val)
    },
    'data.name': function (val) {
      if (this.data.options) {
        this.validateRequired(this.data.options.required)
        this.validateDataType(this.data.options.dataType)
        this.valiatePattern(this.data.options.pattern)
      }
    },
    'data.options.options': {
      deep: true,
      handler (val) {
        console.log(val)
        console.log(typeof this.data.options.defaultValue)
        if (typeof this.data.options.defaultValue == 'array') {
          this.data.options.defaultValue = this.data.options.defaultValue.filter(item => val.map(item => item.value).includes(item))
        }
        if (typeof this.data.options.defaultValue == 'string') {

          if (typeof val == 'array' && !val.map(item => item.value).includes(this.data.options.defaultValue)) {
            this.data.options.defaultValue = ''
          }
        }
      }
    }
  }
}
</script>
