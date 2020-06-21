import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './router'
import Https from './http.js'
import moment from 'moment'
import 'muse-ui/lib/styles/base.less';
import 'muse-ui/lib/styles/theme.less';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import './registerServiceWorker'

Vue.prototype.$moment = moment;
Vue.use(Loading);
Vue.use(Toast, {
    position: 'top'
});

import {
    Alert,
    AppBar,
    AutoComplete,
    Avatar,
    Badge,
    BottomNav,
    BottomSheet,
    Breadcrumbs,
    Button,
    Card,
    Checkbox,
    Chip,
    DateInput,
    DataTable,
    Dialog,
    Divider,
    Drawer,
    ExpansionPanel,
    Form,
    Grid,
    GridList,
    Helpers,
    Icon,
    List,
    LoadMore,
    Menu,
    Pagination,
    Paper,
    Picker,
    Popover,
    Progress,
    Radio,
    Select,
    SlidePicker,
    Slider,
    Snackbar,
    Stepper,
    SubHeader,
    Switch,
    Tabs,
    TextField,
    Tooltip
} from 'muse-ui';

import './registerServiceWorker'

Vue.use(Alert);
Vue.use(AppBar);
Vue.use(AutoComplete);
Vue.use(Avatar);
Vue.use(Badge);
Vue.use(BottomNav);
Vue.use(BottomSheet);
Vue.use(Breadcrumbs);
Vue.use(Button);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(Chip);
Vue.use(DateInput);
Vue.use(DataTable);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(ExpansionPanel);
Vue.use(Form);
Vue.use(Grid);
Vue.use(GridList);
Vue.use(Helpers);
Vue.use(Icon);
Vue.use(List);
Vue.use(LoadMore);
Vue.use(Menu);
Vue.use(Pagination);
Vue.use(Paper);
Vue.use(Picker);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Radio);
Vue.use(Select);
Vue.use(SlidePicker);
Vue.use(Slider);
Vue.use(Snackbar);
Vue.use(Stepper);
Vue.use(SubHeader);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(TextField);
Vue.use(Tooltip);

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Https);
const router = new VueRouter({
    routes
});
document.title = 'Glance';
new Vue({
    render: h => h(App),
    router
}).$mount('#app');
