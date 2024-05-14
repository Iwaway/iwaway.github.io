import React, { useEffect, useState } from 'react';
import './App.css';
import { CharactersGrid } from './components/charactersGrid';
import { getCharacter, getCharacters, getCharactersByCustomQuery } from './api/character';
import { Character } from './api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SortDirection, sortData } from './utils/sortData';

const MAX_POST_PAGE = 42;

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [maxPages, setMaxPages] = useState(MAX_POST_PAGE);
  const [filterType, setFilterType] = useState("");
  const [sort, setSort] = useState(true);
  const [isSubmited, setSubmited] = useState(false);
  const [filterText, setFilterText] = useState("");

  const getCharactersList = async () => {
    const data = await getCharactersByCustomQuery(((filterType === "all") || (filterText === "")) ? `?page=${currentPage}` : `?${filterType}=${filterText}&page=${currentPage}`);
    console.log(data.data.results)
    setMaxPages(data.data.info?.pages || MAX_POST_PAGE);
    setSubmited(false);
    setCharacters(data.data.results || null);
    return data.data.results!;
  };

  const { isLoading, data } = useQuery<Character[]>({
    queryKey: ["characters", currentPage, isSubmited],
    queryFn: getCharactersList,
  });

  useEffect(() => {
    if (data) {
       setCharacters(data);
    }
 }, [data])

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmited(true);
  };

  function onClickSort() {
    const sortedData = sortData(data || [], sort);
    setCharacters(sortedData);
    setSort(!sort);
    console.log(characters);
    console.log('sorted');
  }

  return(
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold text-center bg-slate-600 text-white pt-5'>Dashboard</h1>
        <div className='items-center justify-center w-full'>
          <form className="py-5 flex flex-col md:flex-row gap-3 justify-center bg-slate-600" onSubmit={onSubmit}>
              <div className="flex w-1/2">
                  <input onChange={e => setFilterText(e.target.value)} value={filterText} type="text" placeholder="Search for the tool you like"
                      className="flex-1 px-3 h-10 rounded-l border-2 dark:border-gray-900"
                      />
                  <button type="submit" className="dark:bg-gray-900 hover:dark:bg-gray-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
              </div>
              <select id="filterType" name="filterType" onChange={e => setFilterType(e.target.value)} value={filterType}
                  className="w-1/8 h-10 border-2 dark:border-gray-900 dark:text-gray-900 rounded px-2 md:px-3 md:py-1 tracking-wider">
                  <option value="all" defaultValue={"all"}>All</option>
                  <option value="name">Name</option>
                  <option value="species">Species</option>
                  <option value="status">Status</option>
                  <option value="gender">Gender</option>
              </select>
              <button onClick={onClickSort} type='button' className='w-1/8 bg-white h-10 border-2 dark:border-gray-900 dark:text-gray-900 rounded px-2 md:px-3 md:py-1 tracking-wider'>
                Sort
              </button>
          </form>
        </div>
        <section className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
          {characters != undefined
          ? <CharactersGrid data={characters} />
          : <div className='h-screen text-center'><p className='h-full text-white'>No such data</p></div>
          }
        </section>
        <div className="w-screen flex justify-around items-center bg-slate-600">
          <button
            className="border bg-slate-400 hover:bg-slate-600 text-white rounded-md w-24 h-12"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <p className="font-semibold text-white">Page {currentPage}</p>
          <button
            className="border bg-slate-400 hover:bg-slate-600 text-white rounded-md w-24 h-12"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= maxPages}
          >
            Next
          </button>
        </div>
      </div>
  )
};
