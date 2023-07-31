import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enUS from './en_US/index.json';
import zhCN from './zh_CN/index.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            'en-US': {
                translation: enUS,
            },
            'zh-CN': {
                translation: zhCN,
            },
        },
        preload: ['en-US', 'zh-CN'],
        fallbackLng: 'en-US',
        lng: 'en-US',
    });
