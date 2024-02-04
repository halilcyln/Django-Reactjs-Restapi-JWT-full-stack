import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(false)
  const [message, setMessage] = useState("")


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token");
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/cardscomment/${id}/`);
        setComments(response.data);
      } catch (error) {
        console.error("Yorumları çekme hatası:", error);
      }
    };
    fetchComments()
    const token = localStorage.getItem("token");
    if (token) {
      setToken(true)
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      setUsername(username);
        }
    else{
      setMessage(alert("Yorum yapabilmek için giriş yapmanız gerekmektedir."))
    }
 
    try {
      // Yorumu göndermek için POST isteği yap
      await axios.post(
        `http://127.0.0.1:8000/users/cardscomment/${id}/`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      // Yorumları güncelle
      // fetchComments();
  
      // Yorum girişini sıfırla
      setNewComment('');
    } catch (error) {
      console.error("Yorum gönderme hatası:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/cards/${id}/`);
        setCard(response.data);
       
      } catch (error) {
        console.error("Veri çekme hatası:", error);

      }
     
    
    };
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/cardscomment/${id}/`);
        setComments(response.data);
      } catch (error) {
        console.error("Yorumları çekme hatası:", error);
      }
    };

 
    fetchComments()
    fetchData();
    
    
  },);
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  

  



  return (
    <div className=' justify-center items-center  ' >
      {card && (
        <div className="flex justify-center items-center">
        <div className="w-96">
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="w-full rounded-t-lg h-48" src={`http://127.0.0.1:8000${card.image}`} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{card.text}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      )}

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <form className="mb-6" onSubmit={handleCommentSubmit}>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Yorum Sayısı ({comments.length})
            </h2>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                rows="6"
                value={newComment}
                onChange={handleCommentChange}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Yorumunuzu buraya yazın..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Gönder
            </button>
          </form>

          { comments.map((comment, index) => (

<article key={index} className="p-6 text-base border mt-2 h-22 bg-slate-800 rounded-lg dark:bg-gray-900">
<div className="flex justify-between">
  <p className="font-normal text-white">{comment.comment}</p>
  <p className="font-normal text-white fs-4 mt-0">{username}</p>
</div>
</article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CardDetail;
