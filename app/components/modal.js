import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children, header, closeModal }) {
  return (
    <div className="modalContainer">
      <div style={{backgroundColor: "white",borderRadius: 10,width: "60vh",height: "auto",margin: "auto", padding: "32px"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "1rem",}}>
          <div style={{ flexBasis: "80%", fontWeight:'bold' }}>
            {header}
          </div>
          <div style={{ display:"flex", flexBasis: "20%", placeContent:"end", justifyContent: "end" }}>
            <button style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "rgba(0, 0, 0, 0.1)", fontSize: "1rem" }}
              onClick={closeModal}
            ><FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
