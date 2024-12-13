import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';

function App() {
  const [dataFoods, setDataFoods] = useState([]);

  async function getData() {
    const url = 'https://diligent-vaulted-dingo.glitch.me/foods';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      setDataFoods(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //? handle cart
  const [cart, setCart] = useState([]);

  // function addToCart(food) {
  //   setCart([...cart, food]);
  // }

  function addToCart(food) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
  }

  function updateCart(foodId, action) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === foodId
            ? {
                ...item,
                quantity:
                  action === 'increment'
                    ? item.quantity + 1
                    : item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
  return (
    <>
      {/* Navbar */}
      <div className="container mx-auto px-12 lg:px-24 lg:pb-5">
        <div className="flex justify-center">
          <Navbar cart={cart} updateCart={updateCart} />
        </div>
      </div>
      {/* End Of Navbar */}

      {/* card */}
      <div className="container mx-auto p-10 lg:p-0">
        <div className="flex justify-center">
          <CardItem dataFoods={dataFoods} addToCart={addToCart} />
        </div>
      </div>
      {/* end of card */}
    </>
  );
}

export default App;
