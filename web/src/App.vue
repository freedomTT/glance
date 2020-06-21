<template>
    <div id="app">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="footer">
            <mu-bottom-nav>
                <mu-bottom-nav-item title="HotSearch" icon="visibility" to="/hot"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="Manage" icon="settings" to="/manage"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
    }
</script>

<style>
    body, html {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #app {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .content {
        position: absolute;
        width: 100%;
        height: calc(100% - 56px);
        overflow: auto;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }
</style>
