import "./App.css";
import { useState, useEffect } from "react";

interface Article {
  url: string;
  title: string;
  summary: string;
  image_url: string;
  published_at: string;
}

export default function App() {
  const spaceApiLink = "https://api.spaceflightnewsapi.net/v4/articles/";

  const [newsList, setNewsList] = useState<Article[]>([]);

  useEffect(() => {
    fetch(spaceApiLink)
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data.results);
      });
  }, []);

  return (
    <div className="app">
      <header className="title">
        <h1>Space News</h1>
      </header>
      <section className="newsContainer">
        {newsList.map((val, key) => {
          return (
            <div
              key={key}
              className="article"
              onClick={() => {
                window.location.href = val.url;
              }}
            >
              <h3 className="titular">{val.title}</h3>
              <div className="articleContainer">
                <p className="text">{val.summary}</p>
                <img className="image" src={val.image_url} />
              </div>

              <h4>{val.published_at}</h4>
            </div>
          );
        })}
      </section>
    </div>
  );
}
