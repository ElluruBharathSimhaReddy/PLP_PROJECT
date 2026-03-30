import React from "react";

function Filters({ selectedCategories, onChange }) {
  const categories = [
    "electronics",
    "men's clothing",
    "jewelery",
    "women's clothing",
  ];

  return (
    <div>
      <h2 className="filter-title">Filters</h2>

      {categories.map((category) => (
        <div key={category} className="filter-item">
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onChange(category)}
            />{" "}
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Filters;