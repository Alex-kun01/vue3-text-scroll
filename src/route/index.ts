/*
 * @Author: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @Date: 2022-11-04 11:43:34
 * @LastEditors: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @LastEditTime: 2022-11-04 11:45:13
 * @FilePath: \vue3-text-scroll\src\route\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import TextScroll from '../textScroll/Index.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "TextScroll",
            component: TextScroll,
        },
    ],
})

export default router;
