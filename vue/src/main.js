import Vue from "vue";

import App from "./App.vue";

const mfRemoteApp = Vue.extend({
  render: (h) => h(App),
  methods: {
    /* Обработка вызовов в Host приложении через EventTarget */
    callRemoteAppMethod(type, data) {
      try {
        const event = new Event(type, data);
        window.vueEventTarget.dispatchEvent(event);
      } catch (err) {
        console.error(err);
      }
    },
  },
});

/* Создаем пользовательский элемент на странице */
export class MfRemoteApp extends HTMLElement {
  instance = null;

  static get observedAttributes() {
    return ["react-prop"];
  }

  /* Вызывается когда наш веб-компонент будет встроен в DOM */
  connectedCallback() {
    this.instance = new mfRemoteApp({
      /* Пробрасываем переданные Props при помощи
       *  data атрибутов HTML элемента
       *  из React приложение во Vue приложение
       *  через глобальные data свойства
       **/
      data: {
        reactProp: this.getAttribute("react-prop"),
      },
    }).$mount();
    this.appendChild(this.instance.$el);
  }

  /* Вызывается когда атрибуты нашего веб-компонента будут измнены */
  attributeChangedCallback() {
    if (!this.instance) return;
    this.instance.reactProp = this.getAttribute("react-prop");
  }

  /* Вызывается когда наш веб-компонент будет удален из DOM */
  disconnectedCallback() {
    this.instance.$destroy();
    this.removeChild(this.instance.$el);
    this.instance = null;
  }
}

/* Регистрируем пользовательский элемент в CustomElementRegistry с помощью метода define() */
customElements.define("mf-remote-app", MfRemoteApp);
