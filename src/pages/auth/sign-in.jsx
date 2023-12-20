import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Navigate } from "react-router-dom";

const apiUrl = 'https://hidoya.pythonanywhere.com/api/v1/users/token/';

export function SignIn() {
  const [token, setToken] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const formDataSignIn = new FormData();
    formDataSignIn.append("username", formData.username);
    formDataSignIn.append("password", formData.password);

    try {
      const response = await axios.post(
        apiUrl,
        formDataSignIn,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setToken(data.access);
        sessionStorage.setItem('token', data.access);
      } else {
        console.error(`Server returned an error: ${response.statusText}`);
      }
    } catch (error) {
      toast.error('Tizimga kira olmadingiz‼️', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  if (sessionStorage.getItem('token')) {
    console.log("Token found in sessionStorage");
    return <Navigate to="/" />;
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4 ">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color='blue'
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Tizimga kirish
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                label="Foydalanuvchi nomi"
                size="lg"
                aria-autocomplete='off'
                autoComplete="false"
                {...register("username", { required: true })}
              />

              <Input
                type="password"
                label="Parol"
                autoComplete="off"
                size="lg"
                {...register("password", { required: true })}
              />
              <Button type="submit" variant="gradient" fullWidth>
                Kirish
                </Button>
            </CardBody>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
