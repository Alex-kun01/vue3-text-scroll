<!--
 * @Author: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @Date: 2022-11-02 09:45:29
 * @LastEditors: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @LastEditTime: 2022-11-04 11:46:00
 * @FilePath: \vitevue3app\src\components\Carousel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="carousel">
        <!-- 文字组件容器 宽度必须有 -->
        <div class="text_wraper" v-for="(item, index) in texts" :key="index">
            <TextScroll :text="item.name" />
        </div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs } from 'vue';
import TextScroll from './TextScroll.vue';

export default {
 components: {
    TextScroll
 },
 setup() {
    const state: any = reactive({
        texts: [
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字这是文字这是文字这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            },
            {
                name: '这是文字这是文字'
            }
        ]
    })

    const changeIndex = (index: number) => {
        state.slideIndex = index;
    }

   return {
    ...toRefs(state),
    changeIndex
   }
 },
}
</script>
<style lang="scss" scoped>
.carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .text_wraper {
        width: 300px;
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        background-color: rgb(246, 222, 189);
        color: black;
        margin-bottom: 10px;
    }
    
}
</style>