import Vue from "vue";
import Router from "vue-router";

import Home from "../demo/Home.vue";
import LanguageView from "./LanguageView.vue";
import preview from "../demo/preView.vue";
import flowDemo from "../demo/flow-demo";
import flowDemo2 from "../demo/flow-demo2";
import flowDemo3 from "../demo/flow-demo3";

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
              path: 'flowDemo',
              name: 'flowDemo',
              component: flowDemo
          },
          {
              path: 'flowDemo3',
              name: 'flowDemo3',
              component: flowDemo3
          }
      ]
    }
  ]
})
