
export default function TrackInfoForm() {
  return (
    <div>
      <div>
        <label htmlFor={"artist"}>Artist:</label>
        <input id={"artist"} type="text"/>
      </div>
      <div>
        <label htmlFor={"title"}>Title:</label>
        <input id={"title"} type="text"/>
      </div>
      <div>
        <label htmlFor={"lyrics"}>Lyrics:</label>
        <input id={"lyrics"} type="text"/>
      </div>
    </div>
  );
};