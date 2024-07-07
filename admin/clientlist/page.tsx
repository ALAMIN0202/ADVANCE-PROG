import axios from 'axios';

export default async function Home() {
  let content = null;

  try {
    const response = await axios.get("http://localhost:3000/admin/allclients");
    const jsonData = response.data;
    console.log("Received data:", jsonData);

    if (Array.isArray(jsonData)) {
      content = (
        <div className="mt-4">
          {jsonData.map((clients, index) => (
            <div key={index} className="border p-4 mb-4">
              <b>ID:</b> {clients.id} <br />
              <b>First Name:</b> {clients.fastname} <br />
              <b>Last Name:</b> {clients.lastname} <br />
              <b>Email:</b> {clients.email} <br />
              <b>Contact:</b> {clients.contact} <br /><br/>
            </div>
          ))}
        </div>
      );
    } else {
      content = <b className="mt-4">No data available</b>;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    content = <b className="mt-4">Error fetching data</b>;
  }

  return <>{content}</>;
}
