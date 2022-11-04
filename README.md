<!--
 * @Author: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @Date: 2022-11-03 10:58:17
 * @LastEditors: 西南开发二组蒋治坤 jiangzhikun@uino.com
 * @LastEditTime: 2022-11-04 11:48:03
 * @FilePath: \vue-carousel-slot\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 文字超过无缝滚动组件

## 可传参数

- `text` 要滚动的文字
- `speed` 文字滚动的速度 默认值 20 值越小速度越快
- `interval` 无缝滚动一轮结束时，首和尾的间隔距离 number

## 注意事项

- 该组件继承父元素的字体大小、字体、颜色、宽度、高度，所以`父元素的宽度必须设置`

- 内部通过计算当前组件的父元素宽度，再去对比（文字的长度，文字的字体大，中英文数字），计算是否滚动

- 计算中文，英文，数字的长度：英文和数字按照中文字符的一半来计算宽度

- 内部会将`回车符`、`换行符`去除掉

- 该组件性能不太好（但能用），有一些问题通过非常规手段解决（导致性能不好的原因，待一位有缘人拯救）
