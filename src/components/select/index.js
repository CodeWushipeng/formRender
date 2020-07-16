import hrSelect from './src/select';

/* istanbul ignore next */
hrSelect.install = function(Vue) {
  Vue.component(hrSelect.name, hrSelect);
};

export default hrSelect;
