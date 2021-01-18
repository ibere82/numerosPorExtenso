import React from 'react';

export default function Inputs({ number, handleChangeInput, textNumber, placeholder }) {

  const handleCopy = () => {
    document.getElementById("text").select()
    document.execCommand('copy');
  };

  return (
    <div className="row">
      <div className="input-field col s12">

        <label htmlFor="input-number">
          Digite um número inteiro maior que 0
        </label>

        <input id="input-number"
          className="input-number"
          type="number" value={number}
          min="0"
          max="999999999999999999"
          onChange={handleChangeInput}
          autoFocus />
      </div>

      <div className="col s12">
        <div className="row input-field">

          <div className="col s10">
            <textarea
              className="materialize-textarea input-text-number"
              name=""
              id="text"
              readOnly
              value={textNumber}
              placeholder={placeholder}></textarea>
          </div>

          <div className="col s2">
            <i className="material-icons small left icon" onClick={handleCopy}>content_copy</i>
          </div>

        </div>
      </div>

    </div>

  );
};