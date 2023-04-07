const SearchBar = ({ searchText, handleOnChange }) => {
  return (
    <div>
      <form>
        <fieldset>
          <legend>Countries Search</legend>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            name="search-bar"
            placeholder="Search..."
            value={searchText}
            onChange={(event) =>
              handleOnChange({ searchInput: event.target.value })
            }
          ></input>
        </fieldset>
      </form>
    </div>
  );
};
export default SearchBar;
