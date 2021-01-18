import React, { useEffect } from 'react';

export default function Selectors({ languages, genders, handleLanguageSelector, handleGenderSelector }) {

  useEffect(() => {
    const genderElem = document.getElementById('select-gender');
    genderElem.disabled = !genders
      ? true : false
  }, [genders]);

  return (
    <div className="row "  >

      <div className="input-field col s12">
        <div >
          <label>Idioma
            <select
              id="select-language"
              className="browser-default"
              onChange={handleLanguageSelector}>

              <option value="" disabled selected>Selecione um idioma</option>
              {languages && languages.map(({ value, label }) => {
                return <option value={value}>{label}</option>
              })}</select>
          </label>
        </div>
      </div>

      <div className="input-field col s12">
        <div >
          <label>Gêneros
            <select
              id="select-gender"
              className="browser-default"
              onChange={handleGenderSelector}>

              <option value="" disabled selected>Selecione um gênero</option>
              {genders && genders.map(({ value, label }) => {
                return <option value={value}>{label}</option>
              })}</select>
          </label>
        </div>
      </div>

    </div>
  );
};