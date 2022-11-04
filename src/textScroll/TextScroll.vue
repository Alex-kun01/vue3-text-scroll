<template>
  <div :id="nodeId" class="b-TextScroll">
    <div class="text_wraper_jzk" @mouseenter="mouseenterHandle" @mouseleave="mouseleaveHandle" :id="nodeId + 'jzk'">
        <div :class="{['text_scroll_item_temp' + idx]: 1}" :style="{marginRight: interval + 'px', whiteSpace: 'nowrap'}">{{text}}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue'

export default defineComponent({
	name: 'BTextScroll',
	props: {
		text: {
			type: String,
			default: '请传入内容'
		},
		speed: {
			type: Number,
			default: 20
		},
		interval: {
			type: Number,
			default: 20
		}
	},
	setup (props) {
        /**
         * 根节点：组件根节点
         * 偏移容器：用于移动的元素 此元素没有宽度，通过内部的元素撑开宽度
         * 文字容器：用于显示文字一行内容的元素， 宽度通过文字内容计算得出
         */
        let nodeWraper = null;
        // 去除换行符、回车符
        const targeText = props.text.replace(/[\r\n]/g,'');

        // 获取唯一ID
		const getRadomId = () => {
			return (Math.random() + '').substr(3, 3) + Date.now().toString(32)
		}

        // 获取一个唯一id所谓该组件的唯一标识
        const idx = getRadomId()

		const params = reactive({
			defaultLeft: null, // 记录【偏移容器】初始偏移量
			transfromX: 0, // 【文字容器】的偏移量值
			textWidth: 0, // 【文字容器】的宽度
			wraperWidth: 0, // 【偏移容器】宽度
			timer: null, // 定时器id
			nodeId: idx, // 根节点唯一id
            isStart: true // 是否暂停
		})

		// 初始化显示元素
		const init = () => {
			// 获取该组件根节点
			nodeWraper = document.getElementById(params.nodeId)
			// 获取容器元素
			const wraperDom = nodeWraper.children[0]
			params.wraperWidth = wraperDom.offsetWidth

			// 获取文字容器的宽度
			const itemDoms = wraperDom.children
			params.textWidth = itemDoms[0].offsetWidth
			params.transfromX = 0
			params.defaultLeft = 0
			judgeIsScroll(wraperDom)
		}

        // 创建一个【文字容器】 并添加到【偏移容器】中
		const createItem = (dom) => {
			const newItem = document.createElement('div')
            newItem.className = 'text_scroll_item_temp' + idx
			newItem.style.whiteSpace = 'nowrap'
			newItem.style.marginRight = `${props.interval}px`
			newItem.innerText = targeText
            if (dom.id === params.nodeId + 'jzk') dom.appendChild(newItem)
		}

		// 判断是否滚动
		const judgeIsScroll = (wraperDom) => {
            // 如果一个文字容器的宽度 大于 
			if (params.textWidth > params.wraperWidth) {
                createItem(wraperDom)
				setTimeout(() => { moveDevictionBox()  }, 10)
			}
		}

        // 监听异常的dom并删除
        const deleteAsyncDom = (nodeWraper) => {
            Array.from(nodeWraper.children).forEach(el => {
                if (el.className !== 'text_scroll_item_temp' + idx) {
                    console.log('class name', el.className)
                    el.remove()
                }
            })
        }

		// 移动【偏移容器】
		const moveDevictionBox = () => {
			params.timer = setInterval(() => {
                if (!params.isStart) return

                // 获取根节点
                const nodex = document.getElementById(params.nodeId)
                if (!nodex) return

                // 获取到文字容器的父元素
				const nodeWraper = nodex.children[0]
                deleteAsyncDom(nodeWraper)

                // 初始化偏离量
				nodeWraper.style.transform = `translateX(${params.transfromX - 1 + 'px'})`
				params.transfromX = params.transfromX - 1
                
				// 当左移的距离等于item的宽度时
				if (parseInt(params.transfromX.toString().replace('-', ''))  === params.textWidth) {
					// 获取当前的第一个子元素
					const itemDom = nodeWraper.children[0]
					// 删除第一个子元素
					itemDom.remove()
					// 重置文字容器的偏移量
					nodeWraper.style.transform =  `translateX(${params.defaultLeft + props.interval + 'px'})`
					params.transfromX = params.defaultLeft + props.interval
					// 在右边创建并插入新的item元素
					createItem(nodeWraper)
				}
			}, props.speed)
		}

        // 鼠标移入事件处理
        const mouseenterHandle = () => {
           params.isStart = false 
        }

        // 鼠标移出事件处理
        const mouseleaveHandle = () => {
            params.isStart = true
        }

		onMounted(() => {
			setTimeout(() => { init() }, 50)
		})

		onUnmounted(() => {
			clearInterval(params.timer);
            // 卸载根节点
            if (nodeWraper) nodeWraper.remove();

            // 此段代码：强行解决上面的逻辑问题 ----------------------------------------------------------------------------------------------------------------
            // 立即执行函数闭包保留原始id
            (function(id){
                // 每隔50毫秒清除一次临时dom
                const ttmm = setInterval(() => { Array.from(document.getElementsByClassName('text_scroll_item_temp' + id)).forEach(el => el.remove()); }, 50)
                setTimeout(() => { clearInterval(ttmm) }, 5000)
            })(idx);
            // -----------------------------------------------------------------------------------------------------------------------------------------------

		})

		return {
			...toRefs(params),
			getRadomId,
            mouseenterHandle,
            mouseleaveHandle,
            idx
		}
	}
})
</script>

<style lang="scss" scoped>
.b-TextScroll {
    width: 100%;
    position: relative;
    overflow: hidden;

    .text_wraper_jzk {
        display: flex;
        align-items: center;
    }
}
</style>

