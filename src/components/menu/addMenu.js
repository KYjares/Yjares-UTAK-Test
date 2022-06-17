import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

const AddMenu = ({ firebase, popup, togglepopup }) => {
	const [menuItemName, setMenuItemName] = useState("");
	const [menuItemCategory, setMenuItemCategory] = useState("");
	const [menuItemOption, setMenuItemOption] = useState("Small");
	const [menuItemPrice, setMenuItemPrice] = useState("");
	const [menuItemCost, setMenuItemCost] = useState("");
	const [menuItemStock, setMenuItemStock] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		firebase.firebase
			.menu()
			.orderByChild("name")
			.equalTo(menuItemName)
			.once("value", (snapshot) => {
				const userData = snapshot.val();
				if (userData) {
					alert("Name is already in use. Please try using another name");
				} else {
					firebase.firebase
						.menu()
						.child(menuItemName + "-" + menuItemCategory)
						.set({
							id: menuItemName + "-" + menuItemCategory,
							name: menuItemName,
							category: menuItemCategory,
							option: menuItemOption,
							price: menuItemPrice,
							cost: menuItemCost,
							stock: menuItemStock,
						})
						.catch((error) => console.log(error));

					togglepopup(!popup);
				}
			});

		setMenuItemName("");
		setMenuItemCategory(false);
		setMenuItemOption("Small");
		setMenuItemPrice("");
		setMenuItemCost("");
		setMenuItemStock("");
	};

	return (
		<div>
			{popup && (
				<div className={"popup-bg"}>
					<div className={"popup-content"}>
						<form onSubmit={handleSubmit}>
							<button
								type="button"
								className="button-close"
								onClick={() => togglepopup(!popup)}
							>
								<VscChromeClose />
							</button>
							<div className="radio form-field">
								<h3 className="form-header">Add Menu Item</h3>
								<label className="form-label">Category:</label>{" "}
								<label>Appetizer</label>{" "}
								<input
									type="radio"
									name="category"
									value="Appetizer"
									required
									checked={menuItemCategory === "Appetizer"}
									onChange={(event) => setMenuItemCategory(event.target.value)}
								/>{" "}
								<label>Entree</label>{" "}
								<input
									type="radio"
									name="category"
									value="Entree"
									required
									checked={menuItemCategory === "Entree"}
									onChange={(event) => setMenuItemCategory(event.target.value)}
								/>{" "}
								<label>Dessert</label>{" "}
								<input
									type="radio"
									className="form-field"
									name="category"
									value="Dessert"
									required
									checked={menuItemCategory === "Dessert"}
									onChange={(event) => setMenuItemCategory(event.target.value)}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Name:</label>{" "}
								<input
									className="form-control"
									required
									type="text"
									name="menuItemName"
									value={menuItemName}
									onChange={(event) => setMenuItemName(event.target.value)}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Portion Size:</label>{" "}
								<select
									className="form-select form-field"
									name="option"
									onChange={(event) => setMenuItemOption(event.target.value)}
								>
									<option value="Small">Small</option>
									<option value="Medium">Medium</option>
									<option value="Large">Large</option>
								</select>
							</div>
							<div className="form-field">
								<label className="form-label">Price:</label>{" "}
								<input
									className="form-control"
									required
									type="number"
									step="0.01"
									min="0"
									name="menuItemPrice"
									value={menuItemPrice}
									onChange={(event) => setMenuItemPrice(event.target.value)}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Cost:</label>{" "}
								<input
									className="form-control"
									required
									type="number"
									step="0.01"
									min="0"
									name="menuItemCost"
									value={menuItemCost}
									onChange={(event) => setMenuItemCost(event.target.value)}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Stock:</label>{" "}
								<input
									className="form-control"
									required
									type="number"
									min="0"
									name="menuItemStock"
									value={menuItemStock}
									onChange={(event) => setMenuItemStock(event.target.value)}
								/>
							</div>
							<br />
							<button type="submit" className="btn btn-primary form-button">
								Add Item
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddMenu;
