import "/styles/InputField.css";

export const InputField = ({
  label,
  type,
  onChange,
  placeholder = label,
  iconName,
  inputClassName,
}) => {
  return (
    <div className="inputField">
      <label className="inputLabel">
        <i className={iconName} style={{ color: "gray" }}></i> {label}
      </label>

      <input
        type={type}
        className={`input ${inputClassName}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
