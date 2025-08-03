import React, { useState } from "react";
import axios from "axios";
import { Card, TextField, Button, Typography, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import { blueGrey } from "@mui/material/colors";

function CreateAuthor() {
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    function: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/authors", formData);
      alert("Author created successfully!");
      setFormData({
        name: "",
        gmail: "",
        function: "",
        city: "",
        postalCode: "",
      });
    } catch (error) {
      console.error("Error creating author:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <MDBox pt={10} pb={3}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Create Author
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Gmail"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Function"
                name="function"
                value={formData.function}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  color: "#ffffff", // text color
                  backgroundColor: blueGrey, // optional: custom background
                  "&:hover": {
                    backgroundColor: blueGrey,
                  },
                }}
              >
                Create
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default CreateAuthor;
