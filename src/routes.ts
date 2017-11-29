import HomePage from './components/home/homePage';
import Home from 'material-ui/svg-icons/action/home';

import PartnerConfigPage from './components/partner-config/partnerConfig';
import PartnerConfig from 'material-ui/svg-icons/action/swap-horiz';

import BusinessRulesPage from './components/business-rules/businessRules';
import BusinessGroup from 'material-ui/svg-icons/social/group';

import LogInPage from './components/auth/login';
import LogInSuccessPage from './components/auth/loginSuccess';

const routes = [{
    path: '/',
    component: HomePage,
    title: 'Home',
    id: 'home-page',
    exact: true,
    icon: Home
}, {
    path: '/login',
    component: LogInPage,
    title: '',
    id: 'login-page',
    exact: true,
    icon: null,
    noSideBar: true
}, {
    path: '/loginsuccess',
    component: LogInSuccessPage,
    title: '',
    id: 'login-success',
    exact: true,
    icon: null,
    noSideBar: true
}, {
    path: '/partnerconfig',
    component: PartnerConfigPage,
    title: 'Partner Config',
    id: 'partner-config',
    icon: PartnerConfig
}, {
    path: '/businessrules',
    component: BusinessRulesPage,
    title: 'Business Rules',
    id: 'business-rules',
    icon: BusinessGroup
}];

export default routes;
