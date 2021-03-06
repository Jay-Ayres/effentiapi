"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store");
Route.put("users/:id", "UserController.update");
Route.post("sessions", "SessionController.store").validator("Session");
Route.post("passwords", "ForgotPasswordController.store");

//Route.group(() => {
Route.resource("posts", "PostController").apiOnly();

Route.post("posts/:id/files", "FileController.storePost");
Route.post("events/:id/files", "FileController.storeEvent");
Route.post("users/:id/files", "FileController.store");

Route.post("images", "FileController.storePost");
Route.get("/files/:id", "FileController.show");
Route.post("/files", "FileController.storeOnly");
Route.get("/files", "FileController.index");

Route.post("events", "EventController.store");
Route.get("events", "EventController.index");
Route.get("events/user/:id", "EventController.eventByUser");
Route.get("eventsAdmin", "EventController.eventAdmin");
Route.put("events/:id", "EventController.update");
Route.delete("events/:id", "EventController.destroy");

Route.put("eventuser", "EventUserController.update");
Route.get("eventuser/user/:id", "EventUserController.geteventuserconfirmerd");

Route.get("users", "UserController.index");
//}).middleware(['auth'])
