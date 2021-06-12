function SwitcherButton({ title, active, ...props }) {
  return (
    <button
      onClick={props.onClick}
      className={`button switcher__route_item ${active && "switcher__route_item-active"}`}
    >
      {title}
    </button>
  )
}

export default SwitcherButton;