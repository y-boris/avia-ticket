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