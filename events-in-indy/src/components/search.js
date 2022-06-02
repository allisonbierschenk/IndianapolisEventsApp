const Search = (props) => {
  return (
    <form onSubmit={(e) => props.onSubmit(e)}>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e)}
        name="Search"
        placeholder="Search a venue..."
        type="text"
        autoFocus
      />
    </form>
  );
};
export default Search;
