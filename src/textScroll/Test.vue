<!--
 * @Author: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @Date: 2022-11-04 12:33:28
 * @LastEditors: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @LastEditTime: 2022-11-04 12:35:06
 * @FilePath: \vue3-text-scroll\src\textScroll\Test.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="test">{{text}}</div>
</template>

<script lang='ts'>
import { reactive, toRefs } from 'vue';

export default {
 props: {
    text: String
 },
 setup() {
    const state: any = reactive({
    });
   return {
    ...toRefs(state),
   }
 },
}
</script>
<style lang="scss" scoped>
.test {
    width: 100%;
    height: 100%;
}
</style>