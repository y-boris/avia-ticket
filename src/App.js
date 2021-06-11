import Header from './components/Header';

function App() {
  return (
    <>
      <div className="container__wrapper">
        <Header />

        <main className="container">
          <aside className="sidebar__left">
            <div className="filter_countTransfers block-background">
              <h3>Количество пересадок</h3>
              <form>
                <label>
                  <input type="checkbox" className="countTransfers_checkbox visually-hidden" />
                  <span className="checker" />
                  <span className="countTransfers_name">
                    Все
                  </span>
                </label>
                <label>
                  <input type="checkbox" className="countTransfers_checkbox visually-hidden" />
                  <span className="checker" />
                  <span className="countTransfers_name">
                    Без пересадок
                  </span>
                </label>
                <label>
                  <input type="checkbox" className="countTransfers_checkbox visually-hidden" />
                  <span className="checker" />
                  <span className="countTransfers_name">
                    1 пересадка
                  </span>
                </label>
                <label>
                  <input type="checkbox" className="countTransfers_checkbox visually-hidden" />
                  <span className="checker" />
                  <span className="countTransfers_name">
                    2 пересадки
                  </span>
                </label>
                <label>
                  <input type="checkbox" className="countTransfers_checkbox visually-hidden" />
                  <span className="checker" />
                  <span className="countTransfers_name">
                    3 пересадки
                  </span>
                </label>
              </form>
            </div>
          </aside>

          <section className="container__main">
            <div className="switcher__route">
              <button className="button switcher__route_item switcher__route_item-active">
                Самый дешевый
              </button>
              <button className="button switcher__route_item">
                Самый быстрый
              </button>
              <button className="button switcher__route_item">
                Оптимальный
              </button>
            </div>

            <section className="container__ticket">
              <div className="ticket__item block-background">
                <div className="ticket__item_header">
                  <span className="ticket__item_price">
                    13 400 ₽
                  </span>
                  <img src="./images/s7.png" alt="" class="ticket__item_logo" />
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
              </div>

              <div className="ticket__item block-background">
                <div className="ticket__item_header">
                  <span className="ticket__item_price">
                    13 400 ₽
                  </span>
                  <img src="./images/s7.png" alt="" class="ticket__item_logo" />
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
              </div>

              <div className="ticket__item block-background">
                <div className="ticket__item_header">
                  <span className="ticket__item_price">
                    13 400 ₽
                  </span>
                  <img src="./images/s7.png" alt="" class="ticket__item_logo" />
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
              </div>

              <div className="ticket__item block-background">
                <div className="ticket__item_header">
                  <span className="ticket__item_price">
                    13 400 ₽
                  </span>
                  <img src="./images/s7.png" alt="" class="ticket__item_logo" />
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
                <div className="ticket__item_info">
                  <div className="ticket__item_info-city">
                    <strong>MOW – HKT</strong>
                    10:45 – 08:00
                  </div>
                  <div className="ticket__item_info-time">
                    <strong>В пути</strong>
                    21ч 15м
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong>2 пересадки</strong>
                    HKG, JNB
                  </div>
                </div>
              </div>

            </section>

            <button class="button button__showmoreticket block-background">
              Показать еще 5 билетов!
            </button>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;