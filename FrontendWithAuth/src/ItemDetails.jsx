import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoffee, updateCoffee, deleteCoffee } from "./utils/apis";
import reactImg from "./assets/react.svg";

const ItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coffee, setCoffee] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getCoffee(id).then(data => setCoffee(data.Item));
    }, [id]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleUpdate = () => {
        updateCoffee(id, coffee).then(() => toggleEditMode());
    };

    const handleDelete = () => {
        deleteCoffee(id).then(() => navigate("/"));
    };

    if (!coffee) return <p>Loading...</p>;

    return (
        <div className="container">
            <header className="pageHeader">
                <div>
                    <h1>{editMode ? "Edit Coffee" : coffee.name}</h1>
                    <p className="subtitle">View, edit, or delete this item.</p>
                </div>
            </header>

            <section className="panel detailsCard">
                {editMode ? (
                    <>
                        <input
                            className="styled-input"
                            value={coffee.coffeeId}
                            onChange={e => setCoffee({ ...coffee, coffeeId: e.target.value })}
                        />
                        <input
                            className="styled-input"
                            value={coffee.name}
                            onChange={e => setCoffee({ ...coffee, name: e.target.value })}
                        />
                        <input
                            className="styled-input"
                            type="number"
                            value={coffee.price}
                            onChange={e => setCoffee({ ...coffee, price: Number(e.target.value) })}
                        />
                        <label className="checkRow">
                            <input
                                type="checkbox"
                                checked={coffee.available}
                                onChange={e => setCoffee({ ...coffee, available: e.target.checked })}
                            />{" "}
                            Available
                        </label>
                    </>
                ) : (
                    <>
                        <img src={reactImg} alt="coffee" style={{ width: 46, height: 46 }} />
                        <div className="metaRow">
                            <span>Price: ${coffee.price}</span>
                            <span className={`pill ${coffee.available ? "pillOk" : "pillNo"}`}>
                                {coffee.available ? "Available" : "Not Available"}
                            </span>
                        </div>
                    </>

                )}

                <div className="detailsActions">
                    <button className="btn btnPrimary" onClick={editMode ? handleUpdate : toggleEditMode}>
                        {editMode ? "Save" : "Edit"}
                    </button>
                    <button className="btn btnDanger" onClick={handleDelete}>Delete</button>
                    <button className="btn btnGhost" onClick={() => navigate("/")}>Back</button>
                </div>
            </section>
        </div>
    );
};

export default ItemDetails;