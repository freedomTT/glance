<template>
  <div>
    <q-header elevated style="position: fixed;top: 0;left: 0;">
      <q-toolbar>
        <q-btn flat @click="handleGoBack" round dense icon="backspace"/>
        <q-toolbar-title>{{$route.params.text}}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="fit row wrap justify-start items-start content-start"
         style="position:absolute;height: 100%;padding: 10px 5px;">
      <div v-if="loading" style="position: absolute;left:0;top:0;width: 100%;height: 100%;overflow: hidden">
        <q-list>
          <q-item v-for="(i,index) in [1,2,3,4,5]" :key="'s'+index + i">

            <q-card bordered style="width: 100%;box-sizing: border-box;">
              <q-item>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" animation="fade"/>
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" animation="fade"/>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-skeleton height="100px" square animation="fade"/>

              <q-card-section>
                <q-skeleton type="text" class="text-subtitle2" animation="fade"/>
                <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade"/>
              </q-card-section>
            </q-card>
          </q-item>
        </q-list>
      </div>
      <div v-else>
        <q-card class="my-card shadow-0" bordered v-for="(item,i) in dataList" :key="item.name + i">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="item.avator"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{item.name}}</q-item-label>
              <q-item-label caption>
                {{item.from}}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-card-section style="font-size: 16px;">
            {{item.content.replace('收起全文d','')}}
          </q-card-section>
          <q-separator v-show="item.imgs.length"/>
          <q-card-section v-show="item.imgs.length">
            <div class="q-gutter-md row items-start">
              <q-img
                v-for="(img) in item.imgs"
                :key="img"
                transition="fade"
                :src="img"
                style="width: 28.5%"
                ratio="1"
                spinner-color="white"
                class="rounded-borders"
              >
              </q-img>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageDetail',
  components: {},
  data () {
    return {
      loading: true,
      dataList: [],
      imagesList: [],
      options: {
        zIndex: 10000000,
        title: false,
        toolbar: false,
        button: false
      }
    }
  },
  computed: {},
  mounted () {
    const text = this.$route.params.text
    if (text) {
      this.loadData({
        text: text
      })
    }
  },
  methods: {
    handleGoBack () {
      this.$router.back()
    },
    loadData (params) {
      this.dataList = []
      this.loading = true
      this.$axios.get('/api/news/detail', {
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
    }
  }
}
</script>
<style>
  .my-card {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
