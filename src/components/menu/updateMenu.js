import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

const UpdateMenu = ({ firebase, menuItem, selectedId, setSelectedId }) => {
	const [updatedMenuItemName, setUpdatedMenuItemName] = useState("");
	const [updatedMenuItemPrice, setUpdatedMenuItemPrice] = useState("");
	const [updatedMenuItemCost, setUpdatedMenuItemCost] = useState("");
	const [updatedMenuItemStock, setUpdatedMenuItemStock] = useState("");
	const [updatedMenuItemCategory, setUpdatedMenuItemCategory] = useState("");
	const [updatedMenuItemOption, setUpdatedMenuItemOption] = useState("");

	const handleUpdate = (menuItem) => {
		firebase.firebase.modifyMenuItem(menuItem.id).update({
			name: updatedMenuItemName || menuItem.name,
			price: updatedMenuItemPrice || menuItem.price,
			cost: updatedMenuItemCost || menuItem.cost,
			stock: updatedMenuItemStock || menuItem.stock,
			category: updatedMenuItemCategory || menuItem.category,
			option: updatedMenuItemOption || menuItem.option,
		});
	};

	return (
		<div>
			{selectedId === menuItem.id && (
				<div className={"popup-bg"}>
					<div className="popup-content">
						<form onSubmit={() => handleUpdate(menuItem)}>
							<button
								type="button"
								className="button-close"
								onClick={() =>
									setSelectedId(selectedId !== selectedId ? selectedId : null)
								}
							>
								<VscChromeClose />
							</button>
							<h3 className="form-header">Update Menu Item</h3>
							<div className="form-field">
								<label className="form-label">Category:</label>{" "}
								<label>Appetizer</label>{" "}
								<input
									type="radio"
									name="updateCatagory"
									value="Appetizer"
									required
									defaultChecked={
										updatedMenuItemCategory || menuItem.category === "Appetizer"
									}
									onChange={(event) =>
										setUpdatedMenuItemCategory(event.target.value)
									}
								/>{" "}
								<label>Entree</label>{" "}
								<input
									type="radio"
									className="form-field"
									name="updateCatagory"
									value="Entree"
									defaultChecked={
										updatedMenuItemCategory || menuItem.category === "Entree"
									}
									onChange={(event) =>
										setUpdatedMenuItemCategory(event.target.value)
									}
								/>{" "}
								<label>Dessert</label>{" "}
								<input
									type="radio"
									className="form-field"
									name="updateCatagory"
									value="Dessert"
									defaultChecked={
										updatedMenuItemCategory || menuItem.category === "Dessert"
									}
									onChange={(event) =>
										setUpdatedMenuItemCategory(event.target.value)
									}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Name:</label>{" "}
								<input
									className="form-control"
									type="text"
									name="updatedMenuItemName"
									defaultValue={menuItem.name}
									onChange={(event) =>
										setUpdatedMenuItemName(event.target.value)
									}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Portion Size:</label>{" "}
								<select
									className="form-select form-field"
									name="option"
									defaultValue={updatedMenuItemOption || menuItem.option}
									onChange={(event) =>
										setUpdatedMenuItemOption(event.target.value)
									}
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
									type="number"
									step="0.01"
									min="0"
									name="updatedMenuItemPrice"
									defaultValue={menuItem.price}
									onChange={(event) =>
										setUpdatedMenuItemPrice(event.target.value)
									}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Cost:</label>{" "}
								<input
									className="form-control"
									type="number"
									step="0.01"
									min="0"
									name="updatedMenuItemCost"
									defaultValue={menuItem.cost}
									onChange={(event) =>
										setUpdatedMenuItemCost(event.target.value)
									}
								/>
							</div>
							<div className="form-field">
								<label className="form-label">Stock:</label>{" "}
								<input
									className="form-control"
									type="number"
									min="0"
									name="updatedMenuItemStock"
									defaultValue={menuItem.stock}
									onChange={(event) =>
										setUpdatedMenuItemStock(event.target.value)
									}
								/>
							</div>
							<br />
							<button type="submit" className="btn btn-primary form-button">
								Update Item
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default UpdateMenu;
