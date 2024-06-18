import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../../shared/api";
import { useAuth } from "../../../hook/useAuth";

import Document from "./Document/document";

import "./ribbon.css";

const Ribbon = ({ ids }) => {
  const { token, signOut, isExpired } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pointer, setPointer] = useState(0);
  const [documents, setDocuments] = useState([]);
  const step = 10;

  const fetchDocuments = async () => {
    const part = ids.slice(pointer, pointer + step);
    console.log("part.length=", part.length);
    console.log(`part[${pointer}..${pointer + step}]:`, part);

    await axios
      .post(
        API_URL + "documents/",
        { ids: part },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `HTTP error while requesting documents! status: ${response.status}`
          );
        }
        console.log("documents.response=", response.data);
        if (Array.isArray(response.data)) {
          const allYouNeed = response.data.map((item, index) => ({
            id: item.ok.id,
            issueDate: new Date(item.ok.issueDate).toLocaleDateString("ru-RU"),
            url: item.ok.url,
            sourceName: item.ok.source.name,
            title: item.ok.title.text,
            content: item.ok.content.markup,
            isTechNews: item.ok.attributes.isTechNews,
            isAnnouncement: item.ok.attributes.isAnnouncement,
            isDigest: item.ok.attributes.isDigest,
            wordCount: item.ok.attributes.wordCount,
            illustration: `./illustration${Math.floor(
              Math.random() * 2 + 1
            )}.svg`,
          }));

          setDocuments((prev) => prev.concat(allYouNeed));
          setPointer((prev) => prev + step);
        }
      })
      .catch((error) => {
        console.error("Ошибка во время выполнения запроса:", error.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDocuments();
  }, [ids.length]);

  return (
    <div className="ribbon">
      <h1>Список документов</h1>
      <div className="ribbon__doc-holder">
        {documents.map((item, index) => (
          <Document index={index} item={item} />
        ))}
      </div>
      <div className="ribbon__button-holder">
        <button onClick={fetchDocuments} disabled={pointer >= ids.length}>
          Показать больше
        </button>
      </div>
    </div>
  );
};

export default Ribbon;
