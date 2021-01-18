import React from 'react';
import Inputs from './Inputs';
import Selectors from './Selectors';

export default function Form(
  { languages,
    genders,
    handleLanguageSelector,
    handleGenderSelector,
    number,
    handleChangeInput,
    textNumber,
    placeholder
  }
) {

  return (
    <div className="row">
      <form className="row">

        <div className="col s12 m4 l3">
          <Selectors
            languages={languages}
            genders={genders}
            handleLanguageSelector={handleLanguageSelector}
            handleGenderSelector={handleGenderSelector} />
        </div>

        <div className="col s12 m8 l9">
          <Inputs
            number={number}
            handleChangeInput={handleChangeInput}
            placeholder={placeholder}
            textNumber={textNumber} />
        </div>

      </form >
    </div>
  );
};