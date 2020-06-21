<template>
    <div class="manage">
        <div class="mask" v-show="isShowMask">
            <mu-container style="padding:50% 20px;">
                <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="right" >
                    <mu-form-item label="username" prop="username" :rules="usernameRules">
                        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="password" prop="password" :rules="passwordRules">
                        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                    </mu-form-item>
                </mu-form>
                <mu-button full-width large color="primary" @click="submit">ok</mu-button>
            </mu-container>
        </div>
        <div style="padding-top: 50px;text-align: center;">
            <mu-button color="primary" @click="refreshWeiboHot" :loading="hotLoading">Refresh HotSearch</mu-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Manage',
        data() {
            return {
                usernameRules: [
                    {validate: (val) => !!val, message: '必须填写用户名'},
                    {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
                ],
                passwordRules: [
                    {validate: (val) => !!val, message: '必须填写密码'},
                    {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
                ],
                validateForm: {
                    username: '',
                    password: '',
                },
                isShowMask: true,
                hotLoading: false,
            }
        },
        mounted() {
        },
        methods: {
            refreshWeiboHot() {
                this.hotLoading = true;
                this.$http.get('/news/refresh?kind=weibo', {}).then((res) => {
                    if (res.success) {
                        this.hotLoading = false;
                        this.$toast.success('刷新热搜成功');
                    } else {
                        this.hotLoading = false;
                        this.$toast.error('刷新热搜失败');
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            submit() {
                this.$refs.form.validate().then((result) => {
                    if (result) {
                        if (this.validateForm.username === 'lzd' || this.validateForm.password === '88888888') {
                            this.isShowMask = false;
                        } else {
                            this.$toast.error('账号或密码错误');
                        }
                    }
                });
            },
        }
    }
</script>

<style>
    .manage {
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ffffff;
        z-index: 10;
    }
</style>
