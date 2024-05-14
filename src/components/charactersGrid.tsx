import { useEffect, useState } from "react";
import { Character, getCharacters, getEndpoints } from "../api";
import getResource from "../api/utils/getResource";
import CharacterModal from "./characterModal";

interface CharactersGridProps {
    data: Character[] | null;
}

export const CharactersGrid = (props: CharactersGridProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState<Character | null>(null);

    const {
        data,
    } = props

    return (
        <div
        className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.map((character) => (
                <div
                key={character.id}
                className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
                    <a className="cursor-pointer" onClick={()=> { setModalData(character); setModalIsOpen(true);}}>
                        <figure>
                            <img src={character.image}
                                className="rounded-t h-72 w-full object-cover" />
                            <figcaption className="p-4">
                                <p
                                    className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300"
                                    x-text="post.title">
                                {character.name}
                                </p>
                                <small
                                    className="leading-5 text-gray-500 dark:text-gray-400"
                                    x-text="post.description">
                                {character.species}
                                </small>
                            </figcaption>
                        </figure>
                    </a>
                </div>
          ))}
        <CharacterModal
        isOpen={modalIsOpen}
        data={modalData}
        onClose={() => setModalIsOpen(false)}
        />
        {/* <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <h1>{modalData?.name}</h1>
            <p>{modalData?.gender}</p> 
            <div>
                <button onClick={() => setModalIsOpen(false)}>X</button>
            </div>
        </Modal> */}
        </div>
      );
    }