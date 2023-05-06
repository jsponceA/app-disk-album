import React from "react";
import PropTypes from "prop-types";
import Music from "../assets/img/error.png";
import OutStock from "../assets/img/out-of-stock.png";

const CardDisk = ({ data, handleClickBuy }) => {
  return (
    <div className="card">
      <img className="img-top" src={data.url || Music} alt="img_album" />

      <p className="title">{data.albumName}</p>

      <ol className="list-songs">
        {data.songs.map((val, index) => (
          <li key={val}>
            {index + 1}. {val}
          </li>
        ))}
      </ol>

      {data.stock > 0 && data.stock <= 5 && (
        <p className="text-legend">ULTIMAS UNIDADES</p>
      )}

      {data.stock > 0 && (
        <button
          onClick={() => handleClickBuy(data.id, data.stock)}
          className="btn-buy"
          type="button"
        >
          <box-icon name="cart-add" animation="tada" /> COMPRAR
        </button>
      )}

      {data.stock <= 0 && (
        <img className="out_stock" src={OutStock} alt="out_stock" />
      )}
    </div>
  );
};

CardDisk.propTypes = {
  data: PropTypes.object.isRequired,
  handleClickBuy: PropTypes.func.isRequired,
};

export default CardDisk;
