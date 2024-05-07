function Button({ children, version, handleInput, keyData: { id, value } }) {
  return (
    <button
      className={`btn ${version}`}
      id={id}
      onClick={() => handleInput(value)}
    >
      {value}
    </button>
  );
}

export default Button;
