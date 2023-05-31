import React, { useState } from "react";

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-3xl gap-4">
      <input
        placeholder="Search movies..."
        className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:border-green-500 focus:outline-none"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400"
      >
        Search
      </button>
    </form>
  );
}
