import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import SwitcherButton from "./components/SwitcherButton";
import FilterCheckbox from "./components/FilterCheckbox"
import Ticket from "./components/Ticket";
import numeral from "numeral";
import "numeral/locales/ru";
import './index.css';

numeral.locale("ru");

function App() {
  const [ticketsItems, setTicketsItems] = useState(5);
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);
  const [sortTickets, setSortTickets] = useState([]);
  const [switcher, setSwitcher] = useState("lowprice");
  const [filter, setFilter] = useState({ transferAll: true, transferNone: true, transferOne: true, transferTwo: true, transferThree: true });
  const [isLoading, setLoading] = useState(true);

  const allSorter = useCallback((ticketsArray1) => {
    const newTickets = [...ticketsArray1];

    if (switcher === "lowprice") {
      return newTickets.sort((a, b) => a.price - b.price);
    } else if (switcher === "fastest") {
      return newTickets.sort((a, b) => (b.segments[0].duration + b.segments[1].duration) - (a.segments[0].duration + a.segments[1].duration));
    } else {
      return newTickets.sort((a, b) => (a.segments[0].stops.length + a.segments[1].stops.length) - (b.segments[0].stops.length + b.segments[1].stops.length));
    };
  }, [switcher]);

  const filterTickets = useCallback((ticketsArray2) => {
    if (
      Object.keys(filter).every((key) => {
        return filter[key] === false;
      })
    ) {
      return ticketsArray2;
    }

    return ticketsArray2.filter((current) => {
      if (filter.transferAll) return current;
      if (filter.transferNone && current.segments[0].stops.length === 0 && current.segments[1].stops.length === 0) return true;
      if (filter.transferOne && current.segments[0].stops.length === 1 && current.segments[1].stops.length === 1) return true;
      if (filter.transferTwo && current.segments[0].stops.length === 2 && current.segments[1].stops.length === 2) return true;
      if (filter.transferThree && current.segments[0].stops.length === 3 && current.segments[1].stops.length === 3) return true;

      return false;
    });
  }, [filter]);

  useEffect(() => {
    if (stop === true) {
      setSortTickets(allSorter(filterTickets(tickets)).slice(0,ticketsItems));
    }

    setLoading(false);
  }, [tickets, stop, switcher, allSorter, filterTickets, ticketsItems]);

  useEffect(() => {
    fetch("https://front-test.beta.aviasales.ru/search")
      .then((res) => res.json())
      .then((res) => setSearchId(res.searchId))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (searchId && stop === false) {
      function ticketsArray() {
        setLoading(true);
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

  const filterHandler = (filters) => {
    let tempFilters = {...filter};
    tempFilters[filters] = !tempFilters[filters];

    if (filters === "transferAll") {
      tempFilters = Object.fromEntries(
        Object.keys(tempFilters).map((current) => {
        return [current, tempFilters[filters]];
      }));
    } else {
      if (Object.keys(tempFilters).some((key) => tempFilters[key] === false)) {
        tempFilters["transferAll"] = false;
      };

      if (
        Object.keys(tempFilters).every((key) => {
          if (key === "transferAll") return true;
          return tempFilters[key] === true;
        })
      ) {
        tempFilters["transferAll"] = true;
      };
    };

    setFilter({ ...tempFilters });
  };

  return (
    <div className="container__wrapper">
      <Header />

      <main className="container">
        <aside className="sidebar__left">
          <div className="filter_countTransfers block-background">
            <h3>Количество пересадок</h3>
            <form>
              <FilterCheckbox
                onChange={() => filterHandler("transferAll")}
                checked={filter.transferAll}
                name="Все"
              />
              <FilterCheckbox
                onChange={() => filterHandler("transferNone")}
                checked={filter.transferNone}
                name="Без пересадок"
              />
              <FilterCheckbox
                onChange={() => filterHandler("transferOne")}
                checked={filter.transferOne}
                name="1 пересадки"
              />
              <FilterCheckbox
                onChange={() => filterHandler("transferTwo")}
                checked={filter.transferTwo}
                name="2 пересадки"
              />
              <FilterCheckbox
                onChange={() => filterHandler("transferThree")}
                checked={filter.transferThree}
                name="3 пересадки"
              />
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

          <Ticket sortTickets={sortTickets} isloading={isLoading} />

          <button
            className="button button__showmoreticket block-background"
            onClick={() => setTicketsItems(ticketsItems + 5)}
          >
            Показать еще 5 билетов!
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;