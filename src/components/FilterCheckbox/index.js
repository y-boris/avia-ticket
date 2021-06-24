function FilterCheckbox({ name, checked, ...props }) {
  return (
    <label>
      <input
        type="checkbox"
        className="countTransfers_checkbox visually-hidden"
        onChange={props.onChange}
        checked={checked}
      />
      <span className="checker" />
      <span className="countTransfers_name">
        {name}
      </span>
    </label>
  )
}

export default FilterCheckbox;


// function SwitcherButton({ title, active, ...props }) {
//   return (
//     <button
//       onClick={props.onClick}
//       className={`button switcher__route_item ${active && "switcher__route_item-active"}`}
//     >
//       {title}
//     </button>
//   )
// }

// export default SwitcherButton;