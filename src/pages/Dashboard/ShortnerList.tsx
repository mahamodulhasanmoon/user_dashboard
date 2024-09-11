import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { deleteData, getData, postData, updateData } from "../../api/fetching"; // Assuming you have a function for making POST requests

type ShortenerData = {
  _id: string;
  user: string;
  domain: string;
  paymentNumber: string;
  trxID: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function ShortnerList() {
  const { user } = useContext(AuthContext);
  const [shortData, setShortData] = useState<ShortenerData[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [updating, setUpdating] = useState<string | null>(null); // To handle the loading state for approve/reject buttons

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getData(`shortlinks/request`);
        setShortData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, [user._id]);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdating(id); // Set the current updating ID
    try {
      const response:any = await updateData(`shortlinks/request/${id}`, { status });
      if (response?.success) {
        setShortData((prevData) =>
          prevData.map((data) =>
            data._id === id ? { ...data, status } : data
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null); // Reset the updating ID
    }
  };
  const handleDelete = async (id: string) => {
    setUpdating(id); // Set the current updating ID
    try {
      const response:any = await deleteData(`shortlinks/request/${id}`);
      if (response?.success) {
        setShortData((prevData) =>
          prevData.map((data) =>
            data._id === id ? { ...data, status } : data
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null); // Reset the updating ID
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Shortener URLs List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Domain</th>
                <th className="border border-gray-300 px-4 py-2">Payment Number</th>
                <th className="border border-gray-300 px-4 py-2">Transaction Screenshot</th>
                <th className="border border-gray-300 px-4 py-2">Total Price (USD)</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shortData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{data.domain}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.paymentNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={data.trxID} target="_blank" rel="noopener noreferrer">
                      <img src={data.trxID} alt="Transaction Screenshot" className="h-16 w-16 object-cover" />
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{data.totalPrice.toFixed(2)}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      data.status === "approved"
                        ? "text-green-600"
                        : data.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {data.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.status === "pending" ? (
                      <div className="flex ">
                        <button
                          onClick={() => handleUpdateStatus(data._id, "approved")}
                          className="bg-green-500 text-sm text-white bg-success px-2 py-1 rounded mr-2"
                          disabled={updating === data._id} // Disable if currently updating
                        >
                          {updating === data._id ? "Approving..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="bg-green-500 text-sm text-white bg-danger px-2 py-1 rounded mr-2"
                          disabled={updating === data._id} // Disable if currently updating
                        >
                          {updating === data._id ? "deleting..." : "Delete"}
                        </button>
                      </div>
                    ):(
                        <span className="text-success font-bold ">approved</span>
                    )}
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
