import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CardDetail from './CardDetil';

function Card() {
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/cards/");
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="flex flex-wrap mx-4 ">
      {cards.map((card, index) => (
        <div key={index} className="max-w-sm w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/CardDetail/${card.id}`}>
  <img onClick={() => setSelectedCardId(card.id)} className="w-full rounded-t-lg h-48" src={`http://127.0.0.1:8000${card.image}`} alt="" />
</Link>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{card.text}</h5>
              </a>
  
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default Card;
