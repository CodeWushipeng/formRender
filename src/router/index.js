import Vue from "vue";
import Router from "vue-router";

import Home from "../demo/Home.vue";
import camera from "../demo/camera";
import LanguageView from "./LanguageView.vue";
import preview from "../demo/preView.vue";
import flowDemo3 from "../demo/demo3/flow-demo3";
import flowDemo4 from "../demo/demo4/demo4";
// import testJs from "../demo/testjs/index";
import testSelect from "../demo/copyComponents/test-select";
import testDate from "../demo/copyComponents/test-date";
import testUntil from "../demo/testUntil/index";
import nofound from "../demo/testUntil/404";

Vue.use(Router);

const language =
    localStorage.getItem("language") ||
    (navigator.language == "zh-CN" ? "zh-CN" : "en-US");

export default new Router({
  routes: [
    {
      path: "/",
      redirect: (to) => ({name: "index", params: {lang: language}}),
    },
    {
      path: "/:lang",
      // name: 'lang',
      component: LanguageView,
      children: [
        {
          path: "",
          name: "index",
          component: Home,
        },
        {
          path: "preview",
          name: "preview",
          component: preview,
        },
        {
          path: 'flow',
          name: 'flowDemo',
          component: flowDemo3,
        },
        {
          path: 'flow4',
          name: 'flowDemo4',
          component: flowDemo4,
        },
        {
          path: 'testSelect',
          name: 'testSelect',
          component: testSelect
        },
        {
          path: 'testDate',
          name: 'testDate',
          component: testDate
        },
        {
          path: 'testjs',
          name: 'testjs',
          component: testSelect
        },
        {
          path: 'until',
          name: 'until',
          component: testUntil
        },
        {
          path: 'camera',
          name: 'camera',
          component: camera
        },
        {
          path: '/404',
          component: nofound,
          hidden: true
        },
        {path: '*', redirect: '/404', hidden: true}
      ]
    }
  ]
})
