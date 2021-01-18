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
    placeholder,
    inputLabel
  }
) {

  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div className="row">
      <form className="row" onSubmit={preventDefault}>

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
            inputLabel={inputLabel}
            handleChangeInput={handleChangeInput}
            placeholder={placeholder}
            textNumber={textNumber} />
        </div>

      </form >
    </div>
  );
};