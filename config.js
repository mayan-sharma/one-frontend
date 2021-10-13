import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PROD = publicRuntimeConfig.PROD;
export const API = publicRuntimeConfig.PROD ? publicRuntimeConfig.API_PROD : publicRuntimeConfig.API_DEV;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = publicRuntimeConfig.PROD ? String(publicRuntimeConfig.DOMAIN_PROD) : String(publicRuntimeConfig.DOMAIN_DEV); 
export const DISQUS_NAME = publicRuntimeConfig.DISQUS_NAME;
export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;
export const GOOGLE_ANALYTICS_ID = publicRuntimeConfig.GOOGLE_ANALYTICS_ID;

export const QuillModules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

export const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];