import React, {useState, useEffect} from 'react';


function Qgenerator() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetch("http://api.quotable.io/random")
          .then(res => res.json())
          .then(
            (quote) => {
              setQuote(quote.content);  
              setAuthor(quote.author);
            }
          )
      },[]);
    
      let fetchNewQuote = () => {
        fetch("http://api.quotable.io/random")
          .then(res => res.json())
          .then(
            (quote) => {
              setQuote(quote.content);  
              setAuthor(quote.author);
            }
          )
      }

  return (
    <div>
        <br/>
        <h5>Quote of the Day</h5>
        <p>{quote}</p>
        <p>~~{author}</p>
        
        <button className='btn btn-info 'onClick={fetchNewQuote} >New Quote</button>
    </div>
  )
}

export default Qgenerator