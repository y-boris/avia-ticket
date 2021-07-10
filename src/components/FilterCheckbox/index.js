function FilterCheckbox({ name, checked, ...props }) {
  return (
    <label className="countTransfers_label">
      <input
        className="countTransfers_checkbox visually-hidden"
        type="checkbox"
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