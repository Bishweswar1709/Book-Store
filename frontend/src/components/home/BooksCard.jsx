import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

export const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {books?.map((book) => (
        <div
          key={book._id}
          className="border-2 border-sky-400 rounded-xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >

          {/* Top section */}
          <div className="flex justify-between items-center mb-3">

            <span className="text-gray-500 text-sm">
              ID: {book._id}
            </span>

            <span className="text-lg font-semibold text-sky-700">
              {book.publishYear}
            </span>

          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2">
            {book.title}
          </h2>

          {/* Author */}
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className="text-green-700 text-2xl hover:scale-110 transition" />
            </Link>

            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="text-blue-700 text-2xl hover:scale-110 transition" />
            </Link>

            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="text-red-700 text-2xl hover:scale-110 transition" />
            </Link>
          </div>

        </div>
      ))}
    </div>
  );
};