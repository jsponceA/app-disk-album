import { useEffect, useState } from "react";
import CardDisk from "./components/CardDisk";
import axios from "./assets/plugins/axios";
import Loader from "./components/Loader";

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataAlbuns = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("albums");

      let dataStorage =
        JSON.parse(window.localStorage.getItem("dataAlbums")) || [];

      const finalData = response.data.map((album) => {
        const itemAlbum = dataStorage.find((val) => val.id === album.id);
        if (itemAlbum) {
          return {
            ...album,
            stock: album.stock - itemAlbum.qty,
          };
        } else {
          return album;
        }
      });

      setAlbums(finalData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickBuy = (id, currentStock) => {
    let qtyInput = window.prompt(
      `Por favor ingrese una cantidad que desee comprar: \n (Stock disponible: ${currentStock})`
    );
    if (qtyInput) {
      let qty = Number(qtyInput);

      if (!qty || qty <= 0) {
        window.alert(
          "Debe ingresar una cantidad numerica y mayor o igual a 1 "
        );
        return;
      }

      if (qty > currentStock) {
        window.alert(
          `La cantidad ingresas de (${qty}) \n Supera al stock disponible (${currentStock})`
        );
        return;
      }

      addItemStorage(id, qty);
    }
  };

  const addItemStorage = async (id, qty) => {
    let dataStorage =
      JSON.parse(window.localStorage.getItem("dataAlbums")) || [];
    const itemIndex = dataStorage.findIndex((item) => item.id === id);
    if (itemIndex >= 0) {
      dataStorage[itemIndex].qty += qty;
    } else {
      dataStorage.push({ id: id, qty: qty });
    }

    window.localStorage.setItem("dataAlbums", JSON.stringify(dataStorage));
    await fetchDataAlbuns();
  };

  useEffect(() => {
    fetchDataAlbuns();
  }, []);

  return (
    <>
      <h1 className="main-title">🤘 DISK STORE 🤘</h1>
      <div className="container">
        {albums.map((obj) => (
          <CardDisk data={obj} handleClickBuy={handleClickBuy} key={obj.id} />
        ))}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default App;
