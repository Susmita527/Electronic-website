import React, { useState } from "react";
import "../src/Styles/filter.css";

function Filter({ FilterChange, products }) {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const priceRanges = [
    { label: "0 - 10,000", min: 0, max: 10000 },
    { label: "10,000 - 20,000", min: 10000, max: 20000 },
    { label: "20,000 - 30,000", min: 20000, max: 30000 },
    { label: "30,000 - 50,000", min: 30000, max: 50000 },
    { label: "50,000 & Above", min: 50000, max: Infinity },
  ];


  const brands = ["Apple", "Samsung", "Croma", "LG", "Dell","Symphony"];


  const handlePriceFilterChange = (price) => {
    let updatedRanges = [...selectedRanges];
    if (updatedRanges.find(range => range.label === price.label)) {
      // Remove if already selected
      updatedRanges = updatedRanges.filter(range => range.label !== price.label);
    } else {
      
      updatedRanges.push(price); // Add if not selected
    }
    setSelectedRanges(updatedRanges);
    // Pass updated filters to parent
    FilterChange(updatedRanges, selectedBrands);
  };

  
  const handleBrandFilterChange = (brand) => {
    setSelectedBrands(prevBrands => {
      const updatedBrands = prevBrands.includes(brand)
        ? prevBrands.filter(b => b !== brand)
        : [...prevBrands, brand];
      
      FilterChange([...selectedRanges], updatedBrands);
      return updatedBrands;
    });
  };

  return (
    <div className="filter-wrapper">
      <button
        onClick={() => setIsPriceOpen(!isPriceOpen)}
        className={`filter-button price-button ${isPriceOpen ? "active" : ""}`}
      >
        Price ▼
      </button>
      {isPriceOpen && (
        <ul className="filter-dropdown">
          {priceRanges.map((price, index) => (
            <li key={index} className="dropdown-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedRanges.find(range => range.label === price.label)}
                  onChange={() => handlePriceFilterChange(price)}
                />
                {price.label}
              </label>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setIsBrandOpen(!isBrandOpen)}
        className={`filter-button ${isBrandOpen ? "active" : ""}`}
      >
        Brand ▼
      </button>
      {isBrandOpen && (
        <ul className="filter-dropdown">
          {brands.map((brand, index) => (
            <li key={index} className="dropdown-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandFilterChange(brand)}
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filter;
