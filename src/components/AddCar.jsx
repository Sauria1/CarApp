import {useState} from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function AddCar(props) {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        props.addCar(car);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Add Car</Button>

            <Dialog open={open}>
                <DialogTitle>Add car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        value={car.brand}
                        onChange={(e) => setCar({...car, brand: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={(e) => setCar({...car, model: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        value={car.color}
                        onChange={(e) => setCar({...car, color: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({...car, fuel: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Year"
                        value={car.modelYear}
                        onChange={(e) => setCar({...car, modelYear: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        value={car.price}
                        onChange={(e) => setCar({...car, price: e.target.value})}
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}