import { redirect } from "@remix-run/node";

export const loader = () => redirect("/list-of-deals");
