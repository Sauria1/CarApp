import {useState, useEffect} from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function EditCar(props) {

    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.car) {
            setCar(props.car);
            setOpen(true);
        }
    }, [props.car]);

    const handleSave = () => {
        props.updateCar(car);
        props.getCars();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Edit Car</DialogTitle>
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