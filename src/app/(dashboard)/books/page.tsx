"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors: string[];
    publishedDate: string;
    description?: string;
    imageLinks?: {
      extraLarge?: string;
      large?: string;
      medium?: string;
      small?: string;
      thumbnail?: string;
      smallThumbnail?: string;
    };
    categories?: string[];
    pageCount?: number;
    ratingsCount?: number;
  };
}
interface GoogleBooksResponse {
  items: Book[];
  totalItems: number;
  kind: string;
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [itemsSize, setItemsSize] = useState(-1);
  const [trigger, setTrigger] = useState(true);
  const [books, setBooks] = useState<GoogleBooksResponse | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}+subject:&key=AIzaSyCSP2MzFaX2VUT3Eeosn6nlMZJ86e4D7Uo`
      )
      .then((res) => {
        console.log(res.data);

        setItemsSize(res.data.totalItems);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [trigger]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}+subject:&key=AIzaSyCSP2MzFaX2VUT3Eeosn6nlMZJ86e4D7Uo
        &startIndex=${(currentPage - 1) * 10}`
      )
      .then((res) => {
        console.log(res.data);

        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage, trigger]);
  console.log(books);

  if (loading) return <Loader />;

  return (
    books && (
      <div>
        <h1 className="text-center text-2xl">Find Books</h1>

        <div className="flex items-center justify-center gap-5 mt-10">
          <input
            type="text"
            className="w-4/12 px-4 py-2 rounded-xl outline-none text-black"
            placeholder="Book Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            className="  rounded-lg bg-purple shadow-sm shadow-purple-500/50 hover:shadow-lg hover:shadow-purple-500/80 hover:scale-105  px-4 py-2"
            onClick={(e) => {
              // setCurrentPage(1);
              setTrigger(!trigger);
            }}
          >
            Search
          </button>
        </div>
        <div className="books grid grid-cols-2 my-10">
          {books.items
            ? books?.items.map((book) => {
                return (
                  <div
                    key={book.id}
                    className="book-card p-5 gap-10 flex items-start "
                  >
                    <div className="w-32 h-40">
                      <img
                        src={
                          book.volumeInfo.imageLinks != undefined
                            ? book.volumeInfo.imageLinks.thumbnail
                            : "/imgs/No_Image_Available.jpg"
                        }
                        alt={book.volumeInfo.title}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="w-3/4">
                      <h2 className="text-base">{book.volumeInfo.title}</h2>
                      <p className="text-label text-sm">
                        Written by:{" "}
                        {book.volumeInfo.authors != undefined
                          ? book.volumeInfo.authors.map(
                              (author) => `${author}, `
                            )
                          : ""}
                      </p>
                      <p className="text-label text-sm">
                        Published: {book.volumeInfo.publishedDate}
                      </p>
                      <p className="text-label text-sm">
                        Page Count: {book.volumeInfo.pageCount}
                      </p>
                    </div>
                  </div>
                );
              })
            : "No Books FOnds"}
        </div>
        <div>
          <Pagination
            items={itemsSize != -1 ? itemsSize : 0}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    )
  );
}
