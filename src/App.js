import { useState, useEffect, useCallback } from "react";
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

// !!! TODO: filter & show more tickets !!!

  const allSorter = useCallback((tickets1) => {
    const newTickets = [...tickets1];

    if (switcher === "lowprice") {
      return newTickets.sort((a, b) => a.price - b.price);
    } else if (switcher === "fastest") {
      return newTickets.sort((a, b) => (b.segments[0].duration + b.segments[1].duration) - (a.segments[0].duration + a.segments[1].duration));
    } else {
      return newTickets.sort((a, b) => (a.segments[0].stops.length + a.segments[1].stops.length) - (b.segments[0].stops.length + b.segments[1].stops.length));
    };
  }, [switcher]);

  useEffect(() => {
    if (stop === true) {
      setSortTickets(allSorter(tickets).slice(0,4));
    }
  }, [tickets, stop, switcher, allSorter]);

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
              onClick={() => setSwitcher("lowprice")}
              title="Самый дешевый"
            />
            <SwitcherButton
              active={switcher === "fastest"}
              onClick={() => setSwitcher("fastest")}
              title="Самый быстрый"
            />
            <SwitcherButton
              active={switcher === "optimal"}
              onClick={() => setSwitcher("optimal")}
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