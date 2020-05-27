"use strict";

const Route = use("Route");

Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store");
Route.put("passwords", "ForgotPasswordController.update");

Route.get("files/:id", "FileController.show");

Route.post("users", "UserController.store").validator("User");
Route.get("users/:id", "UserController.show");
Route.get("users", "UserController.index");

Route.group(() => {
  Route.resource("products", "ProductController")
    .apiOnly()
    .validator(new Map([[["products.store", "products.update"], ["Product"]]]))
    .middleware(["auth"]);

  Route.post("files", "FileController.store");
}).middleware(["auth"]);
