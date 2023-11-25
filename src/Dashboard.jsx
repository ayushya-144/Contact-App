import "./stylesheet/Dashboard.css";
export default function Dashboard() {
  const contacts = [
    { name: "Ayushya", number: "921586231" },
    { name: "Akshat", number: "965234210" },
    { name: "Dhruv", number: "7878424548" },
    { name: "Deven", number: "7567211544" },
    { name: "Jainesh", number: "8735955659" },
    { name: "Puma", number: "9898424548" },
    { name: "Exlix", number: "926846251" },
  ];

  return (
    <div className="main-dashboard">
      <div className="search-section">
        <input
          type="text"
          placeholder="&#128270; Search"
          className="search-bar"
        />
        <input type="button" value="New" className="btn btn-add" />
      </div>
      <div className="display-content">
        <ul>
          {contacts.map((contact) => {
            return (
              <>
                <li>
                  <span>Name : {contact.name}</span>
                  <span>Contacts : {contact.number}</span>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
