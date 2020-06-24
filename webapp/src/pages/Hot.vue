<template>
  <div class="fit row wrap justify-start items-start content-start" style="position:absolute;height: 100%;">
    <div style="width: 80px;height:100%;border-right: 1px solid #eeeeee;">
      <template>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary"
          @input="handleTabChange"
        >
          <q-tab name="weibo" icon="visibility" label="热搜"/>
          <q-tab name="baidu1" icon="whatshot" label="实时"/>
          <q-tab name="baidu341" icon="today" label="今日"/>
          <q-tab name="baidu42" icon="filter_7" label="七日"/>
          <q-tab name="baidu342" icon="emoji_people" label="民生"/>
          <q-tab name="baidu344" icon="emoji_emotions" label="娱乐"/>
          <q-tab name="baidu11" icon="sports_soccer" label="体育"/>
        </q-tabs>
      </template>
    </div>
    <div class="col" style="height: 100%;overflow: auto;position: relative">
      <img v-show="!loading && dataList.length === 0" src="../assets/null.png"
           style="position: absolute;margin: auto;left: 0;top: 0;right: 0;bottom: 0" alt="">
      <div v-if="loading" style="position: absolute;width: 100%;height: 100%;overflow: hidden">
        <q-list>
          <q-item v-for="(i,index) in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="'s'+index + i">
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text"/>
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%"/>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else style="padding-top: 10px;">
        <q-list>
          <q-item v-for="(item,index) in dataList" :key="'d'+index" style="min-height:30px;padding: 8px 10px;cursor: pointer;">
            <q-card class="shadow-1" style="width: 100%;" @click="handleGoDetailPage(item)">
              <q-card-section>
                <div>
                  <span class="text-primary">{{item.title}}</span>
                  <div style="position:absolute;right: 3px;top:0px;font-size: 15px;">
                    <q-icon class="text-red" name="whatshot" v-show="item.icon === '沸'"/>
                    <q-icon class="text-grey" name="sentiment_dissatisfied" v-show="item.icon === '荐'"/>
                    <span style="font-size: 12px;" class="text-pink" v-show="item.icon === '新'">New</span>
                  </div>
                  <span class="text-grey-4" style="position:absolute;right: 5px;bottom:2px;font-size: 12px;">{{parseInt(item.hot/1000)||0}}k</span>
                </div>
              </q-card-section>
            </q-card>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHotSearch',
  data () {
    return {
      tab: 'weibo',
      loading: false,
      dataList: []
    }
  },
  computed: {},
  mounted () {
    this.loadData({
      kind: this.tab
    })
  },
  methods: {
    handleTabChange (val) {
      const params = {
        kind: null,
        cg: null
      }

      switch (val) {
        case 'weibo':
          params.kind = 'weibo'
          params.cg = null
          break
        case 'baidu1':
          params.kind = 'baidu'
          params.cg = '1'
          break
        case 'baidu341':
          params.kind = 'baidu'
          params.cg = '341'
          break
        case 'baidu42':
          params.kind = 'baidu'
          params.cg = '42'
          break
        case 'baidu342':
          params.kind = 'baidu'
          params.cg = '342'
          break
        case 'baidu344':
          params.kind = 'baidu'
          params.cg = '344'
          break
        case 'baidu11':
          params.kind = 'baidu'
          params.cg = '11'
          break
        default:
          params.kind = 'baidu'
          params.cg = '42'
      }
      this.loadData(params)
    },
    loadData (params) {
      this.dataList = []
      this.loading = true
      this.$axios.get('/api/news', {
        params
      })
        .then((response) => {
          if (response.data.success) {
            this.dataList = response.data.result
          } else {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: response.data.message,
              icon: 'report_problem'
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
          this.loading = false
        })
    },
    handleGoDetailPage (item) {
      this.$router.push({
        name: 'detail',
        params: {
          text: item.title
        }
      })
    }
  }
}
</script>
