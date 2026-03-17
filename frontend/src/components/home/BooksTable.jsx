import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

export const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {books?.map((book, index) => (
          <tr
            key={book._id}
            className="h-10 hover:bg-sky-50 transition"
          >
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>

            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>

            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-green-800 text-2xl hover:scale-110 transition" />
                </Link>

                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-blue-800 text-2xl hover:scale-110 transition" />
                </Link>

                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-red-800 text-2xl hover:scale-110 transition" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};