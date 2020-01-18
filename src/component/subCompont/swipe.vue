// 轮播图组件

<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 谁使用轮播图 谁就传 lunboList -->
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <img :src="item.img" :class="{ full: isfull }" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunboList", "isfull"]
}
</script>

<style lang="less" scoped>
     //轮播图样式
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .isfull{
        height: 100%
    }
</style>