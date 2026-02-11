import { useEffect, useState } from "react";
import { fetchCoffees, createCoffee } from "./utils/apis";
import { useNavigate } from "react-router-dom";
import "./App.css";
import reactImg from "./assets/react.svg";

const Home = () => {
  const [coffees, setCoffees] = useState([]);
  const [coffeeId, setCoffeeId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoffees().then(data => setCoffees(data.Items || []));
  }, []);

  const handleAddCoffee = async () => {
    if (!coffeeId || !name || !price) {
      alert("Please fill all fields");
      return;
    }
    const newCoffee = { coffeeId, name, price: Number(price), available };
    await createCoffee(newCoffee);
    setCoffees([...coffees, newCoffee]);
    setCoffeeId("");
    setName("");
    setPrice("");
    setAvailable(false);
  };

  return (
    <div className="container">
      <header className="pageHeader">
        <div>
          <h1>Coffee List</h1>
          <p className="subtitle">Create and manage items stored in DynamoDB.</p>
        </div>
      </header>

      <section className="panel">
        <div className="panelTitle">Add coffee</div>
        <div className="add-coffee-form">
          <input
            className="styled-input"
            type="text"
            placeholder="Coffee ID"
            value={coffeeId}
            onChange={(e) => setCoffeeId(e.target.value)}
          />
          <input
            className="styled-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="styled-input"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="checkRow">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Available
          </label>

          <div className="formActions" style={{ gridColumn: "1 / -1" }}>
            <button className="btn btnPrimary" onClick={handleAddCoffee}>
              Add Coffee
            </button>
          </div>
        </div>
      </section>

      <div className="coffee-list">
        {coffees.map(coffee => (
          <div
            key={coffee.coffeeId}
            className="coffee-card"
            onClick={() => navigate(`/details/${coffee.coffeeId}`)}
          >
            <h3>{coffee.name}</h3>
            <img src={reactImg} alt="React Logo" />
            <div className="metaRow">
              <span>Price: ${coffee.price}</span>
              <span className={`pill ${coffee.available ? "pillOk" : "pillNo"}`}>
                {coffee.available ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;