import React, { useState } from "react";
import VehicleTypeSelector from "./VehicleTypeSelector";
import { useNavigate } from "react-router-dom";

const AddVehicleFlow = ({ onSuccess }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (vehicleType) => {
    if (vehicleType === "car") {
      navigate("/admin/cars", { state: { openAddForm: true } });
    } else if (vehicleType === "bike") {
      navigate("/admin/bikes", { state: { openAddForm: true } });
    }
  };

  const handleBack = () => {
    setSelectedVehicleType(null);
  };

  if (!selectedVehicleType) {
    return <VehicleTypeSelector onSelect={handleSelect} />;
  }
  switch (selectedVehicleType) {
    case "caravan":
      return (
        <div>
          Coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    case "motorhomes":
      return (
        <div>
          Coming soon! <button onClick={handleBack}>Back</button>
        </div>
      );
    default:
      return <button onClick={handleBack}>Invalid selection. Go Back</button>;
  }
};

export default AddVehicleFlow;
