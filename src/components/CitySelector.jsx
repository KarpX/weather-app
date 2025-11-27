import React, { useState, useMemo } from "react";

function CitySelector({ cities = [], selectedCity, onCityChange }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return cities;
    const q = query.trim().toLowerCase();
    return cities.filter((c) => c.name.toLowerCase().includes(q));
  }, [cities, query]);

  const handlePick = (city) => {
    const payload = typeof city === "string" ? { name: city } : city;
    onCityChange(payload);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    handlePick(value);
  };

  return (
    <div className="city-selector">
      <h2>Выберите город</h2>

      <div className="city-buttons" style={{ marginBottom: 12 }}>
        {cities.map((city, idx) => (
          <button
            key={idx}
            className={`city-button ${
              selectedCity?.name === city.name ? "active" : ""
            }`}
            onClick={() => handlePick(city)}
            type="button"
            style={{ marginRight: 8 }}
          >
            {city.name}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Введите город (нажмите Enter или Поиск)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          aria-label="Поиск города"
          style={{ padding: "8px 10px", minWidth: 220 }}
        />
        <button type="submit" className="btn btn-primary">
          Поиск
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setQuery("");
            setShowSuggestions(false);
          }}
        >
          Очистить
        </button>
      </form>
    </div>
  );
}

export default CitySelector;
