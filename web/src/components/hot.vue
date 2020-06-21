<template>
    <div class="hot" data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(255,2552,255, .7)"
         :v-loading="loading">
        <mu-list>
            <mu-sub-header>Weibo HotSearch<span
                    style="float:right;padding-right: 15px;font-size: 13px;">{{dateTime}}</span>
            </mu-sub-header>
            <mu-list-item button :ripple="false" v-for="(item,index) in hotList" :key="'id' + index"
                          :href="'https://cn.bing.com/search?q=' + item.title + '&qpvt=%25s'">
                <mu-list-item-action>
                    <p style="text-align: center">
                        <span v-if="item.status === '热'" style="background-color:rgba(232,48,0,0.54);"
                              class="item-status">{{item.status}}</span>
                        <span v-if="item.status === '新'" style="background-color:rgba(255,155,0,0.62);"
                              class="item-status">{{item.status}}</span>
                        <span v-if="item.status === '荐'" style="background-color:#dadada;"
                              class="item-status">{{item.status}}</span>
                    </p>
                </mu-list-item-action>
                <mu-list-item-title
                        v-bind:style="{'text-decoration':item.status === '荐' ? 'line-through':null,'color': item.status === '荐' ? '#a3a3a3' : '#2c70ff'}">
                    {{item.title}}
                </mu-list-item-title>
                <mu-list-item-action>
                    <span style="font-size: 12px;">{{parseInt(item.hot/1000)}}k</span>
                </mu-list-item-action>
            </mu-list-item>
        </mu-list>
        <p v-show="hotList.length" style="text-align: center;font-size: 12px;color: #dcdcdc">
            本项目为学习demo；本项目的所有数据来源均来自网络（新浪微博等）数据内容及其解释权归其所有。</p>
    </div>
</template>

<script>
    export default {
        name: 'Hot',
        data() {
            return {
                loading: false,
                dateTime: null,
                hotList: []
            }
        },
        mounted() {
            this.handleQueryHotList();
        },
        methods: {
            handleQueryHotList() {
                this.loading = true;
                this.hotList = [];
                this.$http.get('/news?kind=weibo', {}).then((res) => {
                    if (res.success) {
                        this.hotList = res.result;
                        if (res.result.length) {
                            this.dateTime = this.$moment(res.result[0].datetime).format('YYYY/MM/DD HH:mm');
                        }
                    }
                    this.loading = false;
                }).catch((e) => {
                    this.$toast.error(e);
                });
            }
        }
    }
</script>

<style>
    .hot {
    }

    .item-status {
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 5px;
        color: #ffffff;
        font-size: 12px;
    }

    .mu-item {
        height: 40px;
        border-bottom: 1px solid #eeeeee;
    }

    .mu-item-action {
        min-width: 34px;
    }

    .mu-item-title {
    }
</style>
