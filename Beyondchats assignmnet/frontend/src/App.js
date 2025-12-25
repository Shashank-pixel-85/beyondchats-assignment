
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [articles,setArticles] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8000/api/articles')
      .then(res=>setArticles(res.data));
  },[]);

  return (
    <div style={{padding:20}}>
      <h1>BeyondChats Articles</h1>
      {articles.map(a=>(
        <div key={a.id} style={{marginBottom:20}}>
          <h3>{a.title}</h3>
          <small>{a.is_generated ? 'AI Updated' : 'Original'}</small>
          <p>{a.content.slice(0,150)}...</p>
        </div>
      ))}
    </div>
  );
}

export default App;
