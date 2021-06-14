import numeral from "numeral";
import moment from "moment";
import "numeral/locales/ru";
import "moment/locale/ru";
import { getNoun } from "../../util";
import MyLoader from "../MyLoader";

function Ticket({ sortTickets, ...props }) {
  return (
    <section className="container__ticket">
      {props.isloading ? <MyLoader /> : sortTickets.map((ticket) => (
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
                {moment(segment.date).format("HH:mm") + " – " + moment(segment.date).add(segment.duration, "minutes").format("HH:mm")}
              </div>
              <div className="ticket__item_info-time">
                <strong>В пути</strong>
                {moment(segment.duration).format("HHч mmм")}
              </div>
              <div className="ticket__item_info-transfer">
                <strong>{segment.stops.length > 0 && segment.stops.length} {getNoun(segment.stops.length, "Без пересадок", "пересадка", "пересадки")}</strong>
                {segment.stops.join(", ")}
              </div>
            </div>
          ))}
        </div>
      ))}

    </section>
  )
}

export default Ticket;