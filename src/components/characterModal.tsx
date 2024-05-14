import { Character } from "../api/interfaces";

interface CharacterModalProps {
    data?: Character | null;
    isOpen?: boolean;
    onClose: () => void;
}

export const CharacterModal = (props: CharacterModalProps) => {
    const { data, isOpen, onClose } = props

    return (
        <>
        {isOpen
        ? (
        <div tabIndex={-1} className="flex items-center justify-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full bg-black bg-opacity-75">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {data?.name}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4 items-center">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {data?.gender && (<><small>Gender: {data?.gender}</small><br></br></>)}
                            {data?.origin && (<><small>Origin: {data?.origin.name}</small><br></br></>)}
                            {data?.species && (<><small>Species: {data?.species}</small><br></br></>)}
                            {data?.status && (<><small>Status: {data?.status}</small><br></br></>)}
                            {data?.type && (<><small>Type: {data?.type}</small><br></br></>)}
                            {data?.location && (<><small>Location: {data?.location.name}</small><br></br></>)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        )
        : null };
        </>
    );
}

export default CharacterModal;