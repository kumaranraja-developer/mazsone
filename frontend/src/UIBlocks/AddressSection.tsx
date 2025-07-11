import ImageButton from "@/Components/Button/ImageBtn";
import RadioGroup from "@/Components/RadioGroup/RadioGroup";
import { useState } from "react";

function AddressSection() {
  const [address] = useState([
    {
      value: "address1",
      label: "Muthu",
      description: `123, MG Road
City: Bengaluru
State: Karnataka
Pincode: 560001
Phone: +91 9876543210`,
    },
    {
      value: "address2",
      label: "Muthu",
      description: `123, MG Road
City: Bengaluru
State: Karnataka
Pincode: 560001
Phone: +91 9876543210`,
    },
    {
      value: "address3",
      label: "Muthu",
      description: `123, MG Road
City: Bengaluru
State: Karnataka
Pincode: 560001
Phone: +91 9876543210`,
    },
    
  ]);

  const [choosenAddress, setChoosenAddress] = useState<string | undefined>("address1");
  return (
    <div className="block space-y-3 mr-auto w-full bg-background">
      <ImageButton
        label={"Add New Address"}
        icon={"plus"}
        className="border bg-update/20 w-full p-2 text-update border-update/90"
      />
      <RadioGroup
        name="address"
        defaultValue={choosenAddress}
        options={address}
        onChange={(value) => {
          setChoosenAddress(value);
        }}
      />
    </div>
  );
}

export default AddressSection;
