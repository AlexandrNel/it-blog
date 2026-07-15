"use client";
import axios from "axios";
import { env } from "../config/env";
import { applyInterceptors } from "./interceptors";

const instance = axios.create({
  withCredentials: true,
  baseURL: env.API_URL,
});

applyInterceptors(instance);

export { instance };
