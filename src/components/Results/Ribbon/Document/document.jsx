import React from "react";

import "./document.css";

const Document = ({ index, item }) => {
  const unmarkup = (content) => {
    return content.replace(/<[^>]+>?/g, "").replace(/&lt;[^]*?&gt;/g, "\n");
  };

  const handleReadInSource = (e) => {
    alert(`Переход по ссылке ${item.url}`);
  };

  const hashTag = item.isTechNews
    ? "Технические новости"
    : item.isAnnouncement
    ? "Анонсы и события"
    : "Сводки новостей";

  return (
    <div key={index} className="document-wrap">
      <div className="document-info">
        <span>{item.issueDate}</span>
        <a href={item.url} className="article-source" target="_blank">
          {item.sourceName}
        </a>
      </div>
      <h3 className="document-title">{item.title}</h3>
      <div className="document-tag">{hashTag}</div>
      <div
        alt="illustration"
        className="document-illustration"
        style={{
          backgroundImage: `url(/images/${item.illustration})`,
        }}
      ></div>
      <p className="document-content">{unmarkup(item.content)}</p>
      <div className="document-footer">
        <button onClick={handleReadInSource}>Читать в источнике</button>
        <span>{item.wordCount} слова</span>
      </div>
    </div>
  );
};

export default Document;
