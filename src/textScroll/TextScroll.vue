<template>
  <div :id="nodeId" class="b-TextScroll">
    <div class="text_wraper_jzk" @mouseenter="mouseenterHandle" @mouseleave="mouseleaveHandle" :id="nodeId + 'jzk'" />
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
			default: 100
		}
	},
	setup (props) {
        let nodeWraper = null;
        const targeText = props.text.replace(/[\r\n]/g,'');

        // 获取唯一ID
		const getRadomId = () => {
			return (Math.random() + '').substr(3, 3) + Date.now().toString(32)
		}
        const idx = getRadomId()

		const params = reactive({
			// 记录初始偏移量
			defaultLeft: null,
			transfromX: 0,
			itemWidth: 0,
			wraperWidth: 0,
			timer: null,
			nodeId: idx,
            // 是否暂停
            isStart: true
		})

		// 初始化显示元素
		const init = () => {
			// 当前容器
			nodeWraper = document.getElementById(params.nodeId)
			// 获取容器元素
			const wraperDom = nodeWraper.children[0]
			params.wraperWidth = wraperDom.offsetWidth
			createItem(wraperDom)
			// 获取item的宽度
			const itemDoms = wraperDom.children
			params.itemWidth = itemDoms[0].offsetWidth
			params.transfromX = 0
			params.defaultLeft = 0
			judgeIsScroll(wraperDom)
		}

        // 创建item元素
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
			if (params.itemWidth > params.wraperWidth) {
                createItem(wraperDom)
				setTimeout(() => { moveItem()  }, 10)
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

		// 移动
		const moveItem = () => {
			params.timer = setInterval(() => {
                if (!params.isStart) return
				const nodeWraper = document.getElementById(params.nodeId).children[0]
                deleteAsyncDom(nodeWraper)
				nodeWraper.style.transform = `translateX(${params.transfromX - 1 + 'px'})`
				params.transfromX = params.transfromX - 1
				// 当左移的距离等于item的宽度时
				if (parseInt(params.transfromX.toString().replace('-', ''))  === params.itemWidth) {
					// 获取当前的第一个子元素
					const itemDom = nodeWraper.children[0]
					// 删除第一个子元素
					itemDom.remove()
					// 将左边的偏移量重置
					nodeWraper.style.transform =  `translateX(${params.defaultLeft + props.interval + 'px'})`
					params.transfromX = params.defaultLeft + props.interval
					// 在右边重新插入item元素
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
            mouseleaveHandle
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

