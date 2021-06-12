import { useState, useEffect } from "react";
import Header from "./components/Header";
import SwitcherButton from "./components/SwitcherButton";
import Ticket from "./components/Ticket";
import numeral from "numeral";
import "numeral/locales/ru";

numeral.locale("ru");

function App() {
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);
  const [sortTickets, setSortTickets] = useState([]);
  const [switcher, setSwitcher] = useState("lowprice");

// !!! TODO: filter & sorting !!!

  useEffect(() => {
    if (stop === true) {
      setSortTickets(tickets.slice(0,5).sort((a, b) => a.price - b.price))
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
            <SwitcherButton
              active={switcher === "lowprice"}
              onClick={(e) => setSwitcher("lowprice")}
              title="Самый дешевый"
            />
            <SwitcherButton
              active={switcher === "fastest"}
              onClick={(e) => setSwitcher("fastest")}
              title="Самый быстрый"
            />
            <SwitcherButton
              active={switcher === "optimal"}
              onClick={(e) => setSwitcher("optimal")}
              title="Оптимальный"
            />
          </div>

          <Ticket sortTickets={sortTickets} />

          <button className="button button__showmoreticket block-background">
            Показать еще 5 билетов!
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;