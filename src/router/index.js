import Vue from "vue";
import Router from "vue-router";

import Home from "../demo/Home.vue";
import camera from "../demo/camera";
import LanguageView from "./LanguageView.vue";
import preview from "../demo/preView.vue";
import flowDemo3 from "../demo/demo3/flow-demo3";
import testJs from "../demo/testjs/index";

Vue.use(Router);

const language =
  localStorage.getItem("language") ||
  (navigator.language == "zh-CN" ? "zh-CN" : "en-US");

export default new Router({
  routes: [
    {
      path: "/",
      redirect: (to) => ({ name: "index", params: { lang: language } }),
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
              name: 'flow',
              component: flowDemo3
          },
          {
              path: 'testjs',
              name: 'testjs',
              component: testJs
          },
          {
              path: 'camera',
              name: 'camera',
              component: camera
          },
      ]
    }
  ]
})
