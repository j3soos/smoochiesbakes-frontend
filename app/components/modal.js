import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children, header, closeModal }) {
    return (
        <div className="bg-gray-400 bg-opacity-60  fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 h-fit w-[60vh]">
                <div className="flex flex-row text-xl font-bold mb-4">
                    <div className="basis-4/5">
                        {header}
                    </div>
                    <div className="basis-1/5 flex justify-end">
                        <button className="btn-xs rounded-md bg-opacity-40 bg-slate-300 text-base" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}