import React from 'react';
import Select from 'react-select';
import '../Style.css'

export default function Selectors({ languages, genders, handleLanguageSelector, handleGenderSelector }) {

  return (
    <div className="selectors-container">
      <div className="select-item">

        <Select options={languages} onChange={handleLanguageSelector} styles={customStyles}>Idioma</Select>
      </div>

      <div className="select-item">
        <Select options={genders} onChange={handleGenderSelector} styles={customStyles}>Gênero</Select>

      </div>
    </div>
  );
};

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '200px',
    color: 'blue',
    padding: 10,
  })
};
