import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Spinner } from "../components/Spinner";

export const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // fetch book data
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        const book = response.data.data || response.data;

        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setLoading(false);
      });
  }, [id]);

  // update book
  const handleEditBook = (e) => {
    e.preventDefault();

    const data = {
      title,
      author,
      publishYear: Number(publishYear),
    };

    setLoading(true);

    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/" />

      <h1 className="text-3xl my-8 font-semibold">Edit Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleEditBook}
          className="flex flex-col gap-y-4 border-2 border-sky-400 rounded-xl w-full max-w-md p-6 shadow-md"
        >
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="number"
            placeholder="Publish Year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            className="bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition"
          >
            Update Book
          </button>
        </form>
      )}
    </div>
  );
};