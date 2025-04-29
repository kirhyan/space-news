import "./App.css";
import { useState, useEffect } from "react";

interface Article {
  url: string;
  title: string;
  summary: string;
  image_url: string;
  published_at: string;
}

function formatFecha(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const userLocale = navigator.language || "en-US";
  return fecha.toLocaleDateString(userLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
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
          const delay = `${key * 0.3}s`;
          return (
            <div
              key={key}
              className="article"
              style={{ animationDelay: delay }}
              onClick={() => {
                window.location.href = val.url;
              }}
            >
              <h3 className="titular">{val.title}</h3>
              <div className="articleContainer">
                <p className="text">{val.summary}</p>
                <img className="image" src={val.image_url} />
              </div>

              <h4>{formatFecha(val.published_at)}</h4>
            </div>
          );
        })}
      </section>
    </div>
  );
}
