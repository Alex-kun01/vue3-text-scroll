<!--
 * @Author: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @Date: 2022-11-02 09:45:29
 * @LastEditors: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @LastEditTime: 2022-11-04 14:19:49
 * @FilePath: \vitevue3app\src\components\Carousel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="carousel">
        <!-- 文字组件容器 宽度必须有 -->
        <div class="wraper" :key="updateKey">
            <div class="text_wraper vue">普通文字节点</div>
            <div class="text_wraper" v-for="(item, index) in texts" :key="index">
                <TextScroll :text="item.name" :speed="5" />
            </div>
            <div class="text_wraper vue2">
                <Test :text="'无计算组件对照'" />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onUnmounted } from 'vue';
import TextScroll from './TextScroll.vue';
import Test from './Test.vue';

export default {
 components: {
    TextScroll,
    Test
 },
 setup() {
    const testData = [
        {
            name: '这是文字这是文'
        },
        {
            name: '这是文字这是文'
        },
        {
            name: '这是文字这是文字这是文字这是文字'
        },
        {
            name: '这是文字这是文'
        },
        {
            name: '这是文字这'
        },
        {
            name: '这是文字这是文这是文字这是文'
        },
        {
            name: '这是文字这是'
        },
        {
            name: '这是文字'
        }
    ];
    const state: any = reactive({
        updateKey: 123,
        texts: []
    })

    const changeIndex = (index: number) => {
        state.slideIndex = index;
    }

    state.texts = testData;
    setInterval(() => {
        state.texts = testData;
        state.updateKey = Date.now();
    }, 10000)

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
    align-items: center;
    justify-content: center;

    .wraper {
        width: 800px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(232, 248, 243);
    }

    .text_wraper {
        width: 300px;
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        background-color: rgb(246, 222, 189);
        color: black;
        margin-bottom: 10px;

        &.vue {
            background-color: darkgrey;
        }

        &.vue2 {
            background-color: darkorange;
        }
    }
    
}
</style>