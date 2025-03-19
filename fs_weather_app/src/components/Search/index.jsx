export default function Search({search, setSearch, handleSearch}) {
    return <div className="search-engine">
        <input className="city-search"
               type="text"
               placeholder="Enter City Name"
               name="search"
               value={search} // we'll be receiving from our parent component as a prop
               onChange={(event) => setSearch(event.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>
}