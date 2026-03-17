import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Spinner } from "../components/Spinner";

export const DeleteBook = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen p-4">

      {/* Back button */}
      <BackButton destination="/" />

      {/* Center delete confirmation */}
      <div className="flex justify-center items-center h-[80vh]">

        <div className="flex flex-col items-center gap-y-6 border-2 border-red-400 rounded-xl p-10 shadow-lg">

          <h1 className="text-3xl font-bold text-red-600">
            Delete Book
          </h1>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <p className="text-lg text-gray-600 text-center">
                Are you sure you want to delete this book?
              </p>

              <button
                onClick={handleDeleteBook}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition"
              >
                Yes, Delete it
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};