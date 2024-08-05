"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { inputLabelClasses, outlinedInputClasses } from "@mui/material";
import { motion } from "framer-motion";
import { cn } from "@/utils/styles";
import { MdOutlineMailOutline } from "react-icons/md";
import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
export const Subscribe = () => {
  const customTheme = (outerTheme: Theme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            inputAdornedEnd: {
              width: "90%",
            },
            notchedOutline: {
              borderColor: "#ccc",
              color: "#ccc",
              width: "100%",
              borderRadius: "40px",
              borderWidth: "1px", // Ensure border width is consistent
            },
            root: {
              color: "#000",
              width: "100%",
              minWidth: "300px",
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "#ccc",
                borderWidth: "1px", // Ensure border width is consistent
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "#ccc",
                borderWidth: "1px", // Ensure border width is consistent
              },
            },
          },
        },
      },
    });

  const classes = useTheme();
  const [email, setEmail] = useState("");
  const submit = async () => {
    // try {
    //   const data = await fetch("/api/sendemails", {
    //     method: "POST",
    //   });
    //   const abc = await data.json();
    //   console.log(abc);
    // } catch (error) {
    //   console.log(error);
    // }

    const docRef = await addDoc(collection(db, "Subscribe"), {
      email: email,
      isSubscribed: true,
    });
    if (docRef.id) {
      toast.success("Subscribe to Newsletter");
      setEmail("");
    }
  };
  return (
    <ThemeProvider theme={customTheme(classes)}>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Your email address"
        InputLabelProps={{
          sx: {
            color: "#000",
            [`&.${inputLabelClasses.shrink}`]: {
              color: "#ccc",
            },
          },
        }}
        InputProps={{
          endAdornment: <HoverIcon onClick={() => submit()} />,
        }}
        variant="outlined"
      />
    </ThemeProvider>
  );
};

const HoverIcon = ({ onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={cn(
        ` border-black h-8 w-8 cursor-pointer flex-nowrap text-nowrap  flex items-center justify-center relative overflow-hidden `
      )}
      onClick={() => onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-7 h-7 p-2 flex justify-center transition-all duration-300 items-center  rounded-full ${
          isHovered ? "bg-blue-700" : "bg-white"
        }`}
      >
        <motion.p
          className=""
          initial={{ x: "50%" }}
          animate={{ x: isHovered ? "200%" : "50%" }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineMailOutline color="#000" size={20} />
        </motion.p>
        <motion.p
          className=" "
          initial={{ x: "-200%" }}
          animate={{ x: isHovered ? "-50%" : "-200%" }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineMailOutline color="#fff" size={20} />
        </motion.p>
      </div>
    </div>
  );
};
