import React, { useState, useEffect } from "react";
import { withFirebase } from "./components/firebase/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Table, AddMenu, UpdateMenu } from "./components/menu/index";

const MenuItems = (props) => {
	const [selectedId, setSelectedId] = useState("");
	const [popup, togglepopup] = useState(false);
	const [menuItems, setMenuItem] = useState("");
	const [selectedItem, setSelectedItem] = useState("");

	useEffect(() => {
		props.firebase.menu().on("value", (snapshot) => {
			let menu = snapshot.val();
			if (menu) {
				var menuList = Object.keys(menu).map((key) => ({
					...menu[key],
					menuItemId: key,
				}));

				for (var i = 0; i < menuList.length; i++) {
					let menuItem = menuList[i];
					let id = menuList[i].id;
					menuList[i].buttons = (
						<div className="action-buttons">
							<button
								type="button"
								className="action-button btn btn-danger"
								onClick={() => handleDelete(id)}
							>
								Delete
							</button>
							<button
								type="button"
								className="action-button btn btn-secondary"
								onClick={() => handleClick(menuItem, id)}
							>
								Update
							</button>
						</div>
					);
				}
				setMenuItem(menuList);
			}
		});
		return () => {
			props.firebase.menu().off();
		};
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Category",
				accessor: "category",
			},
			{
				Header: "Price",
				accessor: "price",
			},
			{
				Header: "Cost",
				accessor: "cost",
			},
			{
				Header: "Stock",
				accessor: "stock",
			},
			{
				Header: "Portion Size",
				accessor: "option",
			},
			{
				Header: "Actions",
				accessor: "buttons",
			},
		],
		[]
	);

	const handleClick = (menuItem, id) => {
		setSelectedId(id !== selectedId ? id : null);
		setSelectedItem(menuItem);
	};

	const handleDelete = (menuItemId) => {
		props.firebase.modifyMenuItem(menuItemId).remove();
	};

	return (
		<body>
			<div id="header">
				<h1 id="app-name">Simple Menu Management App</h1>
			</div>
			<div id="content">
				<div className="flex-container">
					<div id="table-container">
						<Table columns={columns} data={Array.from(menuItems)} />
					</div>
					<UpdateMenu
						firebase={props}
						menuItem={selectedItem}
						selectedId={selectedId}
						setSelectedId={setSelectedId}
					/>
					<button
						id="button-add-item"
						type="button"
						className="btn btn-success"
						onClick={() => togglepopup(!popup)}
					>
						{"Add Item"}
					</button>
				</div>
				<AddMenu firebase={props} popup={popup} togglepopup={togglepopup} />
			</div>
			<div id="footer">
				<p>created by Kurt Yjares</p>
			</div>
		</body>
	);
};
export default withFirebase(MenuItems);
