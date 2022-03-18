import React, { useEffect } from "react";
import { getAllCertificates } from "features/slices/certificateSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

function Certificates() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const token = useAppSelector(state => state.auth?.accessToken);

  useEffect(() => {
    dispatch(getAllCertificates(token));
  }, []);

  useEffect(() => {
    document.title = "Health Gift | Certificates";
  });

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Certificate Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Awarded by
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Issued on
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Browsing</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.certificates.certificates?.map((certificate, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {certificate.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap max-w-md overflow-x-scroll">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 text-truncate">
                            {certificate.awardedBy}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap max-w-md overflow-x-scroll">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 text-truncate">
                            {certificate.issuedOn}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{certificate.status}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/admin/certificates/${certificate.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Browsing
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificates;
