import {useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {Button, Snackbar} from "@mui/material";
import AddCar from "./AddCar.jsx";
import EditCar from "./EditCar.jsx";

const URL = 'https://carrestservice-carshop.rahtiapp.fi/cars';


export default function CarList() {

// states
    const [cars, setCars] = useState([{brand: '', model: ''}]);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const columns = [
        {headerName: 'Brand', field: 'brand', sortable: true, filter: true},
        {headerName: 'Model', field: 'model', sortable: true, filter: true},
        {headerName: 'Color', field: 'color', sortable: true, filter: true},
        {headerName: 'Fuel', field: 'fuel', sortable: true, filter: true},
        {headerName: 'Year', field: 'modelYear', sortable: true, filter: true},
        {headerName: 'Price', field: 'price', sortable: true, filter: true}
    ];

    const [colDefs, setColDefs] = useState([
        {field: 'brand'},
        {field: 'model'},
        {
            cellRenderer: (params) =>
                <div>
                    <Button size={"small"}
                            color={"error"}
                            onClick={() => deleteCar(params)}>
                        Delete
                    </Button>
                    <Button size={"small"}
                            color={"primary"}
                            onClick={() => handleEdit(params.data)}>
                        Edit
                    </Button>
                </div>
            , width: 160
        }
    ]);

// functions
// getCars
    const getCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {method: 'GET'})
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(responseData => {
                console.log(responseData._embedded.cars);
                setCars(responseData._embedded.cars);
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getCars();
    }, []);

// deleteCar

    const deleteCar = (params) => {
        console.log(params.data._links.car.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.car.href, {method: 'DELETE'})
                .then(response => {
                    if (response.ok) {
// snackbar viesti
                        setMsgSnackbar("The car was deleted successfully!")
                        setOpenSnackbar(true);
                        getCars();
                    } else {
                        setMsgSnackbar("Something goes wrong with deleting.")
                        setOpenSnackbar(true);
                    }
                })
                .catch(error => console.error(error))
        }
    }

// AddCar

    const addCar = (car) => {
        console.log("CarList: addCar");
        fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
            .then(response => {
                console.log("response" + response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Datan vienti bakkariin ei onnistunut")
                }
            })
            .then(data => {
                console.log("parsed Json = ", data);
                getCars();
            })
            .catch(error => console.error(error))
    }

    const handleEdit = (car) => {
        setSelectedCar(car);
    };

// EditCar

    const updateCar = (car) => {
        fetch(car._links.car.href, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    setMsgSnackbar("The car was updated successfully!");
                    setOpenSnackbar(true);
                    getCars(); // Fetch updated car list
                }
            })
            .catch(error => console.error(error));
    };

// return
    return (
        <>
            <AddCar addCar={addCar}></AddCar>
            <EditCar car={selectedCar} updateCar={updateCar} getCars={getCars}></EditCar>
            <div className="ag-theme-material" style={{width: 700, height: 500}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={msgSnackbar}
            />
        </>
    )
}