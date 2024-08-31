import React, { useState, useEffect } from 'react';

// Define a type for the table data
type MailData = {
  id: number; // Sr. No
  email: string; // Mails
  status: string; // Delivery Status
  consignmentNo: string; // Consignment Number
  date: Date; // Date of consignment
};

// Define props for the MailTable component
interface MailTableProps {
  data: MailData[]; // Array of MailData
}

// Helper function to format date and time
const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

// The MailTable component
const MailTable: React.FC<MailTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<MailData[]>(data);
  const [filter, setFilter] = useState<string>("all");
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    filterData(filter, searchQuery);
  }, [filter, searchQuery, data]);

  const filterData = (filter: string, searchQuery: string) => {
    const now = new Date();
    let filtered: MailData[] = data;

    // Filter by date range
    switch (filter) {
      case "24hours":
        filtered = filtered.filter(item => now.getTime() - item.date.getTime() <= 24 * 60 * 60 * 1000);
        break;
      case "3days":
        filtered = filtered.filter(item => now.getTime() - item.date.getTime() <= 3 * 24 * 60 * 60 * 1000);
        break;
      case "week":
        filtered = filtered.filter(item => now.getTime() - item.date.getTime() <= 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        filtered = filtered.filter(item => now.getTime() - item.date.getTime() <= 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        break;
    }

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.email.toLowerCase().includes(lowerCaseQuery) ||
        item.consignmentNo.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredData(filtered);
  };

  // Handle the rows per page change
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
  };

  return (
    <div>
      {/* Filter and Search Controls */}
      <div className="flex items-center mb-4">
        {/* Filter Button */}
        <button
          onClick={() => setShowFilterOptions(!showFilterOptions)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filter
        </button>

        {/* Filter Options Dropdown */}
        {showFilterOptions && (
          <div className="ml-2">
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="px-2 py-1 border rounded"
            >
              <option value="all">All</option>
              <option value="24hours">Within 24 hours</option>
              <option value="3days">Within 3 days</option>
              <option value="week">Within a week</option>
              <option value="month">Within a month</option>
            </select>
          </div>
        )}

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by email or consignment no"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-4 px-2 py-1 border rounded"
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Sr. No</th>
            <th className="border border-gray-300 p-2">Mails</th>
            <th className="border border-gray-300 p-2">Delivery Status</th>
            <th className="border border-gray-300 p-2">Consignment No</th>
            <th className="border border-gray-300 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, rowsPerPage).map((row, index) => (
            <tr key={row.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{row.email}</td>
              <td className="border border-gray-300 p-2">{row.status}</td>
              <td className="border border-gray-300 p-2">{row.consignmentNo}</td>
              <td className="border border-gray-300 p-2">{formatDate(row.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rows Per Page Selector */}
      <div className="mt-4 flex justify-end">
        <label className="mr-2">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="px-2 py-1 border rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default MailTable;
