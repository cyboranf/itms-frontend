import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from 'react-router-dom';

const initialRows = [
	{ id: 1, name: "role" },
];

export const AdminDoTask = () => {
	const [taskName, setTaskName] = React.useState('');
	const [category, setCategory] = React.useState('');
	const [product, setProduct] = React.useState('');
	const [warehouseSpace, setWarehouseSpace] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [employeeGroup, setEmployeeGroup] = React.useState('');
	const [selectedOptions, setSelectedOptions] = React.useState([]);

	const handleAddOption = () => {
		if (product && warehouseSpace) {
			setSelectedOptions([...selectedOptions, { product, warehouseSpace, description }]);
			setProduct('');
			setWarehouseSpace('');
			setDescription('');
		}
	};

	const handleDeleteOption = (index) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions.splice(index, 1);
		setSelectedOptions(updatedOptions);
	};

	const handleCreateTask = () => {
		// Add your logic for creating a task here
	};

	return (
		<Box p={15}>
			<Box>
				<Typography
					variant="h3"
					component="h3"
					sx={{
						textAlign: "center",
						p: 5,
					}}
				>
					Create Task
				</Typography>
				<Link to="/tasks" style={{ textDecoration: 'none' }}>
					{/* <Button
						sx={[
							{
								bgcolor: blue[400],
								mb: 1,
								color: "white",
								mr: 2
							},
							(theme) => ({
								'&:hover': {
									bgcolor: blue[800],
								},
							}),
						]}
					>
						Go Back
					</Button> */}
				</Link>
				<FormControl fullWidth sx={{ mt: 2 }}>
					<TextField label="Task Name" variant="outlined" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
				</FormControl>
				<FormControl fullWidth sx={{ mt: 2 }}>
					<InputLabel id="category-label">Category</InputLabel>
					<Select labelId="category-label" label="Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)}>
						<MenuItem value="category1">Category 1</MenuItem>
						<MenuItem value="category2">Category 2</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth sx={{ mt: 2 }}>
					<TextField
						label="Description"
						variant="outlined"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						inputProps={{ style: { minHeight: '100px' } }}
						multiline
					/>
				</FormControl>


				<Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
					<Grid item xs={4}>
						<FormControl fullWidth>
							<InputLabel id="product-label">Product</InputLabel>
							<Select labelId="product-label" label="Product" variant="outlined" value={product} onChange={(e) => setProduct(e.target.value)}>
								<MenuItem value="product1">Product 1</MenuItem>
								<MenuItem value="product2">Product 2</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<FormControl fullWidth>
							<InputLabel id="warehouse-space-label">Warehouse-space</InputLabel>
							<Select labelId="warehouse-space-label" label="Warehouse-space" variant="outlined" value={warehouseSpace} onChange={(e) => setWarehouseSpace(e.target.value)}>
								<MenuItem value="warehouse-space1">Warehouse-space 1</MenuItem>
								<MenuItem value="warehouse-space2">Warehouse-space 2</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={handleAddOption}
							fullWidth
							sx={{
								backgroundColor: "#9C28B1",
								color: "white",
								"&:hover": {
									backgroundColor: "#7B1FA2"
								},
								height: '47px',
							}}
						>
							Add
						</Button>

					</Grid>
				</Grid>
				<TableContainer sx={{ mt: 2 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell>Warehouse-space</TableCell>
								<TableCell>Description</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{selectedOptions.map(({ product, warehouseSpace, description }, index) => (
								<TableRow key={index}>
									<TableCell>{product}</TableCell>
									<TableCell>{warehouseSpace}</TableCell>
									<TableCell>{description}</TableCell>
									<TableCell>
										<IconButton edge="end" onClick={() => handleDeleteOption(index)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<FormControl fullWidth sx={{ mt: 2 }}>
					<InputLabel id="employee-group-label">Employee Group</InputLabel>
					<Select labelId="employee-group-label" label="Employee Group" variant="outlined" value={employeeGroup} onChange={(e) => setEmployeeGroup(e.target.value)}>
						<MenuItem value="group1">Group 1</MenuItem>
						<MenuItem value="group2">Group 2</MenuItem>
					</Select>
				</FormControl>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleCreateTask}
					sx={{
						mt: 2,
						backgroundColor: "#9C28B1",
						color: "white",
						"&:hover": {
							backgroundColor: "#7B1FA2"
						},
						height: '47px',
					}}
				>
					Create
				</Button>
			</Box>
		</Box>
	);
};

export default AdminDoTask;
