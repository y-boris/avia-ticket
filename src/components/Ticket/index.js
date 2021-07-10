import numeral from "numeral";
import moment from "moment";
import "numeral/locales/ru";
import "moment/locale/ru";
import { getNoun } from "../../util";
import MyLoader from "../MyLoader";

function Ticket({ sortTickets, ...props }) {
  return (
    <section className="container__ticket">
      {props.isloading
        ?
          <>
            <MyLoader viewBox="0 0 500 195" />
            <MyLoader viewBox="0 0 500 195" />
            <MyLoader viewBox="0 0 500 195" />
            <MyLoader viewBox="0 0 500 195" />
            <MyLoader viewBox="0 0 500 195" />
          </>
        :
          sortTickets.map((ticket) => (
            <div className="ticket__item block-background" key={ticket.segments[0].date + ticket.segments[1].date}>
              <div className="ticket__item_header">
                <span className="ticket__item_price">
                  {numeral(ticket.price).format('0,0 $').replace("руб.","₽")}
                </span>
                <img className="ticket__item_logo" src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} />
              </div>
              {ticket.segments.map((segment) => (
                <div className="ticket__item_info" key={segment.date}>
                  <div className="ticket__item_info-city">
                    <strong className="ticket__item_info-title">{`${segment.origin} – ${segment.destination}`}</strong>
                    {moment(segment.date).format("HH:mm") + " – " + moment(segment.date).add(segment.duration, "minutes").format("HH:mm")}
                  </div>
                  <div className="ticket__item_info-time">
                    <strong className="ticket__item_info-title">В пути</strong>
                    {moment().add(segment.duration, "minutes").format("HHч mmм")}
                  </div>
                  <div className="ticket__item_info-transfer">
                    <strong className="ticket__item_info-title">{segment.stops.length > 0 && segment.stops.length} {getNoun(segment.stops.length, ["пересадка", "пересадки", "Без пересадок"])}</strong>
                    {segment.stops.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          )
        )
      }
    </section>
  )
}

export default Ticket;