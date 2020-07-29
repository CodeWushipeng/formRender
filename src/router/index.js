import Vue from "vue";
import Router from "vue-router";

import Home from "../demo/Home.vue";
import camera from "../demo/camera";
import LanguageView from "./LanguageView.vue";
import preview from "../demo/preView.vue";
import flowDemo3 from "../demo/demo3/flow-demo3";
import testJs from "../demo/testjs/index";
import testSelect from "../demo/testSelect/test-select";
import testUntil from "../demo/testUntil/index";
import nofound from "../demo/testUntil/404";
//import image from "../demo/image";

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
                    name: 'flowDemo',
                    component: flowDemo3,
                },
                {
                  path: 'testSelect',
                  name: 'testSelect',
                  component: testSelect
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
                { path: '*', redirect: '/404', hidden: true }
                /*{
                    path: 'image',
                    name: 'image',
                    component: image
                },*/
            ]
        }
    ]
})
