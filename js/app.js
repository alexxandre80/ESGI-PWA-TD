'use strict';
import page from '/node_modules/page/page.mjs';
import { openDB } from '/node_modules/idb/build/esm/index.js';
import checkConnectivity from './network.js';

(async () => {
  document.offline = false;
  window.addEventListener('beforeinstallprompt', e => {
    console.log('Application is installable');
    e.preventDefault();
    window.installPrompt = e;
  });

  const app = document.querySelector('#app main');

  checkConnectivity({
    interval: 2000
  });
  document.addEventListener('connection-changed', e => {
    let root = document.documentElement;
    document.offline = !e.detail;
    if (e.detail) {
      root.style.setProperty('--app-blue', '#007eef');
    } else {
      root.style.setProperty('--app-blue', '#7D7D7D');
    }
  });
  
  const homeCtn = app.querySelector('[page=home]');
  const readCtn = app.querySelector('[page=read]');

  const pages = [
    homeCtn,
    readCtn
  ];

  
  const database = await openDB('news-feed', 1, {
    upgrade(db) {
      db.createObjectStore('articles');
    }
  });
  
  if (!document.offline) {

  }

  //TODO CHANGE ARTICLES BY CONNECTIVITY

  const data = await database.get('articles', 'articles') || [];

  const skeleton = app.querySelector('.skeleton');
  skeleton.setAttribute('hidden', '');

  page('/', async (ctx) => {
    const module = await import('./view/accueil.js');
    const Home = module.default;

    const docTitle = document.head.querySelector('title');
    document.title = `Home Todo`;
    Home(homeCtn, data);

    pages.forEach(page => page.removeAttribute('active'));
    homeCtn.setAttribute('active', true);
  });

  page('/task/:id', async (ctx) => {
    const module = await import('./view/task.js');
    const Page = module.default;
    const docTitle = document.head.querySelector('title');
    document.title = `Task`;
    Page(homeCtn, ctx.params.id);

    pages.forEach(page => page.removeAttribute('active'));
    homeCtn.setAttribute('active', true);
  });


  page('/delete/:id', async (ctx) => {
    const module = await import('./view/delete.js');
    const Page = module.default;
    const docTitle = document.head.querySelector('title');
    document.title = `Delete Task`;
    Page(homeCtn, ctx.params.id);

    pages.forEach(page => page.removeAttribute('active'));
    homeCtn.setAttribute('active', true);
  });

  page();
})();
