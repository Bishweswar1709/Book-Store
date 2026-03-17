import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";

export const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        // works for both response formats
        setBook(response.data.data || response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return (
      <div className="p-4">
        <BackButton destination="/" />
        <h1 className="text-2xl text-red-600">Book not found</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <BackButton destination="/" />

      <h1 className="text-3xl my-8 font-semibold">Book Details</h1>

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-6 gap-y-3 shadow-md">

        <div>
          <span className="font-semibold text-gray-600">ID: </span>
          {book._id}
        </div>

        <div>
          <span className="font-semibold text-gray-600">Title: </span>
          {book.title}
        </div>

        <div>
          <span className="font-semibold text-gray-600">Author: </span>
          {book.author}
        </div>

        <div>
          <span className="font-semibold text-gray-600">Publish Year: </span>
          {book.publishYear}
        </div>

        <div>
          <span className="font-semibold text-gray-600">Created Time: </span>
          {new Date(book.createdAt).toLocaleString()}
        </div>

        <div>
          <span className="font-semibold text-gray-600">Last Updated Time: </span>
          {new Date(book.updatedAt).toLocaleString()}
        </div>

      </div>
    </div>
  );
};