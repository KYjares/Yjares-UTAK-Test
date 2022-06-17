import { useTable, useSortBy, usePagination } from "react-table";
import BTable from "react-bootstrap/Table";
import { BsArrowLeft, BsArrowRight, BsCaretDownFill } from "react-icons/bs";

function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		state: { pageIndex },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		useSortBy,
		usePagination
	);

	return (
		<>
			<BTable striped bordered hover size="sm" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									{/* Add a sort direction indicator */}
									<span>
										{column.isSorted ? (
											column.isSortedDesc ? (
												" 🔽"
											) : (
												" 🔼"
											)
										) : (
											<BsCaretDownFill />
										)}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()} className="table-body">
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</BTable>
			<br />
			<div className="pagination">
				<button
					className="pagination-button"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{<BsArrowLeft />}
				</button>
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length > 0 ? pageOptions.length : 1}
					</strong>
				</span>
				<button
					className="pagination-button"
					onClick={() => nextPage()}
					disabled={!canNextPage}
				>
					{<BsArrowRight />}
				</button>
			</div>
		</>
	);
}

export default Table;
