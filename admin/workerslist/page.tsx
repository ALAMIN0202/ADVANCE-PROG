import axios from 'axios';

export default async function Home() {
  let content = null;

  try {
    const response = await axios.get("http://localhost:3000/admin/allworkers");
    const jsonData = response.data;
    console.log("Received data:", jsonData);

    if (Array.isArray(jsonData) && jsonData.length > 0) {
      content = (
        <div className="mt-4 bg-sky-blue-200 p-4 rounded-lg">
          {jsonData.map((workers, index) => (
            <div key={index} className="border p-4 mb-4">
              <b>ID:</b> {workers.id} <br />
              <b>First Name:</b> {workers.fastname} <br />
              <b>Last Name:</b> {workers.lastname} <br />
              <b>Email:</b> {workers.email} <br />
              <b>Contact:</b> {workers.contact} <br /><br/>
            </div>
          ))}
        </div>
      );
    } else {
      content = <b className="mt-4 bg-sky-blue-200 p-4 rounded-lg">No data available</b>;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    content = <b className="mt-4 bg-sky-blue-200 p-4 rounded-lg">Error fetching data</b>;
  }

  return <>{content}</>;
}
