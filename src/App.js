import { useState, useEffect } from "react";
import Header from "./components/Header";
import numeral from "numeral";
import "numeral/locales/ru";
import moment from "moment";
import "moment/locale/ru";

numeral.locale("ru");

function App() {
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);
  const [sortTickets, setSortTickets] = useState([]);

  useEffect(() => {
    if (stop === true) {
      setSortTickets(tickets.slice(0,3))
    }
  }, [tickets, stop])

  useEffect(() => {
    fetch("https://front-test.beta.aviasales.ru/search")
      .then((res) => res.json())
      .then((res) => setSearchId(res.searchId))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (searchId && stop === false) {
      function ticketsArray() {
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        .then((data) => {
          if (data.status === 500) {
            ticketsArray();
          } else {
            return data.json();
          }
        })
        .then((ticketsPart) => {
          if (ticketsPart.stop) {
            setStop(true);
          }
          setTickets([...tickets, ...ticketsPart.tickets]);
        })
        .catch((e) => {
          console.log(e);
        });
      }
      ticketsArray();
    }
  }, [searchId, tickets, stop]);

  return (
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

            {sortTickets.map((ticket) => (
              <div className="ticket__item block-background" key={ticket.segments[0].date + ticket.segments[1].date}>
                <div className="ticket__item_header">
                  <span className="ticket__item_price">
                    {numeral(ticket.price).format('0,0 $').replace("руб.","₽")}
                  </span>
                  <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} className="ticket__item_logo" />
                </div>
                {ticket.segments.map((segment) => (
                  <div className="ticket__item_info" key={segment.date}>
                    <div className="ticket__item_info-city">
                      <strong>{`${segment.origin} – ${segment.destination}`}</strong>
                      {moment(segment.date).format("HH:mm")} – {moment(segment.date).add(segment.duration, "minutes").format("HH:mm")}

                    </div>
                    <div className="ticket__item_info-time">
                      <strong>В пути</strong>
                      {moment(segment.duration).format("HHч mmм")}
                    </div>
                    <div className="ticket__item_info-transfer">
                      {segment.stops.length && segment.stops.length > 1 ? <strong>{segment.stops.length}</strong> : <strong>Без пересадок</strong>}
                      {segment.stops.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            ))}

          </section>

          <button className="button button__showmoreticket block-background">
            Показать еще 5 билетов!
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;