import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";

export default function PaginationRounded({ page, totalPages }) {
	return (
		<Stack spacing={2}>
			{/* Pagination component */}
			<Pagination
				page={page}
				count={totalPages}
				shape="rounded"
				variant="outlined"
				renderItem={(item) => (
					<PaginationItem
						component={Link}
						to={`?page=${item.page}`}
						{...item}
					/>
				)}
			/>
		</Stack>
	);
}
