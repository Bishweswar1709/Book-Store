import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Spinner } from "../components/Spinner";
import toast from "react-hot-toast";

export const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      author,
      publishYear: Number(publishYear),
    };

    setLoading(true);

    axios
        .post("http://localhost:5000/books", data)
        .then(() => {
            setLoading(false);
            toast.success("Book created successfully 📚");
            navigate("/");
        })
        .catch(() => {
            toast.error("Failed to create book");
            setLoading(false);
        });
  };

  return (
    <div className="p-4">
      <BackButton destination="/" />

      <h1 className="text-3xl my-8 font-semibold">Create New Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
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
            Create Book
          </button>
        </form>
      )}
    </div>
  );
};