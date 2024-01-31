import { useEffect, useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const mfVueAppContainer = useRef();

  const injectVueApp = async () => {
    /* Импортируем remote-entry из mf-remote-app, которое содержит Vue приложении */
    await import("mf-remote-app/remote-entry");

    /* Создает custom-element */
    const element = document.createElement("mf-remote-app");
    /* Задаем props для Vue приложения */
    element.setAttribute("react-prop", String(count));

    /* Добавляем custom-element на страницу */
    if (mfVueAppContainer.current)
      mfVueAppContainer.current?.appendChild(element);
  };

  /* Обновление счетчика во Vue приложении */
  useEffect(() => {
    const vueContainer = mfVueAppContainer.current?.childNodes[0];
    if (vueContainer) {
      vueContainer.setAttribute("react-prop", String(count));
    }
  }, [count]);

  const onClearCounter = () => setCount(0);

  /* При монтировании компонента вызываем метод injectVueApp
   * и подписываемся на события от Vue приложения
   */
  useEffect(() => {
    injectVueApp().then(() => {
      console.log("Vue app mounted");
    });

    window.vueEventTarget.addEventListener("clear-counter", onClearCounter);

    /* Отписываемся от события при размонтировании */
    return () => {
      window.vueEventTarget.removeEventListener(
        "clear-counter",
        onClearCounter,
      );
    };
  }, []);

  return (
    <>
      <div className="card card_react-app">
        <h1>Hello!</h1>
        <p>I'm react Host App!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Make counter
        </button>
      </div>
      <div className="card card_vue-app" ref={mfVueAppContainer}></div>
    </>
  );
}

export default App;
